"use server";

import { revalidatePath } from "next/cache";
import { createAttemptWithAnswers, createQuestionRows, createQuizRow, findQuizBySlug, listQuestions } from "@/lib/data";
import { randomId, randomToken } from "@/lib/ids";
import { getQuestionBank, isQuestionBankType } from "@/lib/question-banks";
import { isQuestionCount } from "@/lib/questions";
import { calculatePercentage } from "@/lib/scoring";
import type { AnswerKey, CreateQuestion, QuestionBankType, QuestionCount } from "@/lib/types";

type ActionResult = {
  error?: string;
  slug?: string;
  token?: string;
  attemptId?: string;
};

function cleanName(name: string) {
  return name.trim().replace(/\s+/g, " ").slice(0, 20);
}

async function createUniqueSlug() {
  for (let i = 0; i < 8; i += 1) {
    const slug = randomId(9);
    const quiz = await findQuizBySlug(slug);
    if (!quiz) return slug;
  }

  throw new Error("slug generation failed");
}

export async function createQuiz(
  creatorName: string,
  answers: Record<string, AnswerKey>,
  questionCount: QuestionCount,
  selectedQuestions: CreateQuestion[],
  questionBankType: QuestionBankType
): Promise<ActionResult> {
  const name = cleanName(creatorName);
  if (!name) return { error: "名前を入力してください。" };
  if (!isQuestionCount(questionCount)) return { error: "問題数を選択してください。" };
  if (!isQuestionBankType(questionBankType)) return { error: "診断タイプを選択してください。" };
  if (selectedQuestions.length !== questionCount) return { error: "問題数が一致しません。" };

  const knownQuestions = new Set(getQuestionBank(questionBankType).map((question) => question.question_text));
  const invalidQuestion = selectedQuestions.some(
    (question) => !question.id || !knownQuestions.has(question.question_text) || !question.option_a || !question.option_b
  );
  if (invalidQuestion) return { error: "問題を読み込めませんでした。" };

  const missingAnswer = selectedQuestions.some((question) => {
    const answer = answers[question.id];
    return !answer || !getAnswerOptions(question).some((option) => option.key === answer);
  });
  if (missingAnswer) return { error: "未回答の問題があります。" };

  try {
    const slug = await createUniqueSlug();
    const token = randomToken();

    const quiz = await createQuizRow({ slug, creator_name: name, manage_token: token, bank_type: questionBankType });

    const rows = selectedQuestions.map((question, index) => ({
      quiz_id: quiz.id,
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_answer: answers[question.id],
      sort_order: index + 1
    }));

    await createQuestionRows(rows);

    revalidatePath("/");
    return { slug, token };
  } catch (error) {
    console.error(error);
    return { error: "保存に失敗しました。Supabaseの設定を確認してください。" };
  }
}

function getAnswerOptions(question: CreateQuestion) {
  return [
    { key: "a" as const, label: question.option_a },
    { key: "b" as const, label: question.option_b },
    { key: "c" as const, label: question.option_c },
    { key: "d" as const, label: question.option_d }
  ].filter((option) => Boolean(option.label));
}

export async function submitAttempt(
  slug: string,
  challengerName: string,
  answers: Record<string, AnswerKey>
): Promise<ActionResult> {
  const name = cleanName(challengerName);
  if (!name) return { error: "名前を入力してください。" };

  try {
    const quiz = await findQuizBySlug(slug);
    if (!quiz) return { error: "診断が見つかりませんでした。" };

    const typedQuestions = await listQuestions(quiz.id);
    if (typedQuestions.length === 0) return { error: "問題を読み込めませんでした。" };
    if (typedQuestions.some((question) => !getAnswerOptions(question).some((option) => option.key === answers[question.id]))) {
      return { error: "未回答の問題があります。" };
    }

    const rows = typedQuestions.map((question) => ({
      question_id: question.id,
      selected_answer: answers[question.id],
      is_correct: answers[question.id] === question.correct_answer
    }));
    const score = rows.filter((row) => row.is_correct).length;
    const percentage = calculatePercentage(score, typedQuestions.length);

    const attempt = await createAttemptWithAnswers({ quiz_id: quiz.id, challenger_name: name, score, percentage }, rows);

    revalidatePath(`/w/${slug}`);
    revalidatePath(`/manage/${slug}`);
    return { attemptId: attempt.id };
  } catch (error) {
    console.error(error);
    return { error: "採点に失敗しました。時間をおいてもう一度試してください。" };
  }
}

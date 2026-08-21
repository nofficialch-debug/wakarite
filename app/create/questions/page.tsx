"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { QuizRunner } from "@/components/QuizRunner";
import { createQuiz } from "@/app/actions";
import { getQuestionBank, getQuestionBankLabel, isQuestionBankType } from "@/lib/question-banks";
import { isQuestionCount } from "@/lib/questions";
import type { AnswerKey, CreateQuestion, PlayQuestion, QuestionBankType, QuestionCount } from "@/lib/types";

function shuffleQuestions(bankType: QuestionBankType) {
  const questions = getQuestionBank(bankType).map((question, index) => ({
    ...question,
    id: `${bankType}-${index}`
  }));

  for (let index = questions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [questions[index], questions[randomIndex]] = [questions[randomIndex], questions[index]];
  }

  return questions;
}

function toPlayQuestions(questions: CreateQuestion[]): PlayQuestion[] {
  return questions.map((question, index) => ({
    ...question,
    sort_order: index + 1
  }));
}

export default function CreateQuestionsPage() {
  const router = useRouter();
  const [creatorName, setCreatorName] = useState("");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(20);
  const [bankType, setBankType] = useState<QuestionBankType>("standard");
  const [selectedQuestions, setSelectedQuestions] = useState<CreateQuestion[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wakarite_creator_name") || "";
    if (!saved) router.replace("/create");

    const savedCount = Number(localStorage.getItem("wakarite_question_count"));
    const savedBank = localStorage.getItem("wakarite_question_bank");
    if (!isQuestionCount(savedCount)) {
      router.replace("/create/count");
      return;
    }

    const nextBankType = isQuestionBankType(savedBank) ? savedBank : "standard";
    setCreatorName(saved);
    setQuestionCount(savedCount);
    setBankType(nextBankType);
    setSelectedQuestions(shuffleQuestions(nextBankType).slice(0, savedCount));
  }, [router]);

  const questions = toPlayQuestions(selectedQuestions);

  function replaceQuestion(currentIndex: number) {
    setSelectedQuestions((currentQuestions) => {
      const currentIds = new Set(currentQuestions.map((question) => question.id));
      const candidates = shuffleQuestions(bankType).filter((question) => !currentIds.has(question.id));
      const replacement = candidates[0];
      if (!replacement) return currentQuestions;

      return currentQuestions.map((question, index) => (index === currentIndex ? replacement : question));
    });
  }

  return (
    <AppShell showCreateButton={false}>
      <div className="mb-4 space-y-1">
        <p className="text-sm font-black text-candy">{getQuestionBankLabel(bankType)}｜本人の答えを選んでください</p>
        <h1 className="text-2xl font-black">{creatorName || "あなた"}のワカリテ</h1>
      </div>
      <QuizRunner
        questions={questions}
        submitLabel="完成させる"
        replaceLabel="違う質問に変更"
        onReplaceQuestion={replaceQuestion}
        onSubmit={async (answers) => {
          const result = await createQuiz(creatorName, answers as Record<string, AnswerKey>, questionCount, selectedQuestions, bankType);
          if (result.error) return { error: result.error };
          localStorage.removeItem("wakarite_creator_name");
          localStorage.removeItem("wakarite_question_count");
          localStorage.removeItem("wakarite_question_bank");
          router.push(`/create/complete?slug=${result.slug}&token=${result.token}`);
        }}
      />
    </AppShell>
  );
}

import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { DIAGNOSIS_CONFIGS } from "@/lib/diagnosis-config";
import { isQuestionBankType } from "@/lib/question-banks";
import { getServiceSupabase, hasSupabaseEnv } from "@/lib/supabase";
import type { AnswerKey, Attempt, AttemptAnswer, Question, QuestionBankType, Quiz } from "@/lib/types";

type LocalDb = {
  quizzes: Quiz[];
  questions: Question[];
  attempts: Attempt[];
  attempt_answers: AttemptAnswer[];
};

type NewQuiz = {
  slug: string;
  creator_name: string;
  manage_token: string;
  bank_type: QuestionBankType;
};

type NewQuestion = {
  quiz_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c?: string;
  option_d?: string;
  correct_answer: AnswerKey;
  sort_order: number;
};

type NewAttempt = {
  quiz_id: string;
  challenger_name: string;
  score: number;
  percentage: number;
};

type NewAttemptAnswer = {
  attempt_id: string;
  question_id: string;
  selected_answer: AnswerKey;
  is_correct: boolean;
};

export type ResultDetail = AttemptAnswer & {
  questions: {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string | undefined;
    option_d: string | undefined;
    correct_answer: AnswerKey;
    sort_order: number;
  };
};

export type AnswerStat = {
  question_id: string;
  is_correct: boolean;
};

export type QuestionBankStats = Record<QuestionBankType, { quizCount: number; attemptCount: number }>;

const localDbPath = path.join(process.cwd(), ".data", "wakarite.json");

function now() {
  return new Date().toISOString();
}

function emptyDb(): LocalDb {
  return {
    quizzes: [],
    questions: [],
    attempts: [],
    attempt_answers: []
  };
}

async function readLocalDb(): Promise<LocalDb> {
  try {
    const raw = await fs.readFile(localDbPath, "utf8");
    return JSON.parse(raw) as LocalDb;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
    return emptyDb();
  }
}

async function writeLocalDb(db: LocalDb) {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true });
  await fs.writeFile(localDbPath, JSON.stringify(db, null, 2));
}

export async function findQuizBySlug(slug: string) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("quizzes")
      .select("id, slug, creator_name, manage_token, bank_type, created_at")
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("quizzes")
        .select("id, slug, creator_name, manage_token, created_at")
        .eq("slug", slug)
        .maybeSingle();
      if (fallbackError) throw fallbackError;
      return fallbackData as Quiz | null;
    }
    return data as Quiz | null;
  }

  const db = await readLocalDb();
  return db.quizzes.find((quiz) => quiz.slug === slug) || null;
}

export async function createQuizRow(input: NewQuiz) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from("quizzes").insert(input).select("id").single();
    if (error) {
      if (input.bank_type !== "standard") throw error;
      const { bank_type: _bankType, ...fallbackInput } = input;
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("quizzes")
        .insert(fallbackInput)
        .select("id")
        .single();
      if (fallbackError) throw fallbackError;
      return fallbackData as Pick<Quiz, "id">;
    }
    return data as Pick<Quiz, "id">;
  }

  const db = await readLocalDb();
  const quiz: Quiz = {
    id: crypto.randomUUID(),
    slug: input.slug,
    creator_name: input.creator_name,
    manage_token: input.manage_token,
    bank_type: input.bank_type,
    created_at: now()
  };
  db.quizzes.push(quiz);
  await writeLocalDb(db);
  return { id: quiz.id };
}

export async function createQuestionRows(rows: NewQuestion[]) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("questions").insert(rows);
    if (error) throw error;
    return;
  }

  const db = await readLocalDb();
  db.questions.push(
    ...rows.map((row) => ({
      id: crypto.randomUUID(),
      ...row
    }))
  );
  await writeLocalDb(db);
}

export async function listQuestions(quizId: string) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("questions")
      .select("id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order")
      .eq("quiz_id", quizId)
      .order("sort_order", { ascending: true });
    if (error) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("questions")
        .select("id, quiz_id, question_text, option_a, option_b, correct_answer, sort_order")
        .eq("quiz_id", quizId)
        .order("sort_order", { ascending: true });
      if (fallbackError) throw fallbackError;
      return fallbackData as Question[];
    }
    return data as Question[];
  }

  const db = await readLocalDb();
  return db.questions.filter((question) => question.quiz_id === quizId).sort((a, b) => a.sort_order - b.sort_order);
}

export async function listAttempts(quizId: string, limit = 50) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("attempts")
      .select("id, quiz_id, challenger_name, score, percentage, created_at")
      .eq("quiz_id", quizId)
      .order("percentage", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data as Attempt[];
  }

  const db = await readLocalDb();
  return db.attempts
    .filter((attempt) => attempt.quiz_id === quizId)
    .sort((a, b) => b.percentage - a.percentage || a.created_at.localeCompare(b.created_at))
    .slice(0, limit);
}

export async function createAttemptWithAnswers(attemptInput: NewAttempt, answers: Omit<NewAttemptAnswer, "attempt_id">[]) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data: attempt, error: attemptError } = await supabase
      .from("attempts")
      .insert(attemptInput)
      .select("id")
      .single();
    if (attemptError) throw attemptError;

    const { error: answersError } = await supabase
      .from("attempt_answers")
      .insert(answers.map((answer) => ({ ...answer, attempt_id: attempt.id })));
    if (answersError) throw answersError;
    return { id: attempt.id as string };
  }

  const db = await readLocalDb();
  const attempt: Attempt = {
    id: crypto.randomUUID(),
    ...attemptInput,
    created_at: now()
  };
  db.attempts.push(attempt);
  db.attempt_answers.push(
    ...answers.map((answer) => ({
      id: crypto.randomUUID(),
      attempt_id: attempt.id,
      ...answer
    }))
  );
  await writeLocalDb(db);
  return { id: attempt.id };
}

export async function findAttempt(quizId: string, attemptId: string) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("attempts")
      .select("id, quiz_id, challenger_name, score, percentage, created_at")
      .eq("id", attemptId)
      .eq("quiz_id", quizId)
      .maybeSingle();
    if (error) throw error;
    return data as Attempt | null;
  }

  const db = await readLocalDb();
  return db.attempts.find((attempt) => attempt.id === attemptId && attempt.quiz_id === quizId) || null;
}

export async function listResultDetails(attemptId: string) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("attempt_answers")
      .select("id, attempt_id, question_id, selected_answer, is_correct, questions(question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order)")
      .eq("attempt_id", attemptId);
    if (error) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("attempt_answers")
        .select("id, attempt_id, question_id, selected_answer, is_correct, questions(question_text, option_a, option_b, correct_answer, sort_order)")
        .eq("attempt_id", attemptId);
      if (fallbackError) throw fallbackError;
      return fallbackData as unknown as ResultDetail[];
    }
    return data as unknown as ResultDetail[];
  }

  const db = await readLocalDb();
  return db.attempt_answers
    .filter((answer) => answer.attempt_id === attemptId)
    .map((answer) => {
      const question = db.questions.find((item) => item.id === answer.question_id);
      if (!question) return null;
      return {
        ...answer,
        questions: {
          question_text: question.question_text,
          option_a: question.option_a,
          option_b: question.option_b,
          option_c: question.option_c,
          option_d: question.option_d,
          correct_answer: question.correct_answer,
          sort_order: question.sort_order
        }
      };
    })
    .filter((detail): detail is ResultDetail => detail !== null);
}

export async function listAnswerStats(quizId: string) {
  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("attempt_answers")
      .select("question_id, is_correct, attempts!inner(quiz_id)")
      .eq("attempts.quiz_id", quizId);
    if (error) throw error;
    return data as unknown as AnswerStat[];
  }

  const db = await readLocalDb();
  const attemptIds = new Set(db.attempts.filter((attempt) => attempt.quiz_id === quizId).map((attempt) => attempt.id));
  return db.attempt_answers
    .filter((answer) => attemptIds.has(answer.attempt_id))
    .map((answer) => ({
      question_id: answer.question_id,
      is_correct: answer.is_correct
    }));
}

function emptyQuestionBankStats(): QuestionBankStats {
  return DIAGNOSIS_CONFIGS.reduce((stats, config) => {
    stats[config.type] = { quizCount: 0, attemptCount: 0 };
    return stats;
  }, {} as QuestionBankStats);
}

export async function getQuestionBankStats(): Promise<QuestionBankStats> {
  const stats = emptyQuestionBankStats();

  if (hasSupabaseEnv()) {
    const supabase = getServiceSupabase();
    const { data: quizzes, error: quizzesError } = await supabase.from("quizzes").select("id, bank_type");
    if (quizzesError) {
      const { data: fallbackQuizzes, error: fallbackQuizzesError } = await supabase.from("quizzes").select("id");
      if (fallbackQuizzesError) throw fallbackQuizzesError;

      const quizIds = new Set((fallbackQuizzes as Array<{ id: string }>).map((quiz) => quiz.id));
      stats.standard.quizCount = quizIds.size;

      const { data: fallbackAttempts, error: fallbackAttemptsError } = await supabase.from("attempts").select("quiz_id");
      if (fallbackAttemptsError) throw fallbackAttemptsError;
      stats.standard.attemptCount = (fallbackAttempts as Array<{ quiz_id: string }>).filter((attempt) =>
        quizIds.has(attempt.quiz_id)
      ).length;

      return stats;
    }

    const quizTypes = new Map<string, QuestionBankType>();
    for (const quiz of quizzes as Array<{ id: string; bank_type?: string | null }>) {
      const rawBankType = quiz.bank_type || null;
      const bankType: QuestionBankType = isQuestionBankType(rawBankType) ? rawBankType : "standard";
      quizTypes.set(quiz.id, bankType);
      stats[bankType].quizCount += 1;
    }

    const { data: attempts, error: attemptsError } = await supabase.from("attempts").select("quiz_id");
    if (attemptsError) throw attemptsError;
    for (const attempt of attempts as Array<{ quiz_id: string }>) {
      const bankType = quizTypes.get(attempt.quiz_id) || "standard";
      stats[bankType].attemptCount += 1;
    }

    return stats;
  }

  const db = await readLocalDb();
  const quizTypes = new Map<string, QuestionBankType>();
  for (const quiz of db.quizzes) {
    const rawBankType = quiz.bank_type || null;
    const bankType: QuestionBankType = isQuestionBankType(rawBankType) ? rawBankType : "standard";
    quizTypes.set(quiz.id, bankType);
    stats[bankType].quizCount += 1;
  }

  for (const attempt of db.attempts) {
    const bankType = quizTypes.get(attempt.quiz_id) || "standard";
    stats[bankType].attemptCount += 1;
  }

  return stats;
}

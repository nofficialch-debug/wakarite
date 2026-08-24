export type AnswerKey = "a" | "b" | "c" | "d";

export type QuestionCount = 10 | 20 | 30 | 50 | 75 | 100;

export type QuestionBankType =
  | "standard"
  | "vtuber"
  | "vtuber4"
  | "private"
  | "ultimate"
  | "otaku_oshikatsu"
  | "oshikatsu"
  | "moshimo"
  | "renai"
  | "ura"
  | "food"
  | "school"
  | "work"
  | "smartphone"
  | "money";

export type PresetQuestion = {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c?: string;
  option_d?: string;
};

export type CreateQuestion = PresetQuestion & {
  id: string;
};

export type PlayQuestion = PresetQuestion & {
  id: string;
  sort_order: number;
};

export type Question = PlayQuestion & {
  quiz_id: string;
  correct_answer: AnswerKey;
};

export type Quiz = {
  id: string;
  slug: string;
  creator_name: string;
  manage_token: string;
  bank_type?: QuestionBankType;
  created_at: string;
};

export type Attempt = {
  id: string;
  quiz_id: string;
  challenger_name: string;
  score: number;
  percentage: number;
  created_at: string;
};

export type AttemptAnswer = {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_answer: AnswerKey;
  is_correct: boolean;
};

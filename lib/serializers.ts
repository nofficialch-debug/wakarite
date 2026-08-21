import type { PlayQuestion, Question } from "@/lib/types";

export function publicQuestion(question: Question): PlayQuestion {
  return {
    id: question.id,
    question_text: question.question_text,
    option_a: question.option_a,
    option_b: question.option_b,
    option_c: question.option_c,
    option_d: question.option_d,
    sort_order: question.sort_order
  };
}

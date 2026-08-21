"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Progress } from "@/components/Progress";
import type { AnswerKey, PlayQuestion } from "@/lib/types";

type QuizRunnerProps = {
  questions: PlayQuestion[];
  submitLabel: string;
  replaceLabel?: string;
  onReplaceQuestion?: (currentIndex: number) => void;
  onSubmit: (answers: Record<string, AnswerKey>) => Promise<{ error?: string } | void>;
};

export function QuizRunner({ questions, submitLabel, replaceLabel, onReplaceQuestion, onSubmit }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = questions[currentIndex];
  const selected = current ? answers[current.id] : undefined;
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const answerOptions = current
    ? [
        { key: "a" as const, label: current.option_a },
        { key: "b" as const, label: current.option_b },
        { key: "c" as const, label: current.option_c },
        { key: "d" as const, label: current.option_d }
      ].filter((option) => Boolean(option.label))
    : [];

  function choose(value: AnswerKey) {
    if (!current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setError("");
    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);

    timerRef.current = setTimeout(() => {
      if (isLast) {
        submit(nextAnswers);
        return;
      }
      setCurrentIndex((value) => Math.min(value + 1, questions.length - 1));
    }, 280);
  }

  function back() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setError("");
    setCurrentIndex((value) => Math.max(value - 1, 0));
  }

  function replaceCurrentQuestion() {
    if (!onReplaceQuestion || selected || isPending) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setError("");
    onReplaceQuestion(currentIndex);
  }

  function submit(nextAnswers: Record<string, AnswerKey>) {
    if (Object.keys(nextAnswers).length !== questions.length) {
      setError("未回答の問題があります。戻って確認してください。");
      return;
    }
    startTransition(async () => {
      const result = await onSubmit(nextAnswers);
      if (result?.error) setError(result.error);
    });
  }

  if (!current) {
    return <Card>問題を読み込めませんでした。</Card>;
  }

  return (
    <Card className="space-y-6">
      <Progress current={currentIndex + 1} total={questions.length} />
      <div className="space-y-3">
        <p className="text-sm font-black text-candy">QUESTION {currentIndex + 1}</p>
        <h1 className="text-2xl font-black leading-tight">{current.question_text}</h1>
        {onReplaceQuestion ? (
          <button
            type="button"
            onClick={replaceCurrentQuestion}
            disabled={Boolean(selected) || isPending}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky-50 px-4 py-2 text-sm font-black text-blue-700 ring-2 ring-sky-100 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            {replaceLabel || "この質問を変更"}
          </button>
        ) : null}
      </div>
      <div className="grid gap-3">
        {answerOptions.map((option) => {
          const active = selected === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => choose(option.key)}
              disabled={isPending}
              className={`min-h-16 rounded-2xl border px-4 py-4 text-left text-lg font-bold transition ${
                active
                  ? "border-candy bg-pink-50 text-ink shadow-soft"
                  : "border-slate-200 bg-white text-slate-700 hover:border-skysoft"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
      <div className="flex items-center gap-3">
        <Button type="button" variant="secondary" onClick={back} disabled={currentIndex === 0 || isPending} className="flex-1">
          戻る
        </Button>
        <p className="flex-[1.4] text-center text-sm font-black text-slate-500">
          {isPending ? "保存中..." : isLast ? `${submitLabel}へ進みます` : "選ぶと自動で次へ"}
        </p>
      </div>
    </Card>
  );
}

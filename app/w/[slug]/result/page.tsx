import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { findAttempt, findQuizBySlug, listResultDetails } from "@/lib/data";
import { getTitle } from "@/lib/scoring";
import type { AnswerKey } from "@/lib/types";
import ResultShare from "./ResultShare";

export const dynamic = "force-dynamic";

function answerText(question: { option_a: string; option_b: string; option_c?: string; option_d?: string }, answer: AnswerKey) {
  const options = {
    a: question.option_a,
    b: question.option_b,
    c: question.option_c,
    d: question.option_d
  };
  return options[answer] || "";
}

export default async function ResultPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { attempt?: string };
}) {
  const attemptId = searchParams.attempt;
  if (!attemptId) notFound();

  const quiz = await findQuizBySlug(params.slug);
  if (!quiz) notFound();

  const attempt = await findAttempt(quiz.id, attemptId);
  if (!attempt) notFound();

  const title = getTitle(attempt.percentage);
  const rows = await listResultDetails(attempt.id);

  return (
    <AppShell>
      <Card className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">あなたのワカリテ度は...</p>
          <p className="text-7xl font-black text-ink">{attempt.percentage}%</p>
          <p className="text-xl font-black">{attempt.score} / {rows.length}問正解！</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-skysoft/25 via-lilac/20 to-candy/20 p-5">
          <h1 className="text-2xl font-black">{title.title}</h1>
          <p className="mt-2 font-bold leading-7 text-slate-700">{title.comment}</p>
        </div>
        <ResultShare percentage={attempt.percentage} slug={params.slug} />
      </Card>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-black">結果詳細</h2>
        <div className="grid gap-3">
          {rows
            .sort((a, b) => a.questions.sort_order - b.questions.sort_order)
            .map((row) => {
              const selected = answerText(row.questions, row.selected_answer);
              const correct = answerText(row.questions, row.questions.correct_answer);
              return (
                <Card key={row.id} className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black leading-7">{row.questions.sort_order}. {row.questions.question_text}</h3>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-black ${row.is_correct ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"}`}>
                      {row.is_correct ? "正解" : "不正解"}
                    </span>
                  </div>
                  {!row.is_correct ? (
                    <div className="grid gap-2 text-sm font-bold text-slate-600">
                      <p>あなたの回答：{selected}</p>
                      <p>本人の回答：{correct}</p>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-slate-600">本人の回答：{correct}</p>
                  )}
                </Card>
              );
            })}
        </div>
      </section>

      <div className="py-6 text-center">
        <Link href={`/w/${params.slug}`} className="font-black text-candy underline underline-offset-4">
          ランキングを見る
        </Link>
      </div>
    </AppShell>
  );
}

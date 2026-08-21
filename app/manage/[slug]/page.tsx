import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { findQuizBySlug, listAnswerStats, listAttempts, listQuestions } from "@/lib/data";
import type { Attempt, Question, Quiz } from "@/lib/types";

export const dynamic = "force-dynamic";

function rank(attempts: Attempt[], index: number): number {
  if (index === 0) return 1;
  const current = attempts[index];
  const previous = attempts[index - 1];
  return current.percentage === previous.percentage ? rank(attempts, index - 1) : index + 1;
}

export default async function ManagePage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { token?: string };
}) {
  const token = searchParams.token || "";
  const quiz = await findQuizBySlug(params.slug);
  if (!quiz || quiz.manage_token !== token) notFound();

  const typedQuiz = quiz as Quiz;
  const [typedAttempts, typedQuestions, typedStats] = await Promise.all([
    listAttempts(typedQuiz.id, 50),
    listQuestions(typedQuiz.id),
    listAnswerStats(typedQuiz.id)
  ]);

  const average = typedAttempts.length
    ? Math.round(typedAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / typedAttempts.length)
    : 0;

  return (
    <AppShell>
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">MY PAGE</p>
          <h1 className="text-3xl font-black">
            みんなの結果を見る
            <br />
            マイページ
          </h1>
          <p className="font-bold leading-7 text-slate-600">{typedQuiz.creator_name}のワカリテ診断の結果を確認できます。</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="space-y-1">
            <p className="text-sm font-black text-slate-500">挑戦人数</p>
            <p className="text-3xl font-black text-ink">{typedAttempts.length}</p>
          </Card>
          <Card className="space-y-1">
            <p className="text-sm font-black text-slate-500">平均ワカリテ度</p>
            <p className="text-3xl font-black text-candy">{average}%</p>
          </Card>
        </div>

        <Card className="space-y-3">
          <h2 className="text-xl font-black">ランキング</h2>
          {typedAttempts.length ? (
            typedAttempts.map((attempt, index) => (
              <div key={attempt.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-xs font-black text-lilac">{rank(typedAttempts, index)}位</p>
                  <p className="font-black">{attempt.challenger_name}</p>
                </div>
                <p className="text-xl font-black text-candy">{attempt.percentage}%</p>
              </div>
            ))
          ) : (
            <p className="font-bold text-slate-500">まだ挑戦者はいません。</p>
          )}
        </Card>

        <Card className="space-y-3">
          <h2 className="text-xl font-black">各問題の正答率</h2>
          {typedQuestions.map((question) => {
            const stats = typedStats.filter((stat) => stat.question_id === question.id);
            const correct = stats.filter((stat) => stat.is_correct).length;
            const percentage = stats.length ? Math.round((correct / stats.length) * 100) : 0;
            return (
              <div key={question.id} className="space-y-2 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-black leading-7">{question.sort_order}. {question.question_text}</p>
                  <p className="shrink-0 text-lg font-black text-candy">{percentage}%</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-gradient-to-r from-skysoft to-candy" style={{ width: `${percentage}%` }} />
                </div>
                <p className="text-xs font-bold text-slate-500">
                  {correct} / {stats.length}人が正解
                </p>
              </div>
            );
          })}
        </Card>
      </section>
    </AppShell>
  );
}

import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { findQuizBySlug, listQuestions } from "@/lib/data";
import { publicQuestion } from "@/lib/serializers";
import PlayClient from "./PlayClient";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { name?: string };
}) {
  const challengerName = (searchParams.name || "").trim().slice(0, 20);
  if (!challengerName) redirect(`/w/${params.slug}`);

  const quiz = await findQuizBySlug(params.slug);
  if (!quiz) notFound();

  const questions = await listQuestions(quiz.id);

  return (
    <AppShell showCreateButton={false}>
      <div className="mb-4 space-y-1">
        <p className="text-sm font-black text-candy">正解を予想してね</p>
        <h1 className="text-2xl font-black">{quiz.creator_name}のワカリテ</h1>
      </div>
      <PlayClient slug={params.slug} challengerName={challengerName} questions={questions.map(publicQuestion)} />
    </AppShell>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { submitAttempt } from "@/app/actions";
import type { PlayQuestion } from "@/lib/types";

export default function PlayClient({
  slug,
  challengerName,
  questions
}: {
  slug: string;
  challengerName: string;
  questions: PlayQuestion[];
}) {
  const router = useRouter();

  return (
    <QuizRunner
      questions={questions}
      submitLabel="採点する"
      onSubmit={async (answers) => {
        const result = await submitAttempt(slug, challengerName, answers);
        if (result.error) return { error: result.error };
        router.push(`/w/${slug}/result?attempt=${result.attemptId}`);
      }}
    />
  );
}

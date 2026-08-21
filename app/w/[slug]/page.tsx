import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { findQuizBySlug, listAttempts, listQuestions } from "@/lib/data";
import StartChallengeForm from "./StartChallengeForm";
import type { Attempt, Quiz } from "@/lib/types";

export const dynamic = "force-dynamic";

const bankVisuals = {
  standard: {
    image: "/standard-wakarite-thumbnail.png",
    width: 1672,
    height: 941,
    alt: "定番のワカリテ"
  },
  vtuber: {
    image: "/vtuber-wakarite-thumbnail-v2.png",
    width: 1672,
    height: 941,
    alt: "VTuberワカリテ"
  },
  private: {
    image: "/private-wakarite-thumbnail.png",
    width: 1672,
    height: 941,
    alt: "プライベートワカリテ"
  },
  ultimate: {
    image: "/ultimate-wakarite-thumbnail-v2.png",
    width: 1672,
    height: 941,
    alt: "究極の2択ワカリテ"
  }
} as const;

function getBankVisual(quiz: Quiz) {
  return bankVisuals[quiz.bank_type || "standard"];
}

async function getQuiz(slug: string) {
  return findQuizBySlug(slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const quiz = await getQuiz(params.slug);
  if (!quiz) return { title: "診断が見つかりません｜ワカリテ" };
  const questionCount = (await listQuestions(quiz.id)).length;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  const pageUrl = `${siteUrl}/w/${params.slug}`;
  const choiceLabel = quiz.bank_type === "private" ? "4択診断" : "2択診断";
  const visual = getBankVisual(quiz);
  const title = `${quiz.creator_name}のワカリテ診断｜ワカリテ`;
  const description = `${quiz.creator_name}のことをどれくらい理解しているか、全${questionCount}問の${choiceLabel}でワカリテ度をチェックしよう。友達や恋人とリンクを共有してランキングで楽しめます。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ワカリテ",
      url: pageUrl,
      images: [
        {
          url: visual.image,
          width: visual.width,
          height: visual.height,
          alt: visual.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [visual.image]
    }
  };
}

export default async function ChallengePage({ params }: { params: { slug: string } }) {
  const quiz = await getQuiz(params.slug);
  if (!quiz) notFound();

  const attempts = await listAttempts(quiz.id, 10);
  const questionCount = (await listQuestions(quiz.id)).length;
  const visual = getBankVisual(quiz);

  return (
    <AppShell>
      <Card className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-black text-candy">CHALLENGE</p>
          <h1 className="text-3xl font-black leading-tight">
            {quiz.creator_name}のこと、
            <br />
            どれくらいわかってる？
          </h1>
          <img
            src={visual.image}
            alt={visual.alt}
            className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(35,167,242,0.16)]"
          />
          <p className="font-bold leading-7 text-slate-600">全{questionCount}問！本人が選んだ答えを予想してみよう。</p>
        </div>
        <StartChallengeForm slug={quiz.slug} />
      </Card>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-black">{quiz.creator_name}のワカリテランキング</h2>
        <Card className="space-y-3">
          {attempts.length ? (
            attempts.map((attempt, index) => (
              <div key={attempt.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-xs font-black text-lilac">{index + 1}位</p>
                  <p className="font-black">{attempt.challenger_name}</p>
                </div>
                <p className="text-xl font-black text-candy">{attempt.percentage}%</p>
              </div>
            ))
          ) : (
            <p className="font-bold text-slate-500">まだ挑戦者はいません。</p>
          )}
        </Card>
      </section>
    </AppShell>
  );
}

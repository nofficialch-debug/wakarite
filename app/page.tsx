import Link from "next/link";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { getDiagnosisConfig } from "@/lib/diagnosis-config";
import type { DiagnosisConfig } from "@/lib/diagnosis-config";
import type { QuestionBankType } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
const siteTitle = "ワカリテ｜私とあなたのワカリテ診断";
const siteDescription =
  "ワカリテは、友達や恋人がどれだけあなたを理解しているかを診断できる無料の理解度チェックサービスです。2択・4択の診断を作成し、リンク共有とランキングで楽しめます。";
const topOgpImage = "/wakarite-ogp.png?v=20260822";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName: "ワカリテ",
    locale: "ja_JP",
    images: [
      {
        url: topOgpImage,
        width: 1920,
        height: 1080,
        type: "image/png",
        alt: "ワカリテ｜私とあなたのワカリテ診断"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [topOgpImage]
  }
};

const steps = [
  {
    label: "STEP 1",
    title: "自分について答える",
    body: "好きなものや性格について答えます。",
    accent: "bg-pink-50 text-candy"
  },
  {
    label: "STEP 2",
    title: "リンクを友達に送る",
    body: "あなた専用の挑戦URLを発行します。",
    accent: "bg-blue-50 text-sky-500"
  },
  {
    label: "STEP 3",
    title: "誰が一番わかってる？",
    body: "友達の正答率をランキングで確認できます。",
    accent: "bg-violet-50 text-lilac"
  }
];

const diagnosisCategories: Array<{
  id: string;
  title: string;
  lead: string;
  tone: string;
  types: QuestionBankType[];
}> = [
  {
    id: "love",
    title: "恋愛・人間関係",
    lead: "恋愛観や本音、人との距離感がわかる診断",
    tone: "from-pink-50 to-rose-50 text-rose-600 ring-rose-100 hover:shadow-[0_12px_28px_rgba(244,63,94,0.14)]",
    types: ["renai", "ura", "ultimate"]
  },
  {
    id: "oshi",
    title: "推し活",
    lead: "推しへの愛やグッズ、現場での行動がわかる診断",
    tone: "from-fuchsia-50 to-pink-50 text-fuchsia-600 ring-fuchsia-100 hover:shadow-[0_12px_28px_rgba(217,70,239,0.14)]",
    types: ["oshikatsu", "otaku_oshikatsu"]
  },
  {
    id: "life",
    title: "生活・好み",
    lead: "毎日の過ごし方や好きなものがわかる診断",
    tone: "from-emerald-50 to-sky-50 text-emerald-600 ring-emerald-100 hover:shadow-[0_12px_28px_rgba(16,185,129,0.14)]",
    types: ["private", "food", "smartphone", "money"]
  },
  {
    id: "school-work",
    title: "学校・仕事",
    lead: "学校生活や働き方のタイプがわかる診断",
    tone: "from-blue-50 to-cyan-50 text-blue-600 ring-blue-100 hover:shadow-[0_12px_28px_rgba(37,99,235,0.14)]",
    types: ["school", "work"]
  },
  {
    id: "values",
    title: "もしも・価値観",
    lead: "迷う選択から価値観や本音が見える診断",
    tone: "from-amber-50 to-orange-50 text-orange-600 ring-orange-100 hover:shadow-[0_12px_28px_rgba(249,115,22,0.14)]",
    types: ["moshimo", "ultimate"]
  },
  {
    id: "vtuber",
    title: "VTuber専用",
    lead: "配信やリスナー参加企画で盛り上がりやすい診断",
    tone: "from-sky-50 to-violet-50 text-sky-600 ring-sky-100 hover:shadow-[0_12px_28px_rgba(14,165,233,0.14)]",
    types: ["vtuber"]
  }
];

function formatCountRange(countOptions: DiagnosisConfig["countOptions"]) {
  if (countOptions.length === 0) return "";
  const min = countOptions[0];
  const max = countOptions[countOptions.length - 1];
  return min === max ? `${min}問で作成` : `${min}〜${max}問で作成`;
}

function DiagnosisTags({ diagnosis, className = "" }: { diagnosis: DiagnosisConfig; className?: string }) {
  const tags = [
    diagnosis.title,
    `${diagnosis.choiceCount}択`,
    formatCountRange(diagnosis.countOptions),
    `全${diagnosis.questionTotal}問`
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={`${diagnosis.type}-${tag}`}
          className={`inline-flex rounded-full px-3 py-2 text-xs font-black ring-1 ring-white/90 ${
            index === 0
              ? "bg-white/90 text-candy shadow-[0_10px_24px_rgba(255,119,183,0.14)]"
              : "bg-white/72 text-slate-500"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function DiagnosisCard({ diagnosis }: { diagnosis: DiagnosisConfig }) {
  const headingLines = diagnosis.heading.split("\n");
  const titleClassName = diagnosis.type === "vtuber" ? "diagnosis-title diagnosis-title-compact" : "diagnosis-title";

  return (
    <div className={`diagnosis-card ${diagnosis.accentClass}`}>
      <div className="space-y-5">
        <DiagnosisTags diagnosis={diagnosis} />
        <div className="space-y-3">
          <h2 className={titleClassName}>
            {headingLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < headingLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <img
            src={diagnosis.thumbnail}
            alt={diagnosis.title}
            className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(87,93,139,0.14)]"
          />
          <p className="font-bold leading-7 text-slate-600">{diagnosis.description}</p>
        </div>
        <ButtonLink href={diagnosis.createPath} className="min-h-14 w-full">
          {diagnosis.title}を作る
        </ButtonLink>
      </div>
    </div>
  );
}

export default function HomePage() {
  const standardDiagnosis = getDiagnosisConfig("standard");

  return (
    <AppShell>
      <section className="mb-5 rounded-[26px] border border-white/90 bg-white/72 px-5 py-5 text-center shadow-[0_12px_32px_rgba(87,93,139,0.09)] backdrop-blur-md">
        <p className="text-sm font-black leading-8 text-slate-600">
          ワカリテは、質問に答えるだけで簡単にあなたの診断が作れるサービスです。{" "}
          <Link href="/guide" className="font-black text-candy underline underline-offset-4">
            使い方はこちら
          </Link>
        </p>
      </section>

      <section className="diagnosis-card diagnosis-card-standard">
        <div className="space-y-5">
          <DiagnosisTags diagnosis={standardDiagnosis} />
          <h1 className="diagnosis-title">
            わたしのこと、
            <br />
            本当にわかってる？
          </h1>
          <img
            src="/standard-wakarite-thumbnail.png"
            alt="定番のワカリテ"
            className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(35,167,242,0.16)]"
          />
          <p className="text-base font-black leading-8 text-slate-600">
            質問に答えて、友達にワカリテ診断を送ろう。
            <br />
            あなたの一番の「ワカリテ」は誰？
          </p>
          <div className="grid gap-3">
            <ButtonLink href="/create" className="min-h-14">
              あなたの診断を作る
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[26px] border border-white/90 bg-white/76 px-5 py-5 shadow-[0_12px_32px_rgba(87,93,139,0.09)] backdrop-blur-md">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">CATEGORY</p>
          <h2 className="text-2xl font-black leading-tight">気になるワカリテを探す</h2>
          <p className="text-sm font-bold leading-7 text-slate-600">カテゴリを押すと、下の診断一覧まで移動できます。</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {diagnosisCategories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className={`flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-br px-3 py-3 text-center text-sm font-black shadow-[0_8px_22px_rgba(87,93,139,0.08)] ring-1 transition hover:-translate-y-0.5 ${category.tone}`}
            >
              {category.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-8">
        {diagnosisCategories.map((category) => (
          <div key={category.id} id={category.id} className="scroll-mt-6 space-y-3">
            <div className="space-y-1 px-1">
              <h2 className="text-2xl font-black leading-tight">{category.title}</h2>
              <p className="text-sm font-bold leading-7 text-slate-600">{category.lead}</p>
            </div>
            <div className="space-y-5">
              {category.types.map((type) => (
                <DiagnosisCard key={`${category.id}-${type}`} diagnosis={getDiagnosisConfig(type)} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="how-to" className="space-y-3 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">簡単な使い方</h2>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-white">3 steps</span>
        </div>
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <Card key={step.label} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`flex size-9 items-center justify-center rounded-2xl text-sm font-black ${step.accent}`}>{index + 1}</span>
                <div>
                  <p className="text-xs font-black text-lilac">{step.label}</p>
                  <h3 className="text-lg font-black leading-tight">{step.title}</h3>
                </div>
              </div>
              <p className="pl-12 font-bold leading-7 text-slate-600">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

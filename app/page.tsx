import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

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

export default function HomePage() {
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
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full bg-white/88 px-4 py-2 text-sm font-black text-candy shadow-[0_10px_26px_rgba(255,119,183,0.18)] ring-1 ring-white">
              定番のワカリテ
            </p>
            <p className="inline-flex rounded-full bg-white/72 px-3 py-2 text-xs font-black text-sky-500 ring-1 ring-white/90">
              20〜100問でチェック
            </p>
          </div>
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

      <section className="diagnosis-card diagnosis-card-ultimate mt-5">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-black text-orange-600 shadow-[0_10px_24px_rgba(255,93,108,0.14)] ring-1 ring-white">
              究極の2択ワカリテ
            </p>
            <p className="inline-flex rounded-full bg-white/70 px-3 py-2 text-xs font-black text-violet-600 ring-1 ring-white/90">
              2択・10〜30問
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="diagnosis-title">
              本人も悩みまくる!?
              <br />
              究極の2択
            </h2>
            <img
              src="/ultimate-wakarite-thumbnail-v2.png"
              alt="究極の2択ワカリテ"
              className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(255,93,108,0.16)]"
            />
            <p className="font-bold leading-7 text-slate-600">
              恋愛、人生、お金、もしもの選択など、本人の価値観が見える究極の2択診断です。
            </p>
          </div>
          <ButtonLink href="/create/ultimate" className="min-h-14 w-full">
            究極の2択ワカリテを作る
          </ButtonLink>
        </div>
      </section>

      <section className="diagnosis-card diagnosis-card-private mt-5">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-black text-orange-600 shadow-[0_10px_24px_rgba(255,138,77,0.14)] ring-1 ring-white">
              プライベートワカリテ
            </p>
            <p className="inline-flex rounded-full bg-white/70 px-3 py-2 text-xs font-black text-candy ring-1 ring-white/90">
              4択・10〜30問
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="diagnosis-title">
              誰も知らない!?
              <br />
              プライベートの実態
            </h2>
            <img
              src="/private-wakarite-thumbnail.png"
              alt="プライベートワカリテ"
              className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(87,69,139,0.18)]"
            />
            <p className="font-bold leading-7 text-slate-600">
              寝方、スマホ、家での過ごし方など、近い人ほど盛り上がるプライベート診断です。
            </p>
          </div>
          <ButtonLink href="/create/private" className="min-h-14 w-full">
            プライベートワカリテを作る
          </ButtonLink>
        </div>
      </section>

      <section className="diagnosis-card diagnosis-card-vtuber mt-5">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-black text-blue-700 shadow-[0_10px_24px_rgba(35,167,242,0.14)] ring-1 ring-white">
              VTuber向け
            </p>
            <p className="inline-flex rounded-full bg-white/70 px-3 py-2 text-xs font-black text-candy ring-1 ring-white/90">
              配信で盛り上がる2択
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="diagnosis-title">
              推しのこと、
              <br />
              どれだけわかってる？
            </h2>
            <img
              src="/vtuber-wakarite-thumbnail-v2.png"
              alt="VTuberワカリテ"
              className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(35,167,242,0.16)]"
            />
            <p className="font-bold leading-7 text-slate-600">
              配信ネタ・口ぐせ・ファンならわかる好みで、リスナー参加型のワカリテ診断を作れます。
            </p>
          </div>
          <ButtonLink href="/create/vtuber" className="min-h-14 w-full">
            VTuberワカリテを作る
          </ButtonLink>
        </div>
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

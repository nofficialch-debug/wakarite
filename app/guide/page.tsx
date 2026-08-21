import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

const creatorSteps = [
  {
    title: "1. 診断タイプを選ぶ",
    body: "定番のワカリテ、またはVTuberワカリテから作りたい診断を選びます。"
  },
  {
    title: "2. 名前を入力する",
    body: "作成者名、VTuber名、配信者名など、診断に表示したい名前を入力します。"
  },
  {
    title: "3. 問題数を選ぶ",
    body: "20問、30問、50問、75問、100問から選べます。気軽に遊ぶなら20問、しっかり盛り上げたいなら50問以上がおすすめです。"
  },
  {
    title: "4. 本人の答えを選ぶ",
    body: "出てきた質問に本人として回答します。答えにくい質問は「違う質問に変更」で別の質問に差し替えられます。"
  },
  {
    title: "5. リンクを共有する",
    body: "完成した診断リンクを友達、リスナー、SNS、LINEなどに共有します。回答者のワカリテ度はランキングで確認できます。"
  }
];

const playerSteps = [
  {
    title: "1. 共有リンクを開く",
    body: "作成者から届いたワカリテ診断リンクを開きます。"
  },
  {
    title: "2. ニックネームを入力する",
    body: "ランキングに表示される名前を入力します。個人情報や本名の入力は避けるのがおすすめです。"
  },
  {
    title: "3. 本人の答えを予想する",
    body: "作成者ならどの選択肢を選んだかを考えながら回答していきます。"
  },
  {
    title: "4. 結果を見る",
    body: "正解数とワカリテ度が表示されます。結果はSNSやLINEで共有できます。"
  }
];

export default function GuidePage() {
  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-7">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">GUIDE</p>
          <h1 className="text-3xl font-black">ワカリテの使い方</h1>
          <p className="font-bold leading-8 text-slate-600">
            ワカリテは、質問で「どれだけ相手をわかっているか」を遊べる診断サービスです。
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-black">診断を作る人</h2>
          <div className="grid gap-3">
            {creatorSteps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-white/72 p-4 ring-1 ring-white">
                <h3 className="font-black">{step.title}</h3>
                <p className="mt-1 font-bold leading-7 text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">診断に答える人</h2>
          <div className="grid gap-3">
            {playerSteps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-black">{step.title}</h3>
                <p className="mt-1 font-bold leading-7 text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-[24px] bg-gradient-to-br from-sky-50 to-pink-50 p-5 ring-1 ring-white">
          <h2 className="text-xl font-black">VTuberワカリテの使い方</h2>
          <p className="font-bold leading-8 text-slate-600">
            VTuberワカリテは、配信ネタ・口ぐせ・ファンならわかる好みを中心にした専用バンクです。配信者本人が作ってリスナーに挑戦してもらう企画や、リスナー参加型の配信に向いています。
          </p>
          <ButtonLink href="/create/vtuber" className="w-full">
            VTuberワカリテを作る
          </ButtonLink>
        </section>

        <p className="text-center text-sm font-bold text-slate-500">
          困ったときは <Link href="/faq" className="font-black text-candy underline underline-offset-4">Q&A</Link> も確認できます。
        </p>
      </Card>
    </AppShell>
  );
}

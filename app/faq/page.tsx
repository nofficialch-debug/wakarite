import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "よくある質問｜ワカリテ",
  description:
    "ワカリテの診断作成、共有リンク、ランキング、4択診断、個人情報の扱いなど、よくある質問をまとめています。",
  path: "/faq"
});

const faqs = [
  {
    question: "ワカリテはどんなサービスですか？",
    answer: "質問に答えて、友達・恋人・リスナーがどれだけあなたのことを理解しているかを遊べる診断サービスです。"
  },
  {
    question: "診断は何問で作れますか？",
    answer: "診断の種類によって選べる問題数が変わります。多くの4択ワカリテは10問、20問、30問から、定番やVTuber向けは20問、30問、50問、75問、100問から選べます。"
  },
  {
    question: "答えにくい質問が出たらどうすればいいですか？",
    answer: "作成中に「違う質問に変更」ボタンを押すと、まだ使っていない別の質問に差し替えられます。"
  },
  {
    question: "VTuberワカリテとは何ですか？",
    answer: "VTuberや配信者向けの専用診断です。配信ネタ、口ぐせ、リスナーとの関係、推しポイントなど、配信で盛り上がりやすい質問が出ます。"
  },
  {
    question: "診断リンクはどこで共有できますか？",
    answer: "LINE、X、Discord、配信概要欄など、URLを貼れる場所で共有できます。SNSではOGP画像つきのカードとして表示されやすい設定にしています。"
  },
  {
    question: "ランキングには何が表示されますか？",
    answer: "挑戦者が入力したニックネームとワカリテ度が表示されます。本名や公開したくない名前は入力しないでください。"
  },
  {
    question: "診断結果は正確ですか？",
    answer: "ワカリテは娯楽目的の診断です。結果は相手理解のきっかけとして楽しむもので、性格や相性を正確に保証するものではありません。"
  },
  {
    question: "作った診断をあとから編集できますか？",
    answer: "現在の初期版では、公開後の質問編集には対応していません。作成時に内容を確認してから共有してください。"
  },
  {
    question: "4択診断は作れますか？",
    answer: "プライベート、恋愛、推し活、食べ物、学校、仕事、スマホの中身、お金の使い方などは4択診断です。定番、VTuber、究極の2択は2択診断です。"
  },
  {
    question: "個人情報の扱いはどうなっていますか？",
    answer: "診断の表示・採点・ランキングのために、入力された名前や回答情報を扱います。詳しくはプライバシーポリシーをご確認ください。"
  }
];

export default function FaqPage() {
  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">Q&A</p>
          <h1 className="text-3xl font-black">よくある質問</h1>
          <p className="font-bold leading-8 text-slate-600">
            ワカリテを作る人・答える人が迷いやすいポイントをまとめました。
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <section key={faq.question} className="rounded-2xl bg-white/75 p-4 ring-1 ring-white">
              <h2 className="font-black leading-7">Q. {faq.question}</h2>
              <p className="mt-2 font-bold leading-8 text-slate-600">A. {faq.answer}</p>
            </section>
          ))}
        </div>

        <div className="rounded-[24px] bg-slate-50 p-5 text-sm font-bold leading-7 text-slate-600">
          個人情報や公開範囲については{" "}
          <Link href="/privacy" className="font-black text-candy underline underline-offset-4">
            プライバシーポリシー
          </Link>
          、利用上のルールについては{" "}
          <Link href="/terms" className="font-black text-candy underline underline-offset-4">
            利用規約
          </Link>
          をご確認ください。
        </div>
      </Card>
    </AppShell>
  );
}

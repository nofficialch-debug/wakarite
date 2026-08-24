import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "利用規約｜ワカリテ",
  description:
    "ワカリテの利用条件、禁止事項、診断内容の取り扱い、免責事項などをまとめた利用規約です。",
  path: "/terms"
});

const sections = [
  {
    title: "第1条（適用）",
    body: "本利用規約は、ワカリテ（以下「本サービス」といいます）の利用条件を定めるものです。ユーザーは、本サービスを利用することで本規約に同意したものとみなされます。"
  },
  {
    title: "第2条（サービス内容）",
    body: "本サービスは、ユーザーが質問に回答して診断を作成し、発行されたリンクを通じて他のユーザーが回答・結果確認を行える診断作成サービスです。"
  },
  {
    title: "第3条（禁止事項）",
    body: "ユーザーは、法令または公序良俗に反する行為、第三者の権利を侵害する行為、誹謗中傷・差別的表現・過度に性的または暴力的な表現を投稿する行為、本サービスの運営を妨げる行為をしてはなりません。"
  },
  {
    title: "第4条（投稿内容・診断内容）",
    body: "ユーザーが作成した診断、回答、ニックネーム等の内容については、ユーザー自身が責任を負うものとします。運営者は、必要と判断した場合、事前の通知なく内容の削除、公開停止、利用制限を行うことがあります。"
  },
  {
    title: "第5条（知的財産権）",
    body: "本サービスに関するプログラム、デザイン、ロゴ、画像等の権利は運営者または正当な権利者に帰属します。ユーザーが投稿した内容の権利はユーザーに留保されますが、運営者は本サービスの提供・改善・表示に必要な範囲で利用できるものとします。"
  },
  {
    title: "第6条（免責事項）",
    body: "本サービスの診断結果は娯楽を目的としたものであり、正確性、完全性、有用性を保証するものではありません。ユーザー間のトラブル、通信環境、データ消失、サービス停止等により生じた損害について、運営者は法令上必要な範囲を除き責任を負いません。"
  },
  {
    title: "第7条（サービスの変更・停止）",
    body: "運営者は、必要に応じて本サービスの内容を変更、中断、終了することがあります。"
  },
  {
    title: "第8条（規約の変更）",
    body: "運営者は、必要と判断した場合、本規約を変更できます。変更後の規約は、本サービス上に掲載した時点から効力を生じるものとします。"
  },
  {
    title: "第9条（準拠法・管轄）",
    body: "本規約は日本法に準拠します。本サービスに関して紛争が生じた場合、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。"
  }
];

export default function TermsPage() {
  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">TERMS</p>
          <h1 className="text-3xl font-black">利用規約</h1>
          <p className="text-sm font-bold leading-7 text-slate-500">制定日：2026年8月22日</p>
        </div>
        <div className="space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-lg font-black">{section.title}</h2>
              <p className="font-bold leading-8 text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

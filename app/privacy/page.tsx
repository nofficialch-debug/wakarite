import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";

const sections = [
  {
    title: "1. 取得する情報",
    body: "本サービスでは、診断作成者名、挑戦者名、診断の質問・回答、スコア、作成日時、アクセス時の技術情報（IPアドレス、ブラウザ情報、リファラ等）を取得する場合があります。"
  },
  {
    title: "2. 利用目的",
    body: "取得した情報は、診断の作成・共有・採点・ランキング表示、本サービスの提供、保守、改善、不正利用防止、問い合わせ対応、利用状況の分析のために利用します。"
  },
  {
    title: "3. 公開される情報",
    body: "診断リンクを知っているユーザーは、診断タイトル、作成者名、挑戦者名、スコア、ランキング等を閲覧できる場合があります。個人を特定できる情報や公開したくない内容は入力しないでください。"
  },
  {
    title: "4. 第三者提供",
    body: "運営者は、法令に基づく場合、ユーザーの同意がある場合、サービス提供に必要な委託先へ必要な範囲で提供する場合を除き、個人情報を第三者に提供しません。"
  },
  {
    title: "5. 外部サービスの利用",
    body: "本サービスでは、データ保存、アクセス解析、ホスティング等のために外部サービスを利用する場合があります。これらの外部サービスでは、各提供事業者の規約およびプライバシーポリシーに従って情報が取り扱われます。"
  },
  {
    title: "6. Cookie等の利用",
    body: "本サービスでは、利便性向上、利用状況の把握、不正利用防止のためにCookieまたは類似技術を利用する場合があります。ブラウザ設定によりCookieを無効にできますが、一部機能が利用できない場合があります。"
  },
  {
    title: "7. 安全管理",
    body: "運営者は、取得した情報の漏えい、滅失、毀損等を防ぐため、合理的な安全管理措置を講じます。ただし、インターネット上の通信や保存について完全な安全性を保証するものではありません。"
  },
  {
    title: "8. 開示・訂正・削除・利用停止",
    body: "ユーザー本人から、保有個人データの開示、訂正、削除、利用停止等の請求があった場合、本人確認のうえ、法令に従い合理的な範囲で対応します。"
  },
  {
    title: "9. 未成年の利用",
    body: "未成年のユーザーは、保護者の同意を得たうえで本サービスを利用してください。"
  },
  {
    title: "10. プライバシーポリシーの変更",
    body: "運営者は、必要に応じて本ポリシーを変更できます。変更後の内容は、本サービス上に掲載した時点から効力を生じるものとします。"
  },
  {
    title: "11. お問い合わせ",
    body: "本ポリシーに関するお問い合わせは、運営者が本サービス上または別途指定する方法によりご連絡ください。"
  }
];

export default function PrivacyPage() {
  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">PRIVACY</p>
          <h1 className="text-3xl font-black">プライバシーポリシー</h1>
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

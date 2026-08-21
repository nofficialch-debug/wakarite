import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

export default function NotFound() {
  return (
    <AppShell>
      <Card className="space-y-5 text-center">
        <h1 className="text-3xl font-black">ページが見つかりません</h1>
        <p className="font-bold leading-7 text-slate-600">診断URLが間違っているか、削除された可能性があります。</p>
        <ButtonLink href="/" className="w-full">
          トップへ戻る
        </ButtonLink>
      </Card>
    </AppShell>
  );
}

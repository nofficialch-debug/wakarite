import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { getSiteUrl } from "@/lib/site";
import CompleteActions from "./CompleteActions";

export default function CompletePage({
  searchParams
}: {
  searchParams: { slug?: string; token?: string };
}) {
  const slug = searchParams.slug || "";
  const token = searchParams.token || "";
  const publicUrl = slug ? `${getSiteUrl()}/w/${slug}` : "";
  const manageUrl = slug && token ? `${getSiteUrl()}/manage/${slug}?token=${token}` : "";

  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-black">ワカリテ完成！</h1>
          <p className="font-bold leading-7 text-slate-600">
            友達に送って、あなたのことをどれくらいわかっているか挑戦してもらおう！
          </p>
          <p className="font-black leading-7 text-red-500">
            下のマイページでみんなの結果を確認できるよ！保存しておいてね！
          </p>
        </div>
        {publicUrl ? (
          <CompleteActions publicUrl={publicUrl} manageUrl={manageUrl} />
        ) : (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">URL情報が見つかりませんでした。</p>
        )}
      </Card>
    </AppShell>
  );
}

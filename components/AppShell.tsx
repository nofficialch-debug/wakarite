import Link from "next/link";

type AppShellProps = {
  children: React.ReactNode;
  showCreateButton?: boolean;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="phone-stage relative z-10 mx-auto min-h-screen w-full max-w-[520px] px-4 py-4 sm:px-5 xl:border-x xl:border-white/80 xl:shadow-[0_0_90px_rgba(87,93,139,0.16)]">
      <header className="mb-6 flex items-center justify-center rounded-[24px] border border-white/80 bg-white/72 px-4 py-3 shadow-[0_12px_34px_rgba(87,93,139,0.10)] backdrop-blur-md">
        <Link href="/" className="flex min-w-0 items-center justify-center">
          <img src="/wakarite-logo-blue.png" alt="ワカリテ" className="h-16 w-auto max-w-[330px] object-contain sm:h-20 sm:max-w-[390px]" />
        </Link>
      </header>
      {children}
      <section className="relative mt-8 overflow-hidden rounded-[26px] border border-white/90 bg-[linear-gradient(135deg,#fff7fb_0%,#eef8ff_55%,#f5f0ff_100%)] px-5 py-5 text-center shadow-[0_14px_34px_rgba(87,93,139,0.10)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#ff6fae,#61d6ff,#b58cff)]" />
        <p className="mb-3 inline-flex rounded-full bg-white/78 px-3 py-1 text-xs font-black text-candy ring-1 ring-white">
          無料のワカリテ診断サービス
        </p>
        <p className="text-sm font-bold leading-7 text-slate-600">
          ワカリテは、友達や推しへの理解度をチェックできる診断サービスです。リンクを共有して、誰が一番わかっているかをランキングで楽しめます。
        </p>
      </section>
      <footer className="mt-8 border-t border-white/80 py-6 text-center text-xs font-bold text-slate-500">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/guide" className="transition hover:text-ink">
            使い方
          </Link>
          <Link href="/faq" className="transition hover:text-ink">
            Q&A
          </Link>
          <Link href="/terms" className="transition hover:text-ink">
            利用規約
          </Link>
          <Link href="/privacy" className="transition hover:text-ink">
            プライバシーポリシー
          </Link>
          <a href="https://forms.gle/nPqbNTX8mDdzBhbd8" target="_blank" rel="noreferrer" className="transition hover:text-ink">
            お問い合わせ
          </a>
        </div>
        <p className="mt-3">© ワカリテ</p>
      </footer>
    </main>
  );
}

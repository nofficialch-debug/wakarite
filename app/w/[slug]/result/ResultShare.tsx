"use client";

import { Button } from "@/components/Button";
import { getSiteUrl } from "@/lib/site";

export default function ResultShare({ percentage, slug }: { percentage: number; slug: string }) {
  const text = `ワカリテ度${percentage}%だった！\nあなたは何%とれる？`;
  const url = `${getSiteUrl()}/w/${slug}`;
  const shareBody = `${text}\n${url}\n#ワカリテ診断`;
  const encodedText = encodeURIComponent(shareBody);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "ワカリテ", text: `${text}\n#ワカリテ診断`, url });
      return;
    }

    await navigator.clipboard.writeText(shareBody);
  }

  return (
    <div className="grid gap-3">
      <Button type="button" variant="secondary" onClick={share} className="w-full">
        結果をシェア
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}`}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-black px-4 py-3 text-center text-sm font-black text-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5"
        >
          Xで投稿
        </a>
        <a
          href={`https://line.me/R/msg/text/?${encodedText}`}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#06c755] px-4 py-3 text-center text-sm font-black text-white shadow-[0_10px_24px_rgba(6,199,85,0.18)] transition hover:-translate-y-0.5"
        >
          LINEで共有
        </a>
      </div>
    </div>
  );
}

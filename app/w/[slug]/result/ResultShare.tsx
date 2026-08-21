"use client";

import { Button } from "@/components/Button";
import { getSiteUrl } from "@/lib/site";

export default function ResultShare({ percentage, slug }: { percentage: number; slug: string }) {
  const text = `ワカリテ度${percentage}%だった！\nあなたは何%とれる？`;
  const url = `${getSiteUrl()}/w/${slug}`;

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "ワカリテ", text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text}\n${url}`);
  }

  return (
    <Button type="button" variant="secondary" onClick={share} className="w-full">
      結果をシェア
    </Button>
  );
}

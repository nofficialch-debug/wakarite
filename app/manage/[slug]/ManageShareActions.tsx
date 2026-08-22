"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export default function ManageShareActions({ publicUrl, creatorName }: { publicUrl: string; creatorName: string }) {
  const [message, setMessage] = useState("");
  const shareText = `${creatorName}のワカリテ診断を作りました。\nあなたはどれだけわかってる？`;
  const encodedText = encodeURIComponent(`${shareText}\n${publicUrl}\n#ワカリテ診断`);

  async function copyLink() {
    await navigator.clipboard.writeText(publicUrl);
    setMessage("診断リンクをコピーしました。");
  }

  return (
    <div className="space-y-3 rounded-[24px] border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-pink-50 p-4 shadow-[0_14px_34px_rgba(35,167,242,0.10)]">
      <div className="space-y-1">
        <p className="text-sm font-black text-sky-500">SHARE LINK</p>
        <h2 className="text-xl font-black text-ink">自分のワカリテリンク</h2>
        <p className="text-sm font-bold leading-6 text-slate-600">忘れたときはここからコピーして、友達やSNSにもう一度送れます。</p>
      </div>
      <div className="break-all rounded-2xl bg-white/82 px-4 py-3 text-left text-sm font-bold leading-6 text-slate-600 ring-1 ring-blue-100">
        {publicUrl}
      </div>
      <div className="grid gap-3">
        <Button type="button" onClick={copyLink}>
          リンクをコピー
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://line.me/R/msg/text/?${encodedText}`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#06c755] px-4 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
          >
            LINEで送る
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-black px-4 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
          >
            Xでシェア
          </a>
        </div>
      </div>
      {message ? <p className="text-sm font-black text-candy">{message}</p> : null}
    </div>
  );
}

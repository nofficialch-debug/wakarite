"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export default function CompleteActions({ publicUrl, manageUrl }: { publicUrl: string; manageUrl: string }) {
  const [message, setMessage] = useState("");
  const shareText = "私のこと、どれくらいわかってる？👀\n「ワカリテ」に挑戦してみて！";

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setMessage(`${label}をコピーしました。`);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "ワカリテ", text: shareText, url: publicUrl });
      return;
    }
    await copy(publicUrl, "リンク");
  }

  const encodedText = encodeURIComponent(`${shareText}\n${publicUrl}`);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm font-bold leading-6 text-slate-600 break-all">{publicUrl}</div>
      <div className="grid gap-3">
        <Button type="button" onClick={() => copy(publicUrl, "リンク")}>
          リンクをコピー
        </Button>
        <Button type="button" variant="secondary" onClick={share}>
          友達に送る
        </Button>
        <a
          href={`https://line.me/R/msg/text/?${encodedText}`}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#06c755] px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5"
        >
          LINEで送る
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}`}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-black px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5"
        >
          Xでシェア
        </a>
      </div>
      {manageUrl ? (
        <div className="space-y-3 rounded-2xl bg-blue-50 p-4 text-left">
          <div className="space-y-1">
            <p className="text-sm font-black text-blue-700">みんなの結果を見るマイページ</p>
            <p className="text-sm font-bold leading-6 text-blue-900">挑戦人数、ランキング、問題ごとの正答率を確認できます。</p>
          </div>
          <a
            href={manageUrl}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-center font-black text-blue-700 shadow-[0_10px_24px_rgba(35,167,242,0.12)] ring-1 ring-blue-100 transition hover:-translate-y-0.5"
          >
            マイページへ移動
          </a>
          <Button type="button" variant="secondary" onClick={() => copy(manageUrl, "管理用URL")} className="w-full">
            管理用URLをコピー
          </Button>
        </div>
      ) : null}
      {message ? <p className="text-sm font-bold text-candy">{message}</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { QuestionBankType } from "@/lib/types";

type Props = {
  bankType: QuestionBankType;
  modeLabel: string;
  title: string;
  description: string;
  thumbnail: string;
};

export default function CreateBankForm({ bankType, modeLabel, title, description, thumbnail }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("名前を入力してください。");
      return;
    }

    localStorage.setItem("wakarite_question_bank", bankType);
    localStorage.setItem("wakarite_creator_name", cleanName.slice(0, 20));
    router.push("/create/count");
  }

  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">{modeLabel}</p>
          <h1 className="text-3xl font-black leading-tight">{title}を作ろう</h1>
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video w-full rounded-[24px] border border-white/90 object-cover shadow-[0_14px_34px_rgba(87,93,139,0.16)]"
          />
          <p className="font-bold leading-7 text-slate-600">{description}</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="grid gap-2 text-sm font-black">
            あなたの名前・ニックネーム
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              maxLength={20}
              placeholder="例：ワカリテ"
              className="min-h-14 rounded-2xl border border-slate-200 bg-white px-4 text-base font-bold outline-none transition focus:border-candy focus:ring-4 focus:ring-pink-100"
            />
          </label>
          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">
            問題数を選ぶ
          </Button>
        </form>
      </Card>
    </AppShell>
  );
}

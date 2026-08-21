"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function StartChallengeForm({ slug }: { slug: string }) {
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
    router.push(`/w/${slug}/play?name=${encodeURIComponent(cleanName.slice(0, 20))}`);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="grid gap-2 text-sm font-black">
        あなたの名前
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          maxLength={20}
          placeholder="例：ゆうき"
          className="min-h-14 rounded-2xl border border-slate-200 bg-white px-4 text-base font-bold outline-none transition focus:border-candy focus:ring-4 focus:ring-pink-100"
        />
      </label>
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full">
        挑戦する
      </Button>
    </form>
  );
}

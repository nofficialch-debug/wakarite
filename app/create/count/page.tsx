"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { getDiagnosisConfig } from "@/lib/diagnosis-config";
import { getQuestionBankLabel, isQuestionBankType } from "@/lib/question-banks";
import type { QuestionBankType, QuestionCount } from "@/lib/types";

const countDetails: Record<QuestionCount, { label: string; tone: string }> = {
  10: { label: "すぐ作れるお試し", tone: "from-orange-50 to-white text-orange-600 ring-orange-100" },
  20: { label: "サクッと遊べる", tone: "from-sky-50 to-white text-sky-600 ring-sky-100" },
  30: { label: "ほどよくしっかり", tone: "from-pink-50 to-white text-candy ring-pink-100" },
  50: { label: "ワカリテ度高め", tone: "from-violet-50 to-white text-lilac ring-violet-100" },
  75: { label: "かなり本気", tone: "from-amber-50 to-white text-amber-600 ring-amber-100" },
  100: { label: "ガチワカリテ", tone: "from-blue-50 to-white text-blue-700 ring-blue-100" }
};

export default function CreateCountPage() {
  const router = useRouter();
  const [creatorName, setCreatorName] = useState("");
  const [bankType, setBankType] = useState<QuestionBankType>("standard");

  useEffect(() => {
    const saved = localStorage.getItem("wakarite_creator_name") || "";
    if (!saved) router.replace("/create");
    const savedBank = localStorage.getItem("wakarite_question_bank");
    setCreatorName(saved);
    setBankType(isQuestionBankType(savedBank) ? savedBank : "standard");
  }, [router]);

  function selectCount(count: QuestionCount) {
    localStorage.setItem("wakarite_question_count", String(count));
    router.push("/create/questions");
  }

  const countOptions = getDiagnosisConfig(bankType).countOptions;

  return (
    <AppShell showCreateButton={false}>
      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-candy">QUESTION COUNT</p>
          <h1 className="text-3xl font-black leading-tight">何問の診断にする？</h1>
          <p className="font-bold leading-7 text-slate-600">
            {creatorName || "あなた"}の{getQuestionBankLabel(bankType)}を、問題数で難しさを選べます。
          </p>
        </div>

        <div className="grid gap-3">
          {countOptions.map((count) => {
            const detail = countDetails[count];
            return (
              <button
                key={count}
                type="button"
                onClick={() => selectCount(count)}
                className={`group flex min-h-20 items-center justify-between rounded-[22px] bg-gradient-to-br ${detail.tone} px-5 py-4 text-left shadow-[0_12px_30px_rgba(87,93,139,0.08)] ring-2 transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(87,93,139,0.14)]`}
              >
                <span>
                  <span className="block text-3xl font-black leading-none">{count}問</span>
                  <span className="mt-1 block text-sm font-black text-slate-500">{detail.label}</span>
                </span>
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-xl font-black text-ink shadow-[0_8px_20px_rgba(87,93,139,0.10)] transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}

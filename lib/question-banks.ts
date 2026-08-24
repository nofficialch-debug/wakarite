import { DIAGNOSIS_CONFIGS, getDiagnosisConfig } from "@/lib/diagnosis-config";
import { PRESET_QUESTIONS } from "@/lib/questions";
import { EXTRA_QUESTION_BANKS } from "@/lib/questions-extra";
import { PRIVATE_QUESTIONS } from "@/lib/questions-private";
import { ULTIMATE_QUESTIONS } from "@/lib/questions-ultimate";
import { VTUBER_QUESTIONS } from "@/lib/questions-vtuber";
import type { PresetQuestion, QuestionBankType } from "@/lib/types";

export function isQuestionBankType(value: string | null): value is QuestionBankType {
  return DIAGNOSIS_CONFIGS.some((config) => config.type === value);
}

export function getQuestionBank(type: QuestionBankType): PresetQuestion[] {
  if (type === "vtuber") return VTUBER_QUESTIONS;
  if (type === "private") return PRIVATE_QUESTIONS;
  if (type === "ultimate") return ULTIMATE_QUESTIONS;
  if (EXTRA_QUESTION_BANKS[type]) return EXTRA_QUESTION_BANKS[type];
  return PRESET_QUESTIONS;
}

export function getQuestionBankLabel(type: QuestionBankType) {
  return getDiagnosisConfig(type).title;
}

import { PRESET_QUESTIONS } from "@/lib/questions";
import { PRIVATE_QUESTIONS } from "@/lib/questions-private";
import { ULTIMATE_QUESTIONS } from "@/lib/questions-ultimate";
import { VTUBER_QUESTIONS } from "@/lib/questions-vtuber";
import type { PresetQuestion, QuestionBankType } from "@/lib/types";

export function isQuestionBankType(value: string | null): value is QuestionBankType {
  return value === "standard" || value === "vtuber" || value === "private" || value === "ultimate";
}

export function getQuestionBank(type: QuestionBankType): PresetQuestion[] {
  if (type === "vtuber") return VTUBER_QUESTIONS;
  if (type === "private") return PRIVATE_QUESTIONS;
  if (type === "ultimate") return ULTIMATE_QUESTIONS;
  return PRESET_QUESTIONS;
}

export function getQuestionBankLabel(type: QuestionBankType) {
  if (type === "vtuber") return "VTuberワカリテ";
  if (type === "private") return "プライベートワカリテ";
  if (type === "ultimate") return "究極の2択ワカリテ";
  return "定番のワカリテ";
}

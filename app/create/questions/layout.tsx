import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "質問に答える｜ワカリテ",
  description: "ワカリテ診断を作るために質問へ回答する作成途中ページです。"
};

export default function CreateQuestionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

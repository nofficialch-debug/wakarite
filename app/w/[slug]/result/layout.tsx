import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "ワカリテ診断の結果｜ワカリテ",
  description: "ワカリテ診断の正解数とワカリテ度を確認する結果ページです。"
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "みんなの結果を見るマイページ｜ワカリテ",
  description: "作成したワカリテ診断のランキングと共有リンクを確認する管理用ページです。"
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return children;
}

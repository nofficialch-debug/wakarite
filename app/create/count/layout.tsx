import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "問題数を選ぶ｜ワカリテ",
  description: "ワカリテ診断の問題数を選ぶ作成途中ページです。"
};

export default function CreateCountLayout({ children }: { children: React.ReactNode }) {
  return children;
}

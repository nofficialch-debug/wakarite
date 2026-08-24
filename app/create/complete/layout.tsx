import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "ワカリテ完成｜ワカリテ",
  description: "完成したワカリテ診断の共有リンクとマイページリンクを確認するページです。"
};

export default function CreateCompleteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

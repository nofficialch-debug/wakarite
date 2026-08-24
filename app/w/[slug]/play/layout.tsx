import { noIndexMetadata } from "@/lib/metadata";

export const metadata = {
  ...noIndexMetadata,
  title: "ワカリテ診断に挑戦｜ワカリテ",
  description: "友達や推しの答えを予想して、ワカリテ度をチェックする回答ページです。"
};

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return children;
}

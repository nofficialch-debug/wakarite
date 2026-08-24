import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "定番のワカリテを作る｜ワカリテ",
  description:
    "20問から100問まで選べる定番のワカリテ診断を作成できます。質問に答えて、友達や恋人にあなたのことをどれだけわかっているか挑戦してもらいましょう。",
  path: "/create",
  image: "/standard-wakarite-thumbnail.png"
});

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

const title = "VTuberワカリテを作る｜ワカリテ";
const description =
  "VTuber本人やリスナー向けに、推しのことをどれだけわかっているか楽しめる2択のワカリテ診断を作成できます。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "ワカリテ",
    images: [
      {
        url: "/vtuber-wakarite-thumbnail-v2.png",
        width: 1672,
        height: 941,
        alt: "VTuberワカリテ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/vtuber-wakarite-thumbnail-v2.png"]
  }
};

export default function CreateVtuberLayout({ children }: { children: React.ReactNode }) {
  return children;
}

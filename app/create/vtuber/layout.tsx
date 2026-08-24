import type { Metadata } from "next";

const title = "2択VTuberワカリテを作る｜ワカリテ";
const description =
  "リスナーや友達のVTuberにワカリテ診断をやってもらうために、あなたの2択VTuberワカリテを作成できます。";

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
        url: "/vtuber-wakarite-thumbnail-2choice.png",
        width: 1672,
        height: 941,
        alt: "2択VTuberワカリテ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/vtuber-wakarite-thumbnail-2choice.png"]
  }
};

export default function CreateVtuberLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

const title = "プライベートワカリテを作る｜ワカリテ";
const description =
  "寝方やスマホ、家での過ごし方など、身近だけど意外と知らないプライベートを4択で楽しめるワカリテ診断を作成できます。";

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
        url: "/private-wakarite-thumbnail.png",
        width: 1672,
        height: 941,
        alt: "プライベートワカリテ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/private-wakarite-thumbnail.png"]
  }
};

export default function CreatePrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

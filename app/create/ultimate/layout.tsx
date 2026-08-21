import type { Metadata } from "next";

const title = "究極の2択ワカリテを作る｜ワカリテ";
const description =
  "本人も悩みそうな恋愛、人生、お金、もしもの究極の2択で、友達と盛り上がるワカリテ診断を作成できます。";

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
        url: "/ultimate-wakarite-thumbnail-v2.png",
        width: 1672,
        height: 941,
        alt: "究極の2択ワカリテ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/ultimate-wakarite-thumbnail-v2.png"]
  }
};

export default function CreateUltimateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

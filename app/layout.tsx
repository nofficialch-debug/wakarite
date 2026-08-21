import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
const siteTitle = "ワカリテ｜私とあなたのワカリテ診断";
const siteDescription =
  "ワカリテは、友達や恋人がどれだけあなたを理解しているかを診断できる無料の理解度チェックサービスです。2択・4択のオリジナル診断を作成し、リンクを共有してワカリテ度をランキングで楽しめます。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "ワカリテ",
  keywords: ["ワカリテ", "診断", "理解度診断", "友達診断", "恋人診断", "相性診断", "2択診断", "4択診断", "性格診断", "クイズ作成"],
  verification: {
    google: "bVtR2_Xu9GfdS9SRmn1dugZLgug-1AmHNYg0kk8MH-k"
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "ワカリテ",
    type: "website",
    url: siteUrl,
    locale: "ja_JP",
    images: [
      {
        url: "/wakarite-ogp.png",
        width: 1920,
        height: 1080,
        alt: "ワカリテ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/wakarite-ogp.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wakarite.shirume.me";
const defaultImage = "/wakarite-ogp.png?v=20260822";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
  robots
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    robots,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ワカリテ",
      url,
      locale: "ja_JP",
      images: [
        {
          url: image,
          width: 1672,
          height: 941,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDiagnosisConfigBySlug } from "@/lib/diagnosis-config";
import CreateBankForm from "./CreateBankForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wakarite.shirume.me";

export function generateMetadata({ params }: { params: { bank: string } }): Metadata {
  const diagnosis = getDiagnosisConfigBySlug(params.bank);
  if (!diagnosis) return { title: "診断が見つかりません｜ワカリテ" };
  const title = `${diagnosis.title}を作る｜ワカリテ`;
  const description = diagnosis.description;
  const url = `${siteUrl}${diagnosis.createPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ワカリテ",
      url,
      images: [
        {
          url: diagnosis.thumbnail,
          width: 1672,
          height: 941,
          alt: diagnosis.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [diagnosis.thumbnail]
    }
  };
}

export default function CreateBankPage({ params }: { params: { bank: string } }) {
  const diagnosis = getDiagnosisConfigBySlug(params.bank);
  if (!diagnosis || diagnosis.createPath === "/create") notFound();

  return (
    <CreateBankForm
      bankType={diagnosis.type}
      modeLabel={diagnosis.badge}
      title={diagnosis.title}
      heading={diagnosis.type === "vtuber4" ? diagnosis.heading : undefined}
      description={diagnosis.description}
      thumbnail={diagnosis.thumbnail}
    />
  );
}

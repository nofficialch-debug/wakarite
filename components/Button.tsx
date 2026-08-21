import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#ff6fae_0%,#b58cff_52%,#61d6ff_100%)] text-white shadow-[0_12px_28px_rgba(255,111,174,0.24)] ring-1 ring-white/70 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(181,140,255,0.26)]",
  secondary:
    "bg-white/86 text-ink ring-1 ring-white/90 shadow-[0_10px_28px_rgba(87,93,139,0.10)] hover:-translate-y-0.5 hover:bg-white",
  ghost: "bg-transparent text-ink underline-offset-4 hover:underline"
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`min-h-12 rounded-[20px] px-5 py-3 text-center font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-[20px] px-5 py-3 text-center font-black transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

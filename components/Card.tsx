export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-[26px] border border-white/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.82))] p-5 shadow-[0_18px_48px_rgba(87,93,139,0.12)] ring-1 ring-slate-100/70 ${className}`}
    >
      {children}
    </section>
  );
}

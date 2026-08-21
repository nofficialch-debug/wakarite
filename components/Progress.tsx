export function Progress({ current, total }: { current: number; total: number }) {
  const width = `${Math.min(100, Math.max(0, (current / total) * 100))}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-bold text-slate-500">
        <span>
          {current} / {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-skysoft via-lilac to-candy transition-all" style={{ width }} />
      </div>
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="silver-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="oklch(0.95 0.006 270)" />
            <stop offset="50%" stopColor="oklch(0.65 0.008 270)" />
            <stop offset="100%" stopColor="oklch(0.95 0.006 270)" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18.5" stroke="url(#silver-grad)" strokeWidth="1" />
        <path d="M12 15.5 L20 26 L28 15.5 M14.5 22 L25.5 22" stroke="url(#silver-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wider text-silver-gradient">Silver Service</span>
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-silver-muted mt-0.5">Chauffeur · Est. MMXXV</span>
      </div>
    </div>
  );
}
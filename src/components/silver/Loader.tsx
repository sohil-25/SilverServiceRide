import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-1000 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <Logo />
        <div className="relative h-px w-48 overflow-hidden bg-border">
          <div className="absolute inset-y-0 left-0 w-1/2 animate-loader-sweep"
            style={{ background: "linear-gradient(90deg, transparent, var(--silver-bright), transparent)" }} />
        </div>
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-silver-muted">Preparing your motorcar</p>
      </div>
    </div>
  );
}
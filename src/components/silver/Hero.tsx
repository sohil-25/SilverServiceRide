import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import skyline from "@/assets/hero-skyline.jpg";
import lexus from "@/assets/hero-lexus.png";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden grain"
    >
      {/* Skyline parallax */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${y * 0.25}px, 0)` }}
      >
        <img
          src={skyline}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
      </div>

      {/* Road line */}
      <div className="pointer-events-none absolute bottom-[22%] left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.92 0.006 270 / 0.35), transparent)" }} />

      {/* Driving car */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 flex items-end justify-center">
        <div className="relative w-[140%] max-w-none animate-drive-across">
          <div className="relative mx-auto w-[60%] max-w-3xl animate-drive-idle">
            {/* Headlight glow */}
            <span
              className="absolute left-[6%] top-[58%] -z-10 block h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full animate-headlight"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.98 0.02 230 / 0.85), oklch(0.85 0.05 230 / 0.25) 35%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <img
              src={lexus}
              alt="Luxury black Lexus chauffeur sedan"
              width={1920}
              height={768}
              className="relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)]"
            />
            {/* Ground reflection */}
            <div className="absolute -bottom-2 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-[50%]"
              style={{ background: "radial-gradient(ellipse, oklch(0 0 0 / 0.7), transparent 70%)", filter: "blur(8px)" }} />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-32 text-center"
        style={{ transform: `translate3d(0, ${y * -0.08}px, 0)` }}
      >
        <span className="eyebrow animate-reveal-up">
          <span className="eyebrow-line" /> Chauffeur · Executive · Discreet
        </span>

        <h1 className="mt-8 max-w-5xl font-display text-5xl font-light leading-[1.05] text-foreground sm:text-7xl md:text-8xl animate-reveal-up" style={{ animationDelay: "0.1s" }}>
          Luxury Travel.
          <br />
          <span className="italic text-silver-gradient">Exceptional</span> Service.
        </h1>

        <p className="mt-8 max-w-xl text-base font-light text-muted-foreground sm:text-lg animate-reveal-up" style={{ animationDelay: "0.2s" }}>
          Premium chauffeur &amp; executive taxi services. A fleet of immaculate
          Lexus motorcars, attended by professionally trained drivers — at your
          service, day or night.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row animate-reveal-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#booking"
            className="btn-luxe hover:btn-luxe-hover group animate-fade-in"
          >
            Book Your Ride
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>

          <div
            className={`text-red-500 transition-opacity duration-500 ${
              y > 50 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ChevronDown className="h-5 w-5 animate-float-slow" />
          </div>

          <a href="#fleet" className="btn-ghost-luxe hover:border-silver hover:text-white">
            View Fleet
          </a>
        </div>
      </div>
    </section>
  );
}
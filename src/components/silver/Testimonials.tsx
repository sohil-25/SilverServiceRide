import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { name: "Alexander Hale", title: "CEO, Hale Capital", body: "Silver Service is the only chauffeur I trust before a board meeting. The car is library-quiet, the driver impeccably briefed. Faultless every time." },
  { name: "Isabella Moreau", title: "Wedding Planner, Paris", body: "From the white-glove arrival to the ribbon-detailed sedan, my couples are speechless. This is luxury done with restraint and taste." },
  { name: "Marcus Bennett", title: "Managing Partner, Bennett & Co.", body: "I've used limousine services on three continents — Silver Service raises the bar. Punctual to the minute, gracious without fail." },
  { name: "Sophia Lin", title: "Creative Director, Vogue Asia", body: "A genuinely refined experience. Spotless interiors, ambient music chosen by mood, and a chauffeur who anticipated every preference." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % reviews.length);
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="eyebrow"><span className="eyebrow-line" /> Words From Our Patrons</span>

        <div className="relative mt-16 min-h-[320px]">
          <Quote className="mx-auto h-10 w-10 text-silver/30" />
          <blockquote
            key={r.name}
            className="mt-8 font-display text-2xl font-light leading-relaxed text-silver-bright sm:text-4xl animate-reveal-up"
          >
            &ldquo;{r.body}&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-2 animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex gap-1 text-silver">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="font-display text-lg">{r.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-silver-muted">{r.title}</p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={prev} aria-label="Previous review" className="rounded-full border border-border p-3 text-silver-bright transition hover:border-silver hover:bg-card">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Go to review ${k + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-silver" : "w-4 bg-border"}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next review" className="rounded-full border border-border p-3 text-silver-bright transition hover:border-silver hover:bg-card">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
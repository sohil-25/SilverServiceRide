import { ShieldCheck, Award, Clock, Headphones, Sparkles, Lock } from "lucide-react";

const items = [
  { icon: Award, k: "01", t: "Professional Chauffeurs", d: "Every driver completes our 40-hour etiquette and defensive driving program." },
  { icon: Sparkles, k: "02", t: "Pristine Lexus Fleet", d: "Detailed before every journey. Climate-controlled garages, leather conditioned weekly." },
  { icon: Clock, k: "03", t: "Punctual to the Minute", d: "Pre-route surveys and live traffic monitoring ensure on-the-dot arrivals." },
  { icon: Headphones, k: "04", t: "24 / 7 Concierge", d: "A real human, never a queue — reach our dispatch desk at any hour." },
  { icon: ShieldCheck, k: "05", t: "Safe & Insured", d: "Comprehensive coverage on every ride, every passenger, every mile." },
  { icon: Lock, k: "06", t: "Absolute Discretion", d: "Confidentiality agreements and tinted privacy glass as standard." },
];

export function WhyChoose() {
  return (
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="eyebrow-line" /> Why Silver Service</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-6xl">
            The details that define <span className="italic text-silver-gradient">excellence</span>.
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, k, t, d }, i) => (
            <div key={k} className="reveal group relative" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl font-light text-silver-muted/40 transition-colors group-hover:text-silver">
                  {k}
                </span>
                <Icon className="h-5 w-5 text-silver transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-normal">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              <div className="hairline mt-6 w-12 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
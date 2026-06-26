import sedan from "@/assets/fleet-sedan.jpg";
import suv from "@/assets/fleet-suv.jpg";
import van from "@/assets/fleet-van.jpg";
import { Users, Briefcase, Gauge } from "lucide-react";

const fleet = [
  {
    name: "Lexus LS 500h",
    tag: "Executive Sedan",
    img: sedan,
    desc: "The flagship hybrid limousine. Reclining rear cabin, Mark Levinson audio, library-quiet ride.",
    specs: [
      { icon: Users, label: "3 Passengers" },
      { icon: Briefcase, label: "3 Suitcases" },
      { icon: Gauge, label: "Hybrid V6" },
    ],
  },
  {
    name: "Lexus LX 600",
    tag: "Luxury SUV",
    img: suv,
    desc: "Commanding seven-seat tourer for executive groups and family arrivals. Captain's chairs, panoramic glass.",
    specs: [
      { icon: Users, label: "6 Passengers" },
      { icon: Briefcase, label: "5 Suitcases" },
      { icon: Gauge, label: "Twin-Turbo V6" },
    ],
  },
  {
    name: "Lexus LM 350h",
    tag: "Private Lounge",
    img: van,
    desc: "A four-seat cabin with electrically reclining thrones, 48-inch display and silent climate isolation.",
    specs: [
      { icon: Users, label: "4 Passengers" },
      { icon: Briefcase, label: "6 Suitcases" },
      { icon: Gauge, label: "Hybrid AWD" },
    ],
  },
];

export function Fleet() {
  return (
    <section id="fleet" className="relative py-32">
      <div className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "radial-gradient(ellipse at top, oklch(0.16 0.005 270) 0%, transparent 60%)" }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="eyebrow-line" /> The Fleet</span>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-6xl">
              A garage of <span className="italic text-silver-gradient">immaculate</span> Lexus motorcars.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Each vehicle is no more than two model years old, professionally
            detailed before every journey and equipped with refreshments and Wi-Fi.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {fleet.map((v, i) => (
            <article
              key={v.name}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-700 hover:-translate-y-2 hover:border-silver/60"
              style={{ transitionDelay: `${i * 80}ms`, boxShadow: "var(--shadow-luxe)" }}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-onyx">
                <img
                  src={v.img}
                  alt={v.name}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full border border-silver/40 bg-background/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-silver-bright backdrop-blur">
                  {v.tag}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-3xl font-normal">{v.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                <div className="hairline my-6" />
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {v.specs.map(({ icon: I, label }) => (
                    <li key={label} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver">
                      <I className="h-3.5 w-3.5" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
import interior from "@/assets/about-interior.jpg";

const stats = [
  { n: "18+", l: "Years of Service" },
  { n: "42", l: "Lexus Motorcars" },
  { n: "98%", l: "Repeat Patrons" },
  { n: "24/7", l: "Concierge Desk" },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-3xl border border-border" style={{ boxShadow: "var(--shadow-luxe)" }}>
            <img
              src={interior}
              alt="Cream leather rear cabin of a Lexus chauffeur sedan"
              loading="lazy"
              width={1280}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-onyx/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden rounded-2xl glass-panel p-6 md:block animate-float-slow">
            <p className="font-display text-3xl text-silver-gradient">MMXXV</p>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-silver-muted">Crafted with care</p>
          </div>
        </div>

        <div className="reveal">
          <span className="eyebrow"><span className="eyebrow-line" /> Our Story</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">
            A quiet pursuit of <span className="italic text-silver-gradient">perfection</span>, mile after mile.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Silver Service was founded on a simple belief: that travel between
            two points can itself be a moment of luxury. For nearly two decades
            we have refined a single discipline — moving discerning passengers
            in immaculate Lexus motorcars, with chauffeurs who treat every
            journey as a private occasion.
          </p>
          <p className="mt-4 text-muted-foreground">
            From the first courteous greeting to the final door held open, we
            measure ourselves not by the speed of arrival, but by the grace of
            the experience along the way.
          </p>

          <div className="hairline my-10 w-full" />

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl font-light text-silver-gradient">{s.n}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-silver-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
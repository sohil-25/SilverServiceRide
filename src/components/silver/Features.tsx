import { Plane, Briefcase, Crown, Heart, MapPin, UserCheck } from "lucide-react";

const items = [
  { icon: Plane, title: "Executive Airport Transfers", desc: "Flight-tracked arrivals, meet-and-greet, complimentary 60-minute wait time." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Account-managed transport for executives, conferences and on-site days." },
  { icon: Crown, title: "VIP Chauffeur Service", desc: "Personally assigned chauffeur for full-day or multi-stop itineraries." },
  { icon: Heart, title: "Weddings & Events", desc: "Polished motorcars, ribbon detailing and red-carpet arrivals." },
  { icon: MapPin, title: "Long-Distance Luxury", desc: "Intercity travel with bespoke routing, refreshments and Wi-Fi onboard." },
  { icon: UserCheck, title: "Uniformed Professionals", desc: "Background-checked, courteously trained, formally attired chauffeurs." },
];

export function Features() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="eyebrow-line" /> Services</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-6xl">
            A complete spectrum of <span className="italic text-silver-gradient">chauffeured</span> travel.
          </h2>
          <p className="mt-5 text-muted-foreground">
            From arrivals lounge to boardroom, ceremony to celebration — every
            journey conducted with discretion and precision.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal group relative bg-background p-10 transition-colors duration-700 hover:bg-card"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary transition-all duration-500 group-hover:border-silver group-hover:bg-background">
                <Icon className="h-5 w-5 text-silver group-hover:text-silver-bright" />
              </div>
              <h3 className="font-display text-2xl font-normal">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="hairline mt-8 w-0 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
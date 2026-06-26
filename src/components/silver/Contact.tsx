import { Phone, Mail, MapPin, MessageCircle, Instagram, Linkedin, Facebook } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="eyebrow-line" /> Concierge</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-6xl">
            At your <span className="italic text-silver-gradient">service</span>, day or night.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactCard icon={Phone} label="Direct Line" value="+1 800 555 0199" href="tel:+18005550199" />
            <ContactCard icon={MessageCircle} label="WhatsApp" value="Message our concierge" href="https://wa.me/18005550199" accent />
            <ContactCard icon={Mail} label="Reservations" value="reserve@silverservice.com" href="mailto:reserve@silverservice.com" />
            <ContactCard icon={MapPin} label="Headquarters" value="1 Park Avenue, New York, NY 10016" href="https://maps.google.com/?q=1+Park+Avenue+New+York" />

            <div className="flex gap-3 pt-4">
              {[Instagram, Linkedin, Facebook].map((I, k) => (
                <a
                  key={k}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-silver-bright transition-all duration-500 hover:-translate-y-1 hover:border-silver hover:bg-card"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-border" style={{ boxShadow: "var(--shadow-luxe)" }}>
            <iframe
              title="Silver Service headquarters"
              src="https://www.google.com/maps?q=Park+Avenue+New+York&output=embed"
              className="h-full min-h-[420px] w-full grayscale-[0.8] contrast-125"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`reveal group flex items-center justify-between gap-6 rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-0.5 ${
        accent
          ? "border-silver/40 bg-card hover:border-silver"
          : "border-border bg-card/40 hover:border-silver/60 hover:bg-card"
      }`}
    >
      <div className="flex items-center gap-5">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-silver group-hover:border-silver">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-silver-muted">{label}</p>
          <p className="mt-1 font-display text-lg text-silver-bright">{value}</p>
        </div>
      </div>
      <span className="text-xs uppercase tracking-[0.25em] text-silver opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        →
      </span>
    </a>
  );
}
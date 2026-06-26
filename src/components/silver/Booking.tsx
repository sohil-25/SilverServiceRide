import { useMemo, useState } from "react";
import { MapPin, Calendar, Users, Car, ArrowRight } from "lucide-react";

const vehicles = [
  { id: "sedan", name: "Lexus LS 500h — Sedan", rate: 95 },
  { id: "suv", name: "Lexus LX 600 — SUV", rate: 135 },
  { id: "lounge", name: "Lexus LM 350h — Lounge", rate: 175 },
];

export function Booking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("sedan");
  const [pax, setPax] = useState(2);

  const quote = useMemo(() => {
    const v = vehicles.find((x) => x.id === vehicle);
    if (!v || !pickup || !dropoff) return null;
    const base = v.rate;
    const distanceEst = Math.max(15, (pickup.length + dropoff.length) * 1.4);
    return Math.round(base + distanceEst * 2.4);
  }, [vehicle, pickup, dropoff]);

  return (
    <section id="booking" className="relative py-32">
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at bottom, oklch(0.16 0.005 270) 0%, transparent 60%)" }} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="eyebrow-line" /> Reserve</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-6xl">
            Book your <span className="italic text-silver-gradient">private</span> journey.
          </h2>
          <p className="mt-5 text-muted-foreground">
            An instant indicative quote — a member of our concierge will confirm
            your reservation within 15 minutes.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="reveal mt-16 grid grid-cols-1 gap-6 rounded-3xl glass-panel p-8 md:p-12 lg:grid-cols-[1.4fr_1fr]"
          style={{ boxShadow: "var(--shadow-luxe)" }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field icon={MapPin} label="Pickup Location">
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. JFK Terminal 4" className="luxe-input" />
            </Field>
            <Field icon={MapPin} label="Destination">
              <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="e.g. Manhattan, NYC" className="luxe-input" />
            </Field>
            <Field icon={Calendar} label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="luxe-input" />
            </Field>
            <Field icon={Calendar} label="Time">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="luxe-input" />
            </Field>
            <Field icon={Car} label="Vehicle">
              <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="luxe-input">
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-card">{v.name}</option>
                ))}
              </select>
            </Field>
            <Field icon={Users} label="Passengers">
              <input type="number" min={1} max={6} value={pax} onChange={(e) => setPax(+e.target.value)} className="luxe-input" />
            </Field>
          </div>

          <aside className="flex flex-col justify-between rounded-2xl border border-silver/20 bg-onyx/60 p-8">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-silver-muted">Estimated Quote</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl font-light text-silver-gradient">
                  {quote ? `$${quote}` : "—"}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-silver-muted">USD</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Indicative price including chauffeur, fuel, tolls and 18% gratuity.
                Final fare confirmed upon dispatch.
              </p>
              <div className="hairline my-6" />
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex justify-between"><span>Meet &amp; greet</span><span className="text-silver">Included</span></li>
                <li className="flex justify-between"><span>Wait time (60 min)</span><span className="text-silver">Included</span></li>
                <li className="flex justify-between"><span>Bottled water &amp; Wi-Fi</span><span className="text-silver">Included</span></li>
              </ul>
            </div>

            <button type="submit" className="btn-luxe hover:btn-luxe-hover group mt-8 w-full">
              Confirm Reservation
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </aside>
        </form>
      </div>

      <style>{`
        .luxe-input {
          width: 100%;
          background: oklch(0.10 0.005 270 / 0.7);
          border: 1px solid oklch(0.92 0.006 270 / 0.12);
          color: var(--foreground);
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          transition: all 0.4s var(--ease-luxe);
          color-scheme: dark;
        }
        .luxe-input:focus {
          outline: none;
          border-color: var(--silver);
          box-shadow: 0 0 0 4px oklch(0.78 0.008 270 / 0.12);
          background: oklch(0.12 0.005 270 / 0.9);
        }
        .luxe-input::placeholder { color: var(--silver-muted); }
      `}</style>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-silver">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      {children}
    </label>
  );
}
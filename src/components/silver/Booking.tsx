import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Calendar, Users, Car, ArrowRight } from "lucide-react";

const vehicles = [
  { id: "sedan", name: "Lexus LS 500h — Sedan", rate: 95 },
  { id: "suv", name: "Lexus LX 600 — SUV", rate: 135 },
  { id: "lounge", name: "Lexus LM 350h — Lounge", rate: 175 },
];

const MOCK_LOCATIONS = [
  "JFK International Airport (JFK), Queens, NY",
  "LaGuardia Airport (LGA), Queens, NY",
  "Newark Liberty International Airport (EWR), Newark, NJ",
  "Manhattan, New York City, NY",
  "Brooklyn, New York City, NY",
  "The Plaza Hotel, Fifth Avenue, NYC",
  "Central Park, Manhattan, NY",
  "Grand Central Terminal, Midtown East, NYC",
  "East Hampton, Long Island, NY",
  "Greenwich, Connecticut",
];

export function Booking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("sedan");
  const [pax, setPax] = useState(2);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const pickupRef = useRef<HTMLInputElement>(null);
  const dropoffRef = useRef<HTMLInputElement>(null);

  // Load Google Maps API script dynamically
  useEffect(() => {
    const win = window as any;
    if (win.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
    if (!apiKey) {
      console.warn("VITE_GOOGLE_MAPS_API_KEY is not defined. Google Maps Autocomplete will fall back to local mock suggestions.");
      return;
    }

    const scriptId = "google-maps-api-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const onLoad = () => setIsLoaded(true);
    script.addEventListener("load", onLoad);
    return () => {
      script.removeEventListener("load", onLoad);
    };
  }, []);

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    if (!isLoaded) return;
    const win = window as any;
    if (!win.google?.maps?.places) return;

    const options = {
      types: ["geocode", "establishment"],
    };

    const pickupAutocomplete = new win.google.maps.places.Autocomplete(
      pickupRef.current!,
      options
    );
    pickupAutocomplete.addListener("place_changed", () => {
      const place = pickupAutocomplete.getPlace();
      setPickup(place.formatted_address || place.name || "");
    });

    const dropoffAutocomplete = new win.google.maps.places.Autocomplete(
      dropoffRef.current!,
      options
    );
    dropoffAutocomplete.addListener("place_changed", () => {
      const place = dropoffAutocomplete.getPlace();
      setDropoff(place.formatted_address || place.name || "");
    });

    return () => {
      win.google?.maps?.event?.clearInstanceListeners(pickupAutocomplete);
      win.google?.maps?.event?.clearInstanceListeners(dropoffAutocomplete);
    };
  }, [isLoaded]);

  const filteredPickupSuggestions = useMemo(() => {
    if (!pickup.trim()) return [];
    return MOCK_LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(pickup.toLowerCase())
    );
  }, [pickup]);

  const filteredDropoffSuggestions = useMemo(() => {
    if (!dropoff.trim()) return [];
    return MOCK_LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(dropoff.toLowerCase())
    );
  }, [dropoff]);

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
              <div className="relative w-full">
                <input
                  ref={pickupRef}
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    if (!isLoaded) {
                      setShowPickupSuggestions(true);
                    }
                  }}
                  onFocus={() => {
                    if (!isLoaded && pickup.trim().length > 0) {
                      setShowPickupSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowPickupSuggestions(false), 200);
                  }}
                  placeholder="e.g. JFK Terminal 4"
                  className="luxe-input text-ellipsis overflow-hidden"
                />
                {!isLoaded && showPickupSuggestions && filteredPickupSuggestions.length > 0 && (
                  <ul className="custom-autocomplete-dropdown">
                    {filteredPickupSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        onMouseDown={() => {
                          setPickup(suggestion);
                          setShowPickupSuggestions(false);
                        }}
                        className="custom-autocomplete-item"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-silver-muted" />
                        <span className="truncate">{suggestion}</span>
                      </li>
                    ))}
                    <li className="custom-autocomplete-footer">
                      Demo location (add Google Maps API Key for live search)
                    </li>
                  </ul>
                )}
              </div>
            </Field>
            <Field icon={MapPin} label="Destination">
              <div className="relative w-full">
                <input
                  ref={dropoffRef}
                  value={dropoff}
                  onChange={(e) => {
                    setDropoff(e.target.value);
                    if (!isLoaded) {
                      setShowDropoffSuggestions(true);
                    }
                  }}
                  onFocus={() => {
                    if (!isLoaded && dropoff.trim().length > 0) {
                      setShowDropoffSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowDropoffSuggestions(false), 200);
                  }}
                  placeholder="e.g. Manhattan, NYC"
                  className="luxe-input text-ellipsis overflow-hidden"
                />
                {!isLoaded && showDropoffSuggestions && filteredDropoffSuggestions.length > 0 && (
                  <ul className="custom-autocomplete-dropdown">
                    {filteredDropoffSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        onMouseDown={() => {
                          setDropoff(suggestion);
                          setShowDropoffSuggestions(false);
                        }}
                        className="custom-autocomplete-item"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-silver-muted" />
                        <span className="truncate">{suggestion}</span>
                      </li>
                    ))}
                    <li className="custom-autocomplete-footer">
                      Demo location (add Google Maps API Key for live search)
                    </li>
                  </ul>
                )}
              </div>
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

        /* Custom Autocomplete Dropdown Styling */
        .custom-autocomplete-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          z-index: 50;
          margin-top: 0.5rem;
          max-height: 250px;
          overflow-y: auto;
          border-radius: 0.75rem;
          background: oklch(0.12 0.005 270);
          border: 1px solid oklch(0.92 0.006 270 / 0.15);
          box-shadow: var(--shadow-luxe);
          padding: 0.25rem 0;
        }
        .custom-autocomplete-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: var(--foreground);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .custom-autocomplete-item:hover {
          background-color: oklch(0.16 0.005 270 / 0.8);
        }
        .custom-autocomplete-footer {
          padding: 0.5rem 1rem 0.25rem 1rem;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--silver-muted);
          border-top: 1px solid oklch(0.92 0.006 270 / 0.06);
          pointer-events: none;
        }

        /* Google Maps Autocomplete Dropdown Styled Overrides */
        .pac-container {
          background-color: oklch(0.12 0.005 270) !important;
          border: 1px solid oklch(0.92 0.006 270 / 0.15) !important;
          border-radius: 0.75rem !important;
          box-shadow: var(--shadow-luxe) !important;
          font-family: var(--font-sans) !important;
          margin-top: 4px !important;
          z-index: 9999 !important;
          padding: 0.25rem 0 !important;
        }
        .pac-item {
          border-top: 1px solid oklch(0.92 0.006 270 / 0.06) !important;
          padding: 0.75rem 1rem !important;
          color: var(--foreground) !important;
          font-size: 0.85rem !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          transition: background-color 0.2s ease !important;
        }
        .pac-item:hover {
          background-color: oklch(0.16 0.005 270 / 0.8) !important;
        }
        .pac-item-query {
          font-size: 0.85rem !important;
          color: var(--foreground) !important;
          padding-right: 0.25rem !important;
        }
        .pac-matched {
          color: var(--silver-bright) !important;
          font-weight: 600 !important;
        }
        .pac-icon {
          display: none !important;
        }
        .hdpi .pac-logo:after {
          background-image: none !important;
          height: 0 !important;
          padding: 0 !important;
        }
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
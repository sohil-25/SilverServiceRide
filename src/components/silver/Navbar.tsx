import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "#fleet", label: "Fleet" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "py-3" : "py-6"
        }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-700 ${scrolled ? "glass-panel rounded-full px-6 py-3" : ""
          }`}
      >
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-xs font-medium uppercase tracking-[0.25em] text-silver-muted transition-colors duration-300 hover:text-silver-bright"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-silver transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-silver-bright transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            +1 800 555 0199
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-full border border-silver/30 bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-silver-bright transition-all duration-300 hover:border-silver-bright hover:bg-silver/10 hover:text-white"
          >
            Book Ride
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-border p-2 text-silver-bright md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="mx-6 mt-3 rounded-2xl glass-panel p-6 md:hidden animate-reveal-up">
          <nav className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.3em] text-silver-bright"
              >
                {l.label}
              </a>
            ))}
            <hr className="border-t border-border/30 my-1" />
            <a
              href="tel:+18005550199"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-silver-bright"
            >
              <Phone className="h-3.5 w-3.5" />
              +1 800 555 0199
            </a>
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-silver-bright via-silver to-silver-bright py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-onyx shadow-md transition hover:opacity-90"
            >
              Book Ride
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
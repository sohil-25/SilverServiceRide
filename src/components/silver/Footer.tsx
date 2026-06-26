import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium chauffeur and executive taxi services. A discreet
              standard of travel for those who require nothing less.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-silver">Services</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-silver-bright">Airport Transfers</a></li>
              <li><a href="#services" className="hover:text-silver-bright">Corporate Travel</a></li>
              <li><a href="#services" className="hover:text-silver-bright">Weddings &amp; Events</a></li>
              <li><a href="#services" className="hover:text-silver-bright">Long-Distance</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-silver">Company</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-silver-bright">Our Story</a></li>
              <li><a href="#fleet" className="hover:text-silver-bright">The Fleet</a></li>
              <li><a href="#contact" className="hover:text-silver-bright">Contact</a></li>
              <li><a href="#booking" className="hover:text-silver-bright">Reserve</a></li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-silver-muted md:flex-row">
          <p>© MMXXV Silver Service. All rights reserved.</p>
          <p>Crafted with discretion · Driven with grace</p>
        </div>
      </div>
    </footer>
  );
}
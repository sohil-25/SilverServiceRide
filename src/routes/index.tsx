import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/silver/Navbar";
import { Hero } from "@/components/silver/Hero";
import { Features } from "@/components/silver/Features";
import { Fleet } from "@/components/silver/Fleet";
import { WhyChoose } from "@/components/silver/WhyChoose";
import { Booking } from "@/components/silver/Booking";
import { Testimonials } from "@/components/silver/Testimonials";
import { About } from "@/components/silver/About";
import { Contact } from "@/components/silver/Contact";
import { Footer } from "@/components/silver/Footer";
import { Loader } from "@/components/silver/Loader";
import { useReveal } from "@/components/silver/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Silver Service — Luxury Chauffeur & Executive Taxi" },
      { name: "description", content: "Premium chauffeur-driven Lexus transportation for executives, airport transfers, weddings and long-distance luxury travel. Available 24/7." },
      { property: "og:title", content: "Silver Service — Luxury Chauffeur & Executive Taxi" },
      { property: "og:description", content: "Premium chauffeur-driven Lexus transportation. Punctual, discreet, exceptional — available 24/7." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="relative overflow-x-clip">
      <Loader />
      <Navbar />
      <Hero />
      <Features />
      <Fleet />
      <WhyChoose />
      <Booking />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

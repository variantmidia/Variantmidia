import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Credibility } from "@/components/landing/sections/Credibility";
import { Differentials } from "@/components/landing/sections/Differentials";
import { FAQ } from "@/components/landing/sections/FAQ";
import { FinalCTA } from "@/components/landing/sections/FinalCTA";
import { Hero } from "@/components/landing/sections/Hero";
import { Objections } from "@/components/landing/sections/Objections";
import { Operation } from "@/components/landing/sections/Operation";
import { Pain } from "@/components/landing/sections/Pain";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-vm-bg text-vm-graphite">
        <Hero />
        <Credibility />
        <Pain />
        <Operation />
        <Differentials />
        <Objections />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

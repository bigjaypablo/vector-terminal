import Hero from "../components/landing/Hero";
import TrustStrip from "../components/landing/TrustStrip";

export function Landing() {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      <Hero />
      <TrustStrip />
    </div>
  );
}

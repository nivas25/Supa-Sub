import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Analytics from "./_components/Analytics"; // Restored
import Steps from "./_components/Steps";
import ProfileShowcase from "./_components/ProfileShowcase";
import Identity from "./_components/Identity"; // Restored
import Pricing from "./_components/Pricing";
import ProfitCalculator from "./_components/ProfitCalculator";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <main style={{ position: "relative" }}>
      <Navbar />

      <Hero />

      {/* Identity is back on the page, but not in the Navbar */}
      <section>
        <Identity />
      </section>

      <section id="features">
        <Features />
      </section>

      {/* Analytics is back on the page, but not in the Navbar */}
      <section id="analytics">
        <Analytics />
      </section>

      <section id="steps">
        <Steps />
      </section>

      <section id="showcase">
        <ProfileShowcase />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="profitCalculator">
        <ProfitCalculator />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}

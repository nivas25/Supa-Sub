import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Analytics from "./_components/Analytics"; // Import the new section
import Steps from "./_components/Steps";
import ProfileShowcase from "./_components/ProfileShowcase";
import Identity from "./_components/Identity";
import FAQ from "./_components/FAQ";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section>
        <Identity />
      </section>

      <section id="features">
        <Features />
      </section>

      {/* NEW: ANALYTICS "SPECTRUM COMMAND CENTER" */}
      <section id="analytics">
        <Analytics />
      </section>

      <section id="blueprint">
        <Steps />
      </section>

      <section id="showcase">
        <ProfileShowcase />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}

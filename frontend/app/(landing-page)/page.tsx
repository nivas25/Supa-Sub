import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Steps from "./_components/Steps";
import ProfileShowcase from "./_components/ProfileShowcase";
import Identity from "./_components/Identity";
import FAQ from "./_components/FAQ";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <main
      style={{
        overflow: "clip",
        scrollBehavior: "smooth",
        background: "#ffffff00", // Pure white base for the industrial look
      }}
    >
      <Navbar />

      <Hero />

      <section id="features">
        <Features />
      </section>

      <section id="blueprint">
        <Steps />
      </section>

      {/* NEW SECTION: SHOWCASE THE CREATORS */}
      <section id="showcase">
        <ProfileShowcase />
      </section>

      <section>
        <Identity />
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

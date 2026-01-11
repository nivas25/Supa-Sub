import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Marketplace from "./_components/Marketplace";
import Features from "./_components/Features";
import Vault from "./_components/Vault";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    /* IMPORTANT: We use overflow: clip instead of hidden. 
       'clip' prevents horizontal scroll but does NOT break position: sticky.
    */
    <main style={{ overflow: "clip", scrollBehavior: "smooth" }}>
      {/* 1. FIXED NAVIGATION */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <Hero />

      {/* 3. MARKETPLACE SECTION */}
      <section id="marketplace">
        <Marketplace />
      </section>

      {/* 4. FEATURES SECTION - Sticky scroll now works */}
      <section id="features">
        <Features />
      </section>

      {/* 5. VAULT SECTION */}
      <section id="vault">
        <Vault />
      </section>

      {/* 6. PRICING SECTION */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* 7. FULL COMMAND CENTER FOOTER */}
      <Footer />
    </main>
  );
}

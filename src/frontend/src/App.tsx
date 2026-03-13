import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import AboutUs from "./components/AboutUs";
import AdminPanel from "./components/AdminPanel";
import CTASection from "./components/CTASection";
import Chatbot from "./components/Chatbot";
import ConsultationForm from "./components/ConsultationForm";
import EstimateCalculator from "./components/EstimateCalculator";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurFounder from "./components/OurFounder";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Services from "./components/Services";
import TechPlatform from "./components/TechPlatform";
import Testimonials from "./components/Testimonials";
import WhyUs from "./components/WhyUs";

function App() {
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const technologyRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === "/admin" || hash === "#admin") {
      setShowAdminPanel(true);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "admin-panel") {
      setShowAdminPanel(true);
      return;
    }

    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      about: aboutRef,
      services: servicesRef,
      process: processRef,
      technology: technologyRef,
      whyus: whyUsRef,
      portfolio: portfolioRef,
      contact: contactRef,
      calculator: calculatorRef,
    };

    const ref = refs[sectionId];
    if (ref?.current) {
      const headerOffset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== "admin") {
      setTimeout(() => scrollToSection(hash), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showAdminPanel) {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <div style={{ backgroundColor: "#0A1628" }} className="shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                type="button"
                data-ocid="admin.back.button"
                onClick={() => setShowAdminPanel(false)}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                ← Back to Site
              </button>
              <span className="text-white font-display font-bold text-lg">
                Urban Thekedaar — Admin
              </span>
              <div className="w-24" />
            </div>
          </div>
          <AdminPanel />
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={scrollToSection} />
      <main>
        <Hero onNavigate={scrollToSection} />
        <AboutUs ref={aboutRef} />
        <Services ref={servicesRef} />
        <Process ref={processRef} />
        <TechPlatform ref={technologyRef} />
        <WhyUs ref={whyUsRef} />
        <Portfolio ref={portfolioRef} />
        <OurFounder />
        <Testimonials />
        <ConsultationForm ref={contactRef} />
        <section ref={calculatorRef}>
          <EstimateCalculator />
        </section>
        <CTASection onNavigate={scrollToSection} />
      </main>
      <Footer onNavigate={scrollToSection} />
      <Chatbot />
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919910801994"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        className="fixed bottom-24 left-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <Toaster />
    </div>
  );
}

export default App;

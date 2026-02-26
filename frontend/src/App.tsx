import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurFounder from './components/OurFounder';
import HowWeWork from './components/HowWeWork';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import EstimateCalculator from './components/EstimateCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdminPanel from './components/AdminPanel';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const aboutRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const howWeWorkRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Check URL for /admin path on load
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || hash === '#admin') {
      setShowAdminPanel(true);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'admin-panel') {
      setShowAdminPanel(true);
      return;
    }

    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      about: aboutRef,
      founder: founderRef,
      'how-we-work': howWeWorkRef,
      process: processRef,
      whyus: whyUsRef,
      calculator: calculatorRef,
      contact: contactRef,
    };

    const ref = refs[sectionId];
    if (ref?.current) {
      const headerOffset = 112;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== 'admin') {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, []);

  if (showAdminPanel) {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <div className="bg-black/80 backdrop-blur-md shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => setShowAdminPanel(false)}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                ← Back to Site
              </button>
              <span className="text-white font-bold text-lg">Urban Thekedaar — Admin</span>
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
        <Hero />
        <AboutUs ref={aboutRef} />
        <OurFounder ref={founderRef} />
        <HowWeWork ref={howWeWorkRef} />
        <Process ref={processRef} />
        <WhyUs ref={whyUsRef} />
        <Testimonials />
        <section ref={calculatorRef}>
          <EstimateCalculator />
        </section>
        <Contact ref={contactRef} />
      </main>
      <Footer />
      <Chatbot />
      <Toaster />
    </div>
  );
}

export default App;

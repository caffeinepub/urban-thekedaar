import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import EstimateCalculator from './components/EstimateCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdminInquiries from './components/AdminInquiries';
import AdminPanel from './components/AdminPanel';
import ProfileSetup from './components/ProfileSetup';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

function App() {
  const aboutRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const adminRef = useRef<HTMLElement>(null);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Check URL for /admin path on load
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || hash === '#admin') {
      setShowAdminPanel(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'admin-panel') {
      setShowAdminPanel(true);
      return;
    }

    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      about: aboutRef,
      process: processRef,
      whyus: whyUsRef,
      calculator: calculatorRef,
      contact: contactRef,
      admin: adminRef,
    };

    const ref = refs[sectionId];
    if (ref?.current) {
      const headerOffset = 80;
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
        <AdminPanel onBack={() => setShowAdminPanel(false)} />
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
        <Process ref={processRef} />
        <WhyUs ref={whyUsRef} />
        <EstimateCalculator ref={calculatorRef} />
        <Contact ref={contactRef} />
        {isAuthenticated && <AdminInquiries ref={adminRef} />}
      </main>
      <Footer />
      <Chatbot />
      <Toaster />
      {showProfileSetup && (
        <ProfileSetup onClose={() => setShowProfileSetup(false)} />
      )}
    </div>
  );
}

export default App;

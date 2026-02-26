import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '@/hooks/useQueries';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

function UrbanThekedaarLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Construction-themed SVG icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary shadow-sm">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          aria-hidden="true"
        >
          {/* Hard hat shape */}
          <path
            d="M20 6C13.5 6 8.5 10.5 8 16.5H32C31.5 10.5 26.5 6 20 6Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Brim */}
          <rect x="6" y="16" width="28" height="4" rx="2" fill="white" fillOpacity="0.85" />
          {/* Building outline below */}
          <rect x="12" y="24" width="4" height="8" rx="0.5" fill="white" fillOpacity="0.7" />
          <rect x="18" y="22" width="4" height="10" rx="0.5" fill="white" fillOpacity="0.9" />
          <rect x="24" y="25" width="4" height="7" rx="0.5" fill="white" fillOpacity="0.7" />
        </svg>
      </div>
      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground font-display">
          Urban
        </span>
        <span className="text-sm font-semibold tracking-widest uppercase text-primary font-display">
          Thekedaar
        </span>
      </div>
    </div>
  );
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin } = useIsCallerAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About Us', id: 'about' },
    { label: 'Process', id: 'process' },
    { label: 'Why Us', id: 'whyus' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Contact', id: 'contact' },
    ...(isAuthenticated && isAdmin ? [{ label: 'Inquiries', id: 'admin' }] : []),
    { label: 'Admin', id: 'admin-panel' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Urban Thekedaar - Go to top"
          >
            <UrbanThekedaarLogo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={item.id === 'admin-panel' ? 'outline' : 'ghost'}
                onClick={() => handleNavClick(item.id)}
                className={
                  item.id === 'admin-panel'
                    ? 'text-primary border-primary/40 hover:bg-primary/10 font-medium ml-1'
                    : 'text-foreground hover:text-primary hover:bg-primary/10 font-medium'
                }
                size="sm"
              >
                {item.label}
              </Button>
            ))}
            <div className="ml-2">
              <LoginButton />
            </div>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="pb-4 border-b">
                  <UrbanThekedaarLogo />
                </div>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={item.id === 'admin-panel' ? 'outline' : 'ghost'}
                    onClick={() => handleNavClick(item.id)}
                    className={
                      item.id === 'admin-panel'
                        ? 'justify-start text-lg font-medium text-primary border-primary/40'
                        : 'justify-start text-lg font-medium'
                    }
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="pt-2 border-t">
                  <LoginButton variant="outline" size="default" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

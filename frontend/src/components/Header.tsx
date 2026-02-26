import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '@/hooks/useQueries';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

function UrbanThekedaarLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-lg bg-orange-500 shadow-sm flex-shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-11"
          aria-hidden="true"
        >
          <path
            d="M20 6C13.5 6 8.5 10.5 8 16.5H32C31.5 10.5 26.5 6 20 6Z"
            fill="white"
            fillOpacity="0.95"
          />
          <rect x="6" y="16" width="28" height="4" rx="2" fill="white" fillOpacity="0.85" />
          <rect x="12" y="24" width="4" height="8" rx="0.5" fill="white" fillOpacity="0.7" />
          <rect x="18" y="22" width="4" height="10" rx="0.5" fill="white" fillOpacity="0.9" />
          <rect x="24" y="25" width="4" height="7" rx="0.5" fill="white" fillOpacity="0.7" />
        </svg>
      </div>
      <div className="flex flex-col leading-none gap-1">
        <span className="text-4xl font-bold tracking-tight text-white font-display drop-shadow-sm">
          Urban
        </span>
        <span className="text-xl font-bold tracking-widest uppercase text-orange-400 font-display drop-shadow-sm">
          Thekedaar
        </span>
      </div>
    </div>
  );
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin } = useIsCallerAdmin();

  const navItems = [
    { label: 'About Us', id: 'about' },
    { label: 'Our Founder', id: 'founder' },
    { label: 'How We Work', id: 'how-we-work' },
    { label: 'Process', id: 'process' },
    { label: 'Why Us', id: 'whyus' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Contact Us', id: 'contact', isOrange: true },
    ...(isAuthenticated && isAdmin ? [{ label: 'Inquiries', id: 'admin', isOrange: false }] : []),
    { label: 'Admin', id: 'admin-panel', isOrange: true },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-lg"
            aria-label="Urban Thekedaar - Go to top"
          >
            <UrbanThekedaarLogo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.id)}
                className={
                  item.isOrange
                    ? 'bg-orange-500 hover:bg-orange-600 text-white hover:text-white font-semibold text-sm px-4 py-2 h-auto'
                    : 'text-white hover:text-white hover:bg-white/15 font-semibold text-sm px-3 py-2 h-auto'
                }
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/15 hover:text-white w-12 h-12">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-3 mt-8">
                <div className="pb-4 border-b">
                  <div className="flex items-center gap-3 select-none">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-orange-500 shadow-sm flex-shrink-0">
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" aria-hidden="true">
                        <path d="M20 6C13.5 6 8.5 10.5 8 16.5H32C31.5 10.5 26.5 6 20 6Z" fill="white" fillOpacity="0.95" />
                        <rect x="6" y="16" width="28" height="4" rx="2" fill="white" fillOpacity="0.85" />
                        <rect x="12" y="24" width="4" height="8" rx="0.5" fill="white" fillOpacity="0.7" />
                        <rect x="18" y="22" width="4" height="10" rx="0.5" fill="white" fillOpacity="0.9" />
                        <rect x="24" y="25" width="4" height="7" rx="0.5" fill="white" fillOpacity="0.7" />
                      </svg>
                    </div>
                    <div className="flex flex-col leading-none gap-0.5">
                      <span className="text-2xl font-bold tracking-tight text-foreground font-display">Urban</span>
                      <span className="text-base font-bold tracking-widest uppercase text-orange-500 font-display">Thekedaar</span>
                    </div>
                  </div>
                </div>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.id)}
                    className={
                      item.isOrange
                        ? 'justify-start text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white hover:text-white'
                        : 'justify-start text-base font-semibold'
                    }
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

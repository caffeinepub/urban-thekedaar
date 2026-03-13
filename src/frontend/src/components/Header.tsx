import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const NAV_LINKS = [
  { label: "About Us", section: "about" },
  { label: "Services", section: "services" },
  { label: "Process", section: "process" },
  { label: "Technology", section: "technology" },
  { label: "Why Us", section: "whyus" },
  { label: "Portfolio", section: "portfolio" },
  { label: "Contact", section: "contact" },
];

export default function Header({ onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (section: string) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={{
        backgroundColor: scrolled
          ? "rgba(10,22,40,0.97)"
          : "rgba(10,22,40,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            data-ocid="nav.logo.button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src="/assets/generated/urban-thekedaar-logo-transparent.dim_400x200.png"
              alt="Urban Thekedaar"
              className="h-12 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </button>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.section}
                data-ocid={`nav.${link.section}.link`}
                onClick={() => handleNav(link.section)}
                className="px-4 py-2 text-sm font-medium text-white/85 hover:text-yellow-400 transition-colors rounded-md hover:bg-white/5 font-body"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.admin.link"
              onClick={() => onNavigate("admin-panel")}
              className="text-xs text-white/40 hover:text-white/70 transition-colors font-body"
            >
              Admin
            </button>
            <button
              type="button"
              data-ocid="nav.estimate.button"
              onClick={() => handleNav("calculator")}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-gold hover:scale-105 font-body"
              style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
            >
              Get Estimate
            </button>
          </div>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/10"
          style={{ backgroundColor: "rgba(10,22,40,0.98)" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.section}
                data-ocid={`nav.mobile.${link.section}.link`}
                onClick={() => handleNav(link.section)}
                className="w-full text-left px-4 py-3 text-white/85 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors font-body text-sm"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                data-ocid="nav.mobile.estimate.button"
                onClick={() => handleNav("calculator")}
                className="flex-1 py-3 text-sm font-semibold rounded-lg font-body"
                style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
              >
                Get Estimate
              </button>
              <button
                type="button"
                data-ocid="nav.mobile.admin.link"
                onClick={() => {
                  onNavigate("admin-panel");
                  setMenuOpen(false);
                }}
                className="px-4 py-3 text-sm text-white/60 border border-white/20 rounded-lg font-body"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

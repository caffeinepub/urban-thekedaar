import { Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer style={{ backgroundColor: "#060E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img
              src="/assets/generated/urban-thekedaar-logo-transparent.dim_400x200.png"
              alt="Urban Thekedaar"
              className="h-12 w-auto object-contain mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-white/50 text-sm leading-relaxed font-body mb-4">
              India's technology-driven construction management platform.
              Building structures that last generations.
            </p>
            <p
              className="font-display text-sm italic"
              style={{ color: "#C9A84C" }}
            >
              No Stress. No Surprises. Just Solid Construction.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", section: "about" },
                { label: "Our Services", section: "services" },
                { label: "How We Work", section: "how-we-work" },
                { label: "Portfolio", section: "portfolio" },
                { label: "Our Founder", section: "founder" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    data-ocid={`footer.${item.section}.link`}
                    onClick={() => onNavigate?.(item.section)}
                    className="text-white/50 hover:text-white transition-colors text-sm font-body"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Construction Management",
                "Residential Construction",
                "Turnkey Projects",
                "Site Monitoring",
                "Budget Control",
                "Material Management",
              ].map((s) => (
                <li key={s}>
                  <span className="text-white/50 text-sm font-body">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A84C" }}
                />
                <a
                  href="tel:+919910801994"
                  data-ocid="footer.phone.link"
                  className="text-white/70 hover:text-white text-sm font-body transition-colors"
                >
                  +91 9910801994
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A84C" }}
                />
                <span className="text-white/60 text-sm font-body">
                  DLF City Phase 2, Gurugram,
                  <br />
                  Haryana — 122002
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A84C" }}
                />
                <a
                  href="mailto:pulkithans5@gmail.com"
                  data-ocid="footer.email.link"
                  className="text-white/60 hover:text-white text-sm font-body transition-colors break-all"
                >
                  pulkithans5@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/35 text-xs font-body">
            © {year} Urban Thekedaar. All rights reserved.
          </p>
          <p className="text-white/25 text-xs font-body">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

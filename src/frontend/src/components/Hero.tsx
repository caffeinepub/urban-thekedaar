import { ArrowRight, Phone } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-construction.dim_1600x900.jpg"
          alt="Urban Thekedaar Construction Site"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 50%, rgba(10,22,40,0.45) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 font-body animate-fade-in"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            India's Smart Construction Platform
          </div>

          <h1
            className="font-display font-bold text-white mb-4 leading-tight animate-fade-up"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <span style={{ color: "#C9A84C" }}>Urban Thekedaar</span>
            <br />
            <span className="text-white">We Build Structures</span>
            <br />
            <span className="text-white">That Last Generations</span>
          </h1>

          <p className="text-white/75 text-lg mb-8 max-w-xl leading-relaxed font-body animate-fade-up">
            Transparent, professional, and technology-driven construction
            management for homes and projects across NCR.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up">
            <button
              type="button"
              data-ocid="hero.start_project.button"
              onClick={() => onNavigate("contact")}
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-gold font-body"
              style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-ocid="hero.book_consultation.button"
              onClick={() => onNavigate("contact")}
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm border-2 border-white/60 text-white hover:bg-white/10 transition-all font-body"
            >
              Book Consultation
            </button>
          </div>

          <div className="flex flex-wrap gap-8 mt-14 animate-fade-up">
            {[
              { num: "50+", label: "Projects Delivered" },
              { num: "100%", label: "On-Time Delivery" },
              { num: "500+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: "#C9A84C" }}
                >
                  {s.num}
                </p>
                <p className="text-white/60 text-sm font-body">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        data-ocid="hero.quick_enquiry.button"
        onClick={() => onNavigate("contact")}
        className="fixed bottom-6 right-24 z-40 items-center gap-2 px-5 py-3 rounded-full shadow-gold font-semibold text-sm transition-all hover:scale-105 font-body hidden md:flex"
        style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
      >
        <Phone className="w-4 h-4" />
        Quick Enquiry
      </button>
    </section>
  );
}

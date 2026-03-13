interface CTAProps {
  onNavigate: (section: string) => void;
}

export default function CTASection({ onNavigate }: CTAProps) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#060E1A" }}
    >
      {/* Decorative gold elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "#C9A84C" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 translate-x-1/3 translate-y-1/3"
        style={{ backgroundColor: "#C9A84C" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Start Your Construction Journey
          <br />
          <span style={{ color: "#C9A84C" }}>with Urban Thekedaar</span>
        </h2>
        <p className="text-white/60 font-body mb-10 max-w-lg mx-auto">
          Join hundreds of satisfied clients who trusted us to build their dream
          structures with precision, transparency, and engineering excellence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            data-ocid="cta.book_consultation.button"
            onClick={() => onNavigate("contact")}
            className="px-8 py-4 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-gold font-body"
            style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
          >
            Book Consultation
          </button>
          <a
            href="tel:+919910801994"
            data-ocid="cta.call_expert.button"
            className="px-8 py-4 rounded-lg font-semibold text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all font-body"
          >
            Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  );
}

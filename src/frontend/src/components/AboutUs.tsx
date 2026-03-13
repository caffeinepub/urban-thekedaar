import { CheckCircle } from "lucide-react";
import { forwardRef } from "react";

const AboutUs = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="py-24"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div
              className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
              style={{
                backgroundColor: "rgba(201,168,76,0.15)",
                color: "#C9A84C",
              }}
            >
              About Urban Thekedaar
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-6 gold-underline">
              Engineering Trust,
              <br />
              Precision & Perfection
            </h2>
            <p className="text-white/70 leading-relaxed mb-6 font-body">
              Urban Thekedaar is redefining the construction experience with a
              modern, transparent, and technology-driven approach. We specialize
              in delivering premium structure finishing with unmatched
              precision, attention to detail, and superior craftsmanship.
            </p>
            <p className="text-white/70 leading-relaxed mb-6 font-body">
              Built by engineers and powered by innovation, our projects combine
              latest construction technologies and advanced equipment to ensure
              strength, durability, and flawless execution. Every structure we
              build reflects quality, efficiency, and smart planning.
            </p>
            <p className="text-white/70 leading-relaxed mb-8 font-body">
              What truly sets us apart is our live project tracking application,
              giving clients real-time updates, progress monitoring, and
              complete visibility at every stage. With 100% transparency, you
              stay informed, involved, and in control — without the stress.
            </p>
            <blockquote
              className="border-l-4 pl-5 italic font-display text-lg"
              style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
            >
              "No Stress. No Surprises. Just Solid Construction."
            </blockquote>
          </div>

          {/* Right: Stats + points */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "50+", label: "Projects Completed" },
                { num: "100%", label: "On-Time Delivery" },
                { num: "10+", label: "Years Experience" },
                { num: "500+", label: "Happy Clients" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-6 rounded-xl text-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <p
                    className="font-display text-4xl font-bold mb-1"
                    style={{ color: "#C9A84C" }}
                  >
                    {s.num}
                  </p>
                  <p className="text-white/60 text-sm font-body">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div
              className="p-6 rounded-xl space-y-3"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                "Engineering-backed structural integrity",
                "Latest construction technologies & equipment",
                "Live project tracking for complete visibility",
                "Strict timelines — on-time, every time",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#C9A84C" }}
                  />
                  <span className="text-white/75 text-sm font-body">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutUs.displayName = "AboutUs";
export default AboutUs;

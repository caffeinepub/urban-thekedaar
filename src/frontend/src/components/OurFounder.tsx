import { CheckCircle } from "lucide-react";

const highlights = [
  "Engineering-backed structural integrity",
  "Adoption of modern construction technologies",
  "Digitally enabled live project tracking",
  "Highly skilled and trained workforce",
  "Strict quality benchmarks at every stage",
  "Commitment to timelines and cost transparency",
];

export default function OurFounder() {
  return (
    <section id="founder" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Bio (3/5) */}
          <div className="lg:col-span-3">
            <div
              className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
              style={{
                backgroundColor: "rgba(10,22,40,0.08)",
                color: "#0A1628",
              }}
            >
              Our Founder
            </div>
            <h2 className="font-display text-4xl font-bold text-navy mb-2 gold-underline">
              Pulkit Hans
            </h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              B.Tech Civil Engineering | Founder, Urban Thekedaar
            </p>

            <p className="text-gray-600 leading-relaxed mb-4 font-body">
              Pulkit Hans, a Civil Engineering graduate (B.Tech), is the
              visionary founder behind Urban Thekedaar. With a strong academic
              foundation in structural engineering and construction management,
              combined with practical industry exposure, he brings a systematic,
              technology-driven approach to modern construction.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 font-body">
              Pulkit established Urban Thekedaar with a clear objective — to
              organize and professionalize the highly unstructured contractor
              market by introducing transparency, accountability, and
              engineering-led execution. His leadership philosophy is centered
              around precision planning, premium structural quality, and
              flawless finishing standards.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-body">
              His strategic vision continues to position Urban Thekedaar as a
              reliable and premium construction partner for clients who seek
              excellence without compromise.
            </p>

            <blockquote
              className="border-l-4 pl-5 italic font-display text-lg"
              style={{ borderColor: "#C9A84C", color: "#0A1628" }}
            >
              "Zero Headaches. Just Pure Construction."
            </blockquote>
          </div>

          {/* Right: Highlights (2/5) */}
          <div className="lg:col-span-2">
            <div
              className="p-8 rounded-2xl"
              style={{ backgroundColor: "#0A1628" }}
            >
              <h4 className="font-display text-lg font-bold text-white mb-6">
                Company Emphasis Under His Leadership
              </h4>
              <div className="space-y-4">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: "#C9A84C" }}
                    />
                    <span className="text-white/75 text-sm font-body">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

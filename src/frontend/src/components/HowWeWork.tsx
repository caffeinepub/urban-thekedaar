import { forwardRef } from "react";

const models = [
  {
    num: "01",
    title: "Fixed Per Sq. Ft Price",
    desc: "A straightforward, transparent pricing model where the total construction cost is calculated based on the built-up area in square feet at a fixed rate. This model gives clients complete cost certainty from day one — no surprises, no fluctuations.",
    highlight:
      "Ideal for clients who want budget certainty and straightforward pricing.",
  },
  {
    num: "02",
    title: "15% Commission Basis",
    desc: "Transparent 15% Project Management Model — clients pay actual project costs (materials, labour, contractors) and Urban Thekedaar charges a fixed 15% management fee. This ensures 100% cost transparency, superior quality control, and professional execution.",
    highlight:
      "Best for clients who want maximum transparency on where every rupee is spent.",
  },
  {
    num: "03",
    title: "Collaborations",
    desc: "Urban Thekedaar works with architects, interior designers, real estate developers, and other construction professionals on collaborative projects. We bring construction expertise, engineering oversight, and project management to joint ventures.",
    highlight:
      "Open to partnerships with professionals and developers across NCR.",
  },
  {
    num: "04",
    title: "Turnkey Projects",
    desc: "Complete end-to-end project delivery — from foundation laying and structural work to final interior finishing and handover. The client hands over the keys (metaphorically) and receives a fully completed, move-in ready structure.",
    highlight:
      "One point of contact, zero stress — from groundbreaking to handover.",
  },
];

const HowWeWork = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="how-we-work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
            style={{ backgroundColor: "rgba(10,22,40,0.08)", color: "#0A1628" }}
          >
            Our Models
          </div>
          <h2 className="font-display text-4xl font-bold text-navy mb-3 gold-underline-center">
            How We Work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-body mt-4">
            We offer flexible engagement models to suit every client's
            requirements and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {models.map((m) => (
            <div
              key={m.num}
              className="p-8 rounded-2xl transition-all hover:shadow-lg"
              style={{
                border: "2px solid rgba(10,22,40,0.08)",
                backgroundColor: "#fafafa",
              }}
            >
              <span
                className="font-display text-5xl font-bold block mb-4"
                style={{ color: "rgba(201,168,76,0.3)" }}
              >
                {m.num}
              </span>
              <h3 className="font-display text-xl font-bold text-navy mb-3">
                {m.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 font-body">
                {m.desc}
              </p>
              <p
                className="text-sm font-semibold font-body px-3 py-1.5 rounded-full inline-block"
                style={{
                  backgroundColor: "rgba(201,168,76,0.1)",
                  color: "#8B6914",
                }}
              >
                {m.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

HowWeWork.displayName = "HowWeWork";
export default HowWeWork;

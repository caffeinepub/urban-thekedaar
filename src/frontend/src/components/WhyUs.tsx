import { Award, Clock, Eye, Smartphone, Users, Wrench } from "lucide-react";
import { forwardRef } from "react";

const reasons = [
  {
    icon: Award,
    title: "Engineered Excellence",
    desc: "Every project is supervised and executed by qualified civil engineers who ensure structural safety, strength, and long-term durability.",
  },
  {
    icon: Smartphone,
    title: "Live Project Tracking",
    desc: "Our dedicated mobile app gives you real-time visibility — material updates, stage-wise progress, and direct communication with your engineer.",
  },
  {
    icon: Wrench,
    title: "Latest Technology & Equipment",
    desc: "Modern machinery, advanced construction techniques, and systematic quality checks ensure precision, speed, and superior outcomes.",
  },
  {
    icon: Users,
    title: "Highly Skilled Workforce",
    desc: "Trained and experienced professionals who specialize in delivering premium structural finishing with attention to the finest detail.",
  },
  {
    icon: Eye,
    title: "100% Transparency",
    desc: "Clear costing, regular updates, and zero hidden surprises. What we commit is exactly what we deliver — every single time.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Structured planning and disciplined execution help us deliver every project on schedule. We respect timelines like we respect quality.",
  },
];

const WhyUs = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="whyus"
      className="py-24"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              color: "#C9A84C",
            }}
          >
            Why Choose Us
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            Why Choose Urban Thekedaar?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-body">
            We don't just construct buildings — we engineer trust, precision,
            and perfection into every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-7 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(201,168,76,0.12)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#C9A84C" }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-body">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Promise statement */}
        <div
          className="text-center py-10 rounded-2xl"
          style={{
            backgroundColor: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <p
            className="font-display text-2xl font-bold"
            style={{ color: "#C9A84C" }}
          >
            Zero Headaches. Just Pure Construction.
          </p>
          <p className="text-white/50 mt-2 font-body text-sm">
            When you choose Urban Thekedaar, you choose peace of mind, premium
            quality, and a completely stress-free experience.
          </p>
        </div>
      </div>
    </section>
  );
});

WhyUs.displayName = "WhyUs";
export default WhyUs;

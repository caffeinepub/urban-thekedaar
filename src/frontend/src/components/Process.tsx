import {
  Activity,
  CheckSquare,
  HardHat,
  MessageSquare,
  Ruler,
} from "lucide-react";
import { forwardRef } from "react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consultation",
    desc: "Understanding your requirements, vision, budget, and timeline through a detailed discovery session.",
  },
  {
    num: "02",
    icon: Ruler,
    title: "Planning & Design",
    desc: "Detailed project planning with structural drawings, material selection, and cost estimation.",
  },
  {
    num: "03",
    icon: HardHat,
    title: "Project Execution",
    desc: "Professional construction by certified engineers with strict quality checks at every stage.",
  },
  {
    num: "04",
    icon: Activity,
    title: "Transparent Monitoring",
    desc: "Live project tracking via our digital platform — view progress from anywhere, anytime.",
  },
  {
    num: "05",
    icon: CheckSquare,
    title: "Project Completion",
    desc: "Rigorous final quality inspections, premium finishing, and formal handover to the client.",
  },
];

const Process = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="process"
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
            How It Works
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            Our Proven Process
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-body">
            Five structured steps that ensure every project is delivered on
            time, within budget, and beyond expectations.
          </p>
        </div>

        {/* Steps — horizontal on desktop */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5"
            style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
          />

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="relative flex flex-col items-center lg:items-center text-center"
              >
                {/* Numbered circle */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center mb-5 flex-shrink-0"
                  style={{
                    backgroundColor: "#C9A84C",
                    boxShadow: "0 0 0 6px rgba(201,168,76,0.15)",
                  }}
                >
                  <span
                    className="text-xs font-bold font-body"
                    style={{ color: "#0A1628" }}
                  >
                    {num}
                  </span>
                  <Icon
                    className="w-5 h-5 mt-0.5"
                    style={{ color: "#0A1628" }}
                  />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed font-body">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Process.displayName = "Process";
export default Process;

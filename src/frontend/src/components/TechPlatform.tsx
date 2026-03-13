import {
  BarChart3,
  Bot,
  Camera,
  FileText,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { forwardRef } from "react";

const features = [
  {
    icon: MapPin,
    title: "Live Project Tracking",
    desc: "Monitor your project's real-time location and stage progress on an interactive map dashboard.",
  },
  {
    icon: Camera,
    title: "Daily Site Updates",
    desc: "Receive daily photo updates and video walkthroughs from your construction site.",
  },
  {
    icon: BarChart3,
    title: "Budget Transparency",
    desc: "View a live breakdown of costs, material expenses, and contractor payments in real time.",
  },
  {
    icon: FileText,
    title: "Document Management",
    desc: "Access all project documents, drawings, permits, and contracts in a secure digital vault.",
  },
  {
    icon: MessageCircle,
    title: "Client Communication",
    desc: "Direct line to your dedicated project manager and site engineer — always available.",
  },
  {
    icon: Bot,
    title: "AI Project Assistant",
    desc: "Intelligent assistant that answers questions, flags delays, and provides smart recommendations.",
  },
];

const TechPlatform = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="technology" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
              style={{
                backgroundColor: "rgba(10,22,40,0.08)",
                color: "#0A1628",
              }}
            >
              Technology Platform
            </div>
            <h2 className="font-display text-4xl font-bold text-navy mb-4 gold-underline">
              Stay Connected
              <br />
              With Your Project 24/7
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 font-body">
              Our dedicated client app puts the entire construction process at
              your fingertips. Know what's happening on your site at all times —
              no calls needed, no status anxiety.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(201,168,76,0.12)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-0.5 font-body">
                      {title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-body">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock dashboard */}
          <div className="relative">
            <div
              className="rounded-2xl p-6 shadow-2xl"
              style={{
                backgroundColor: "#0A1628",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              {/* Mock header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white font-semibold font-body text-sm">
                    Project Dashboard
                  </p>
                  <p className="text-white/40 text-xs font-body">
                    Sector 56, Gurugram — 3BHK Villa
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/50 mb-2 font-body">
                  <span>Overall Progress</span>
                  <span style={{ color: "#C9A84C" }}>68%</span>
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: "#C9A84C", width: "68%" }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Foundation Work", status: "done", pct: "100%" },
                  { label: "Structural Frame", status: "done", pct: "100%" },
                  {
                    label: "Brickwork & Plumbing",
                    status: "active",
                    pct: "72%",
                  },
                  { label: "Electrical Fitting", status: "pending", pct: "0%" },
                  { label: "Interior Finishing", status: "pending", pct: "0%" },
                ].map(({ label, status, pct }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        status === "done"
                          ? ""
                          : status === "active"
                            ? "animate-pulse"
                            : ""
                      }`}
                      style={{
                        backgroundColor:
                          status === "done"
                            ? "#22c55e"
                            : status === "active"
                              ? "#C9A84C"
                              : "rgba(255,255,255,0.2)",
                      }}
                    />
                    <span className="flex-1 text-xs text-white/60 font-body">
                      {label}
                    </span>
                    <span
                      className="text-xs font-semibold font-body"
                      style={{
                        color:
                          status === "done"
                            ? "#22c55e"
                            : status === "active"
                              ? "#C9A84C"
                              : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {pct}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer stats */}
              <div
                className="grid grid-cols-3 gap-3 border-t pt-4"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {[
                  { num: "18", label: "Photos Today" },
                  { num: "₹42L", label: "Spent" },
                  { num: "82d", label: "Remaining" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <p
                      className="font-bold text-sm font-body"
                      style={{ color: "#C9A84C" }}
                    >
                      {num}
                    </p>
                    <p className="text-white/40 text-xs font-body">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TechPlatform.displayName = "TechPlatform";
export default TechPlatform;

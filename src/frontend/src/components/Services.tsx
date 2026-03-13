import {
  ArrowRight,
  Briefcase,
  Building2,
  DollarSign,
  Home,
  MonitorSmartphone,
  Package,
} from "lucide-react";
import { forwardRef } from "react";

const services = [
  {
    icon: Briefcase,
    title: "Construction Project Management",
    desc: "End-to-end professional management of your construction project from inception to handover.",
  },
  {
    icon: Home,
    title: "Residential Construction",
    desc: "Premium quality homes built with precision, modern techniques, and superior finishing.",
  },
  {
    icon: Building2,
    title: "Turnkey Construction Services",
    desc: "Complete construction solutions from foundation to final finishing — all under one roof.",
  },
  {
    icon: MonitorSmartphone,
    title: "Site Monitoring & Reporting",
    desc: "Real-time site supervision with detailed daily progress reports and photo documentation.",
  },
  {
    icon: DollarSign,
    title: "Budget & Cost Control",
    desc: "Transparent pricing with detailed cost breakdowns and absolutely zero hidden charges.",
  },
  {
    icon: Package,
    title: "Material & Vendor Management",
    desc: "Certified materials sourced from trusted vendors for guaranteed quality and durability.",
  },
];

const Services = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
            style={{ backgroundColor: "rgba(10,22,40,0.08)", color: "#0A1628" }}
          >
            What We Offer
          </div>
          <h2 className="font-display text-4xl font-bold text-navy mb-3 gold-underline-center">
            Our Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-body mt-4">
            Comprehensive construction solutions designed for the modern
            homeowner and developer.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              data-ocid={`services.${title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-")
                .replace(/-+/g, "-")
                .substring(0, 20)}.card`}
              className="group p-7 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ backgroundColor: "#0A1628" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#C9A84C" }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-body mb-4">
                {desc}
              </p>
              <span
                className="text-sm font-semibold font-body flex items-center gap-1 transition-all group-hover:gap-2"
                style={{ color: "#C9A84C" }}
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";
export default Services;

import { MapPin, Maximize } from "lucide-react";
import { forwardRef } from "react";

const projects = [
  {
    image: "/assets/generated/project-villa-gurugram.dim_800x600.jpg",
    title: "Luxury 4BHK Villa",
    location: "Sector 56, Gurugram",
    area: "3,200 sq ft",
    status: "Completed",
    statusColor: "#22c55e",
  },
  {
    image: "/assets/generated/project-commercial-delhi.dim_800x600.jpg",
    title: "Commercial Office Block",
    location: "Okhla, Delhi",
    area: "8,500 sq ft",
    status: "Ongoing",
    statusColor: "#C9A84C",
  },
  {
    image: "/assets/generated/project-farmhouse-noida.dim_800x600.jpg",
    title: "Farmhouse Estate",
    location: "Sector 135, Noida",
    area: "5,000 sq ft",
    status: "Ongoing",
    statusColor: "#C9A84C",
  },
  {
    image: "/assets/generated/project-apartment-faridabad.dim_800x600.jpg",
    title: "Residential Apartment",
    location: "Faridabad, Haryana",
    area: "6,000 sq ft",
    status: "Completed",
    statusColor: "#22c55e",
  },
];

const Portfolio = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body"
            style={{ backgroundColor: "rgba(10,22,40,0.08)", color: "#0A1628" }}
          >
            Portfolio
          </div>
          <h2 className="font-display text-4xl font-bold text-navy mb-3 gold-underline-center">
            Our Projects
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-body mt-4">
            A selection of our recently completed and ongoing projects across
            NCR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              data-ocid={`portfolio.project.item.${i + 1}`}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid rgba(10,22,40,0.08)" }}
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)",
                  }}
                />
              </div>
              <div className="p-6" style={{ backgroundColor: "#0A1628" }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full font-body"
                    style={{
                      backgroundColor: `${p.statusColor}20`,
                      color: p.statusColor,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/50 font-body">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5" />
                    {p.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = "Portfolio";
export default Portfolio;

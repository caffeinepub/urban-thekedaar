import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "DLF Phase 4, Gurugram",
    text: "Urban Thekedaar transformed our plot into a dream home. The live tracking app kept us informed at every stage. Delivered exactly on time and within budget. Exceptional quality!",
    initials: "RS",
  },
  {
    name: "Sunita Agarwal",
    location: "Greater Noida",
    text: "We hired Urban Thekedaar for our farmhouse project. Pulkit's team was professional, transparent, and technically excellent. Never had to worry about anything throughout the project.",
    initials: "SA",
  },
  {
    name: "Vikram Malhotra",
    location: "South Delhi",
    text: "Our commercial office project was completed ahead of schedule. The quality of construction and project management was truly world-class. Would absolutely recommend to anyone.",
    initials: "VM",
  },
  {
    name: "Priya Kapoor",
    location: "Faridabad",
    text: "From planning to completion, the entire experience was stress-free. Real-time updates on the app gave us complete peace of mind. The finishing quality exceeded our expectations.",
    initials: "PK",
  },
  {
    name: "Amit Verma",
    location: "Sohna Road, Gurugram",
    text: "The 15% commission model was completely transparent. We knew exactly where every rupee was going. The professionalism and quality of work was outstanding from day one.",
    initials: "AV",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
            Client Stories
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            What Our Clients Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-body">
            Hundreds of families and businesses across NCR trust Urban Thekedaar
            to build their most important asset.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-ocid={`testimonials.item.${i + 1}`}
              className="p-7 rounded-2xl flex flex-col"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {/* Quote mark */}
              <span
                className="font-display text-5xl leading-none mb-3"
                style={{ color: "rgba(201,168,76,0.4)" }}
              >
                &ldquo;
              </span>
              <p className="text-white/70 text-sm leading-relaxed font-body flex-1 mb-5">
                {t.text}
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-body"
                  style={{
                    backgroundColor: "rgba(201,168,76,0.2)",
                    color: "#C9A84C",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-body">
                    {t.name}
                  </p>
                  <p className="text-white/40 text-xs font-body">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

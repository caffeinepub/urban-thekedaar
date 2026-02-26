import { forwardRef } from 'react';
import { CheckCircle2, Quote } from 'lucide-react';

const emphasisPoints = [
  'Engineering-backed structural integrity',
  'Adoption of modern construction technologies and advanced equipment',
  'Digitally enabled live project tracking for complete client visibility',
  'Highly skilled and trained workforce supervision',
  'Strict quality benchmarks at every stage of execution',
  'Commitment to timelines and cost transparency',
];

const OurFounder = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-24 bg-stone-50 dark:bg-stone-900/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display mb-4">
            Our Founder
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Founder Card */}
          <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
            {/* Top Banner */}
            <div className="bg-primary px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-4 border-white/30">
                <span className="text-3xl font-bold text-white font-display">PH</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
                  Pulkit Hans
                </h3>
                <p className="text-white/80 text-sm font-medium tracking-wide mt-1">
                  Founder &amp; Director · B.Tech Civil Engineering
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 space-y-8">
              {/* Bio Paragraphs */}
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                <p>
                  Pulkit Hans, a Civil Engineering graduate (B.Tech), is the visionary founder behind
                  Urban Thekedaar. With a strong academic foundation in structural engineering and
                  construction management, combined with practical industry exposure, he brings a
                  systematic, technology-driven approach to modern construction.
                </p>
                <p>
                  Pulkit established Urban Thekedaar with a clear objective — to organize and
                  professionalize the highly unstructured contractor market by introducing
                  transparency, accountability, and engineering-led execution. His leadership
                  philosophy is centered around precision planning, premium structural quality, and
                  flawless finishing standards.
                </p>
              </div>

              {/* Emphasis Points */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-5 font-display">
                  Under his guidance, the company emphasizes:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emphasisPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-primary/5 rounded-xl px-4 py-3 border border-primary/10"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-medium leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Paragraph */}
              <p className="text-muted-foreground leading-relaxed text-base">
                Pulkit believes construction is not just about building structures — it is about
                building trust, long-term value, and enduring relationships. His strategic vision
                continues to position Urban Thekedaar as a reliable and premium construction partner
                for clients who seek excellence without compromise.
              </p>

              {/* Tagline */}
              <div className="relative bg-primary rounded-xl px-8 py-6 text-center overflow-hidden">
                <Quote className="absolute top-3 left-4 w-8 h-8 text-white/20" />
                <Quote className="absolute bottom-3 right-4 w-8 h-8 text-white/20 rotate-180" />
                <p className="text-xl md:text-2xl font-bold text-white font-display tracking-wide relative z-10">
                  Zero Headaches. Just Pure Construction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OurFounder.displayName = 'OurFounder';

export default OurFounder;

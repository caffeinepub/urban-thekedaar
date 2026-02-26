import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    emoji: '🏗',
    title: 'Engineered Excellence',
    description:
      'Every project is designed, supervised, and executed by qualified engineers who understand structure, safety, and long-term durability — not just surface-level finishing.',
  },
  {
    emoji: '📱',
    title: 'Live Project Tracking',
    description:
      'Transparency is our foundation. With our dedicated mobile application, you can monitor your project in real time — from material updates to stage-wise progress — anytime, anywhere.',
  },
  {
    emoji: '🛠',
    title: 'Latest Technology & Equipment',
    description:
      'We use modern machinery, advanced construction techniques, and systematic quality checks to ensure precision, speed, and superior outcomes.',
  },
  {
    emoji: '👷',
    title: 'Highly Skilled Workforce',
    description:
      'Our team consists of trained and experienced professionals who specialize in delivering premium structural finishing with attention to the smallest detail.',
  },
  {
    emoji: '🔍',
    title: '100% Transparency',
    description:
      'Clear costing, regular updates, no hidden surprises. What we commit is what we deliver.',
  },
  {
    emoji: '⏳',
    title: 'On-Time Delivery',
    description:
      'We respect timelines like we respect quality. Structured planning and disciplined execution help us deliver projects on schedule — every time.',
  },
];

const WhyUs = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose Urban Thekedaar?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            At Urban Thekedaar, we don't just construct buildings — we engineer trust, precision,
            and perfection into every project. Built by experienced engineers and powered by
            advanced construction technology, we deliver premium structures with flawless finishing
            and zero compromise on quality.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex justify-center mb-14">
          <div className="h-1 w-20 rounded-full bg-primary opacity-70" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-7 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-4xl leading-none select-none group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {feature.emoji}
                  </span>
                  <h3 className="text-xl font-bold text-foreground leading-snug">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Promise Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-primary px-8 py-12 text-center shadow-2xl">
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
                backgroundSize: '12px 12px',
              }}
            />
            <div className="relative z-10">
              <p className="text-primary-foreground/80 uppercase tracking-widest text-sm font-semibold mb-3">
                Our Promise
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5 leading-tight">
                Zero Headaches. Just Pure Construction.
              </h3>
              <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                When you choose Urban Thekedaar, you choose peace of mind, premium quality, and a
                construction experience that feels organized, modern, and completely stress-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyUs.displayName = 'WhyUs';

export default WhyUs;

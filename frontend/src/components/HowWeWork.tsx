import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Percent, Handshake, Building2 } from 'lucide-react';

const models = [
  {
    icon: <Ruler className="w-10 h-10 text-primary" />,
    title: 'Fixed Per Sq. Ft Price',
    badge: 'Most Popular',
    description:
      'A straightforward, transparent pricing model where you pay a fixed rate per square foot of construction. No hidden charges, no surprises — just a clear number agreed upfront. Ideal for clients who want full cost certainty before breaking ground.',
    highlights: ['Predictable budget', 'No cost overruns', 'Clear scope of work'],
  },
  {
    icon: <Percent className="w-10 h-10 text-primary" />,
    title: '15% Commission Basis',
    badge: 'Flexible',
    description:
      'We manage your entire construction project and charge a 15% commission on the total material and labour cost. You get complete visibility into every rupee spent, and we earn only when your project succeeds. Best for clients who want professional oversight without a fixed quote.',
    highlights: ['Full cost transparency', 'Professional management', 'Aligned incentives'],
  },
  {
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: 'Collaborations',
    badge: 'Partnership',
    description:
      'We partner with architects, interior designers, real estate developers, and other construction firms to deliver joint projects. Our collaboration model is built on mutual trust, shared expertise, and a commitment to quality outcomes for the end client.',
    highlights: ['Joint project delivery', 'Shared expertise', 'Long-term partnerships'],
  },
  {
    icon: <Building2 className="w-10 h-10 text-primary" />,
    title: 'Turnkey Projects',
    badge: 'End-to-End',
    description:
      'We take complete ownership — from site assessment and planning to construction and final handover. You hand us the keys and we deliver a ready-to-occupy structure. One point of contact, zero coordination headaches, and a fully finished building on time.',
    highlights: ['Single point of contact', 'Complete ownership', 'Ready-to-occupy delivery'],
  },
];

const HowWeWork = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-5">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Engagement Models
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-foreground">
            How We Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every project is different. We offer four flexible engagement models so you can
            choose the approach that best fits your budget, timeline, and level of involvement.
          </p>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {models.map((model, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-8">
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    {model.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full">
                    {model.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {model.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {model.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {model.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-14 max-w-3xl mx-auto text-center px-8 py-8 rounded-2xl bg-primary/10 border border-primary/25">
          <p className="text-xl md:text-2xl font-bold text-primary mb-2">
            Not sure which model suits you?
          </p>
          <p className="text-muted-foreground">
            Reach out via the contact form or chatbot — we'll help you pick the right approach for your project.
          </p>
        </div>
      </div>
    </section>
  );
});

HowWeWork.displayName = 'HowWeWork';

export default HowWeWork;

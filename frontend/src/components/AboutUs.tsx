import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MonitorSmartphone, ShieldCheck, Clock, HardHat } from 'lucide-react';

const AboutUs = forwardRef<HTMLElement>((props, ref) => {
  const principles = [
    {
      icon: '/assets/generated/icon-transparency.dim_80x80.png',
      lucideIcon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
      title: 'Live Project Tracking',
      description:
        'Our exclusive app gives clients real-time updates, progress monitoring, and complete visibility at every stage — 100% transparency, zero stress.',
    },
    {
      icon: '/assets/generated/icon-pricing.dim_80x80.png',
      lucideIcon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Fair Pricing',
      description:
        'Honest, competitive construction pricing with no hidden costs or surprise charges — what we quote is what you pay.',
    },
    {
      icon: '/assets/generated/icon-delivery.dim_80x80.png',
      lucideIcon: <Clock className="w-8 h-8 text-primary" />,
      title: 'On-Time Delivery',
      description:
        'Rigorous site management and systematic execution ensuring your construction project completes on schedule, every time.',
    },
    {
      icon: '/assets/generated/icon-quality.dim_80x80.png',
      lucideIcon: <HardHat className="w-8 h-8 text-primary" />,
      title: 'Build Quality',
      description:
        'Highly trained labour supervised by experienced engineers with rigorous quality checks — from foundation to finishing.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            About Urban Thekedaar
          </h2>

          {/* Main description */}
          <div className="space-y-5 text-left md:text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Urban Thekedaar is redefining the construction experience with a{' '}
              <span className="text-foreground font-semibold">
                modern, transparent, and technology-driven approach
              </span>
              . We specialize in delivering premium structure finishing with
              unmatched precision, attention to detail, and superior
              craftsmanship.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Built by engineers and powered by innovation, our projects combine
              the latest construction technologies and advanced equipment to
              ensure strength, durability, and flawless execution. Every
              structure we build reflects quality, efficiency, and smart
              planning.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              What truly sets us apart is our{' '}
              <span className="text-primary font-semibold">
                live project tracking application
              </span>
              , giving clients real-time updates, progress monitoring, and
              complete visibility at every stage. With 100% transparency, you
              stay informed, involved, and in control — without the stress.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our team consists of highly trained and skilled labour, supervised
              by experienced engineers who ensure rigorous quality checks and
              systematic execution. From foundation to finishing, we maintain
              strict timelines and deliver on our promise of on-time completion.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Urban Thekedaar, we don't just construct buildings —{' '}
              <span className="text-foreground font-semibold">
                we build trust, reliability, and long-term relationships.
              </span>
            </p>
          </div>

          {/* Tagline */}
          <div className="mt-10 inline-block px-8 py-4 rounded-2xl bg-primary/10 border border-primary/25">
            <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">
              No Stress. No Surprises. Just Solid Construction.
            </p>
          </div>
        </div>

        {/* Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <img
                    src={principle.icon}
                    alt={principle.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

AboutUs.displayName = 'AboutUs';

export default AboutUs;

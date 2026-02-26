import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet="/assets/generated/hero-construction.dim_1920x1080.png"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/assets/generated/hero-construction.dim_1920x800.png"
          />
          <img
            src="/assets/generated/hero-construction.dim_1400x800.png"
            alt="Engineers on construction site with modern machinery and raw building under development"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Construction Specialists
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            We Build Structures,{' '}
            <span className="text-primary">Not Designs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            Urban Thekedaar is a pure construction company — we execute your
            building projects with skilled labour, quality materials, and
            on-time delivery. No design, just solid construction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => onNavigate('calculator')}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Get Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="text-lg px-8 py-6 border-2"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

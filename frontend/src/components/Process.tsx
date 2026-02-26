import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ClipboardList,
  FileCheck,
  HardHat,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const Process = forwardRef<HTMLElement>((props, ref) => {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Site Assessment',
      description:
        'We visit your site, assess ground conditions, access routes, and project scope. Our team evaluates all construction requirements to give you an accurate picture before work begins.',
    },
    {
      icon: FileCheck,
      title: 'Planning & Permits',
      description:
        'We assist with construction planning, material scheduling, and obtaining necessary building permits. All paperwork and regulatory compliance is handled so construction can start without delays.',
    },
    {
      icon: HardHat,
      title: 'Construction Execution',
      description:
        'Our skilled labourers and site engineers execute the build with precision. We follow strict quality standards, maintain safety protocols, and keep you updated at every construction milestone.',
    },
    {
      icon: CheckCircle2,
      title: 'Quality Handover',
      description:
        'Final structural inspection, quality assurance checks, and smooth handover of the completed construction. We ensure every element meets the agreed specifications before handing over the keys.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our Construction Process
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            A systematic approach to construction excellence, ensuring quality
            at every stage of the build.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-bold text-primary mr-2">
                            STEP {index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Process.displayName = 'Process';

export default Process;

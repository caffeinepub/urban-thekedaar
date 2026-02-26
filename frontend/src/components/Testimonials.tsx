import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  name: string;
  location: string;
  projectType: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Sharma',
    location: 'Sector 56, Gurugram',
    projectType: 'Residential Villa',
    rating: 5,
    review:
      'Urban Thekedaar completed our 3-floor villa in just 14 months — ahead of schedule! The quality of brickwork and finishing was exceptional. Their live tracking app kept us informed at every stage. Highly recommend them for anyone serious about construction.',
  },
  {
    name: 'Priya Mehta',
    location: 'Dwarka, New Delhi',
    projectType: 'Home Renovation',
    rating: 5,
    review:
      'We hired them for a complete structural renovation of our old house. The team was professional, punctual, and transparent about costs. No hidden charges, no surprises. The engineer visited the site every week. Truly a stress-free experience.',
  },
  {
    name: 'Anil Kapoor',
    location: 'Noida Extension',
    projectType: 'Commercial Office Build',
    rating: 5,
    review:
      'Our 4-storey commercial building was delivered on time and within budget. The project manager was always reachable and the labour quality was top-notch. Urban Thekedaar is the only contractor I will use for my future projects.',
  },
  {
    name: 'Sunita Agarwal',
    location: 'Faridabad',
    projectType: 'Independent House',
    rating: 4,
    review:
      'Very satisfied with the construction quality. The team handled all permits and paperwork smoothly. Minor delays due to monsoon but they communicated proactively. The final handover was thorough with a proper quality checklist. Would definitely recommend.',
  },
  {
    name: 'Vikram Singh',
    location: 'Sohna Road, Gurugram',
    projectType: 'Duplex Construction',
    rating: 5,
    review:
      'I was skeptical at first but Urban Thekedaar proved me wrong. Fair pricing, skilled workers, and the site was always clean and organized. The RCC work quality is outstanding. My duplex looks exactly as planned and the structure feels solid.',
  },
  {
    name: 'Deepa Nair',
    location: 'Manesar, Haryana',
    projectType: 'Factory Shed',
    rating: 5,
    review:
      'We needed a large industrial shed built quickly for our manufacturing unit. Urban Thekedaar delivered in record time without compromising on safety standards. Their team understood our requirements perfectly. Excellent value for money.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Client Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from homeowners and businesses who trusted Urban Thekedaar
            to bring their construction projects to life.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Review Text */}
                <p className="text-foreground/80 leading-relaxed text-sm flex-1">
                  "{testimonial.review}"
                </p>

                {/* Divider */}
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap">
                      {testimonial.projectType}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div>
            <p className="text-4xl font-bold text-primary font-display">200+</p>
            <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary font-display">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Client Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary font-display">4.9★</p>
            <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

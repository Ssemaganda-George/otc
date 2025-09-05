import { Heart, Leaf, DollarSign, Laptop } from "lucide-react";

const focusAreas = [
  {
    title: "HealthTech & Sexual Reproductive Health and Rights",
    description: "Advancing digital health solutions while safeguarding reproductive rights and dignity",
    icon: Heart,
    color: "text-red-600"
  },
  {
    title: "Agriculture, Tech & Innovation",
    description: "Transforming agricultural practices through innovative technology solutions",
    icon: Leaf,
    color: "text-green-600"
  },
  {
    title: "FinTech & Governance",
    description: "Promoting inclusive financial technologies and transparent governance systems",
    icon: DollarSign,
    color: "text-yellow-600"
  },
  {
    title: "Tech, Innovation, Digitalization & Development",
    description: "Driving comprehensive digital transformation for sustainable development",
    icon: Laptop,
    color: "text-blue-600"
  }
];

export function FocusAreas() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Focus Areas
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We work across four critical sectors to ensure Africa's digital transformation 
              promotes inclusive growth and protects fundamental rights.
            </p>
          </div>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <div 
                key={area.title}
                className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/60 flex items-center justify-center flex-shrink-0`}>
                    <area.icon className={`w-6 h-6 ${area.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

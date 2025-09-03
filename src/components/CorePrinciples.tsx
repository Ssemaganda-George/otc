import { Lightbulb, Link, Users, Heart } from "lucide-react";

const principles = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering cutting-edge solutions that transform Africa's digital landscape and drive technological advancement across the continent."
  },
  {
    icon: Link,
    title: "Interoperability",
    description: "Building connected systems that seamlessly integrate across platforms, ensuring technology works together for maximum impact."
  },
  {
    icon: Users,
    title: "Equity",
    description: "Ensuring fair access to technology and legal services for all Africans, regardless of background or geographic location."
  },
  {
    icon: Heart,
    title: "Human Rights",
    description: "Upholding fundamental human rights in all our tech solutions, protecting privacy, dignity, and freedom in the digital age."
  }
];

export function CorePrinciples() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Core Principles
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              These fundamental principles guide every decision we make and every solution we create, 
              ensuring our work drives meaningful change across Africa.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {principles.map((principle, index) => (
              <div 
                key={principle.title}
                className={`text-center group animate-fade-in-up opacity-0 [animation-delay:${index * 0.2}s] [animation-fill-mode:forwards]`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-blue transition-all duration-300 group-hover:scale-110 border border-primary/20">
                  <principle.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-4">
                  {principle.title}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="heading-card text-gradient-blue mb-4">
                Experience Our Principles in Action
              </h3>
              <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
                See how these core principles shape our approach to technology law and drive 
                innovation across Africa's digital ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

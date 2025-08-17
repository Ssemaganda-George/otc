import { Target, Users, Heart, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const coreValues = [
  {
    icon: Target,
    title: "Excellence",
    description: "Delivering world-class legal and tech solutions."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering new approaches to digital challenges."
  },
  {
    icon: Heart,
    title: "Human Rights",
    description: "Protecting privacy, dignity, and promoting social justice."
  },
  {
    icon: Users,
    title: "Ubuntu",
    description: "Ensuring all Africans benefit from digital transformation."
  }
];

export function HomeAbout() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              About OneTechConnect
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              OneTechConnect (OTC) is Africa's premier technology law organization, advancing tech, 
              social and legal services to empower African innovation. We provide real-time legal 
              and advisory solutions focusing on innovation, interoperability, equity, and human rights.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <h3 className="heading-card text-gradient-blue mb-4">Our Mission</h3>
              <p className="text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
                To advance Africa's technological progress by providing innovative legal solutions, 
                strategic advocacy, and comprehensive support that enables tech entrepreneurs to navigate 
                the complex intersection of law and technology.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <h3 className="heading-card text-gradient-blue mb-4">Our Vision</h3>
              <p className="text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
                To be the leading catalyst for Africa's digital transformation, creating a continent 
                where technology and law work in harmony to drive innovation, economic growth, 
                and social progress for all Africans.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h3 className="heading-card text-gradient-blue text-center mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <div key={value.title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-playfair font-semibold text-gradient-blue mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="heading-card text-gradient-blue mb-4">
                Ready to Transform Africa's Digital Future?
              </h3>
              <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join us in our mission to create a more equitable and innovative digital ecosystem 
                across Africa. Discover our comprehensive approach to technology law.
              </p>
              <Link to="/about">
                <Button variant="golden" size="lg" className="group">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

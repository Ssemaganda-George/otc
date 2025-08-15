import { ArrowRight, Users, Scale, Briefcase, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Scale,
    title: "Legal & Tech Expertise",
    description: "Comprehensive legal solutions for Africa's digital transformation.",
    link: "/services",
    linkText: "View Services"
  },
  {
    icon: Brain,
    title: "Innovation Programs", 
    description: "AINow, EmpowerThem, BigTechAfrica, and One Tech Approach initiatives.",
    link: "/programs",
    linkText: "Explore Programs"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Leading African tech lawyers and policy experts driving change.",
    link: "/team", 
    linkText: "Meet Our Team"
  },
  {
    icon: Briefcase,
    title: "OTC Framework",
    description: "Our comprehensive methodology for tech-legal integration.",
    link: "/about",
    linkText: "Learn Framework"
  }
];

export function HomeHighlights() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Empowering Africa's Digital Future
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              OneTechConnect (OTC) advances technology, social and legal services across Africa, 
              focusing on innovation, interoperability, equity, and human rights in the digital age.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <div 
                key={highlight.title}
                className="group bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-500 card-hover"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                      {highlight.description}
                    </p>
                    <Link to={highlight.link}>
                      <Button variant="ghost-golden" className="group/btn">
                        {highlight.linkText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Values Preview */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
            <div className="text-center">
              <h3 className="heading-card text-gradient-blue mb-6">
                Our Core Principles
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {["Innovation", "Interoperability", "Equity", "Human Rights"].map((principle) => (
                  <div key={principle} className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">{principle}</h4>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="golden" size="lg" className="group">
                  Learn More About OTC
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

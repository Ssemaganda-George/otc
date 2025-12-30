import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Brain, Heart, Users, Shield, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programmes = [
  {
    id: 1,
    title: "Tech & SRHR Governance (TSG)",
    icon: Heart,
    description: "The Tech & SRHR Governance (TSG) programme examines the complex governance challenges at the intersection of technology, digitalization, and sexual and reproductive health and rights (SRHR) in Africa.",
    link: "/programmes/tsg"
  },
  {
    id: 2,
    title: "BigTech Africa (BiTA)",
    icon: Shield,
    description: "BiTA examines the role and impact of big tech, small and medium tech companies, and governments operating across health, agriculture, finance, and development sectors.",
    link: "/programmes/bita"
  },
  {
    id: 3,
    title: "AfricanIntelligenceNow (AiNow)",
    icon: Brain,
    description: "AiNow explores the rapid evolution of Artificial Intelligence in Africa, focusing on its application in the critical areas of health, agriculture, finance and development.",
    link: "/programmes/ainow"
  },
  {
    id: 4,
    title: "EmpowerThem (EMT)",
    icon: Users,
    description: "EmpowerThem focuses on the intersection of technology and vulnerable groups including children, youth women and marginalized communities in the areas of health, finance, agriculture, and development.",
    link: "/programmes/emt"
  }
];

export default function ProgrammesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                Our Programmes
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Strategic initiatives that address critical challenges at the intersection of technology and human rights across Africa, 
                ensuring that digital transformation serves justice, equity, and dignity for all.
              </p>
            </div>
          </div>
        </section>

        {/* Programmes Overview */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programmes.map((programme) => (
                  <div key={programme.id} className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300">
                    <div className="flex items-start space-x-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <programme.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-3">
                          {programme.title}
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-body text-muted-foreground leading-relaxed mb-6">
                      {programme.description}
                    </p>

                    <Link to={programme.link}>
                      <Button variant="ghost-golden" size="sm" className="w-full group">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Cross-Cutting Impact Areas
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our programmes work synergistically across key sectors to maximize impact and ensure comprehensive coverage
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Heart, name: "Health", description: "Digital health rights and SRHR" },
                  { icon: Users, name: "Agriculture", description: "Tech-enabled food security" },
                  { icon: Shield, name: "Finance", description: "Ethical fintech solutions" },
                  { icon: Target, name: "Development", description: "Rights-based innovation" }
                ].map((area, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Get Involved in Our Programmes
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Whether you're a researcher, advocate, practitioner, or community member, there are many ways to 
                contribute to and benefit from our programme initiatives.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg" className="group">
                  Partner With Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="hero" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
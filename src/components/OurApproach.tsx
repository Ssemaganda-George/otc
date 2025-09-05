import { Target, Users, Briefcase, Lightbulb } from "lucide-react";

export function OurApproach() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Approach
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We employ a comprehensive, integrated approach that combines legal expertise, 
              technological innovation, and human rights advocacy to drive meaningful change.
            </p>
          </div>

          {/* Approach Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-primary">
                  Integrated Solutions
                </h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                We don't just address symptoms—we tackle root causes by integrating legal frameworks, 
                policy development, and technological innovation to create lasting solutions that serve 
                Africa's diverse communities.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-primary">
                  Human-Centered Design
                </h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                Every solution we develop places human rights and social justice at its core. 
                We ensure that technological advancement serves people, protects their dignity, 
                and promotes inclusive development across Africa.
              </p>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-gradient-to-r from-secondary/60 to-secondary/40 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-playfair font-semibold text-center text-primary mb-8">
              Our Methodology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  number: "01",
                  title: "Research & Analysis",
                  description: "Deep dive into challenges and opportunities"
                },
                {
                  number: "02", 
                  title: "Stakeholder Engagement",
                  description: "Collaborate with communities and partners"
                },
                {
                  number: "03",
                  title: "Solution Development",
                  description: "Create integrated legal and tech solutions"
                },
                {
                  number: "04",
                  title: "Implementation & Impact",
                  description: "Deploy solutions and measure real-world impact"
                }
              ].map((step, index) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-lg">{step.number}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Principles */}
          <div className="text-center">
            <h3 className="text-2xl font-playfair font-semibold text-primary mb-8">
              Guiding Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Briefcase,
                  title: "Evidence-Based",
                  description: "All our work is grounded in rigorous research and data-driven insights"
                },
                {
                  icon: Users,
                  title: "Collaborative",
                  description: "We work closely with communities, governments, and partners across Africa"
                },
                {
                  icon: Lightbulb,
                  title: "Innovative", 
                  description: "We embrace cutting-edge approaches while respecting African contexts and values"
                }
              ].map((principle, index) => (
                <div key={principle.title} className="text-center">
                  <div className="w-16 h-16 bg-golden/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <principle.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-3">{principle.title}</h4>
                  <p className="text-body text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

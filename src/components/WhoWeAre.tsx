import { Target, Eye, Heart, Users, Briefcase, Lightbulb, Globe } from "lucide-react";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 bg-secondary/40" aria-labelledby="who-we-are-title">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 id="who-we-are-title" className="heading-section text-gradient-blue mb-6">
              Who We Are
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              OneTechConnect (OTC) is a Youth-led African Organization that ensures digital transformation 
              in health, sexual reproductive health, finance, agriculture and Development is advanced while 
              ensuring respect to fundamental human rights and social justice for every individual and 
              communities in Africa.
            </p>
          </div>

          {/* Mission, Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Mission</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                To drive inclusive digital transformation in health, sexual and reproductive health, finance, agriculture, and development across Africa while safeguarding fundamental human rights and advancing social justice through research, training, advocacy, and innovation.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Vision</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                An Africa where innovation and digital transformation advance human rights and leave no one behind.
              </p>
            </div>
          </div>

          {/* About Description */}
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="heading-card text-gradient-blue mb-8">Our Story</h3>
            <div className="space-y-6 text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
              <p>
                OneTechConnect (OTC) is a youth-led African centre advancing digital justice on the continent. We believe technology should empower communities, protect rights and promote equity, not deepen inequality.

              </p>
              <p>
                OTC was founded to respond to Africa’s fast-spreading digital injustices, where systems were often implemented without contextualization, community participation, ethical safeguards, or transparency. We exist to ensure that justice leads technology, reflecting African values and agency.
              </p>
              <p>
                We work across Digital Health & SRHR, AgriTech, FinTech and Development, because these sectors are interconnected pillars of Africa’s growth. Through research, advocacy, capacity-building and innovation, we tackle systemic challenges and shape fair, accountable digital policies and practices.
              </p>
              <p>
                Our vision is an Africa where technology strengthens dignity, amplifies voices, and drives inclusive development. Every project, partnership, and innovation we create is guided by Ubuntu, Afrocentrism, transparency, decoloniality, intersectionality and ensure that digital progress truly serves the people.
              </p>
            </div>
          </div>

          {/* Strategic Pillars */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="heading-card text-gradient-blue mb-4">Our Strategic Pillars</h3>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                We deliver our work through four strategic pillars that drive inclusive digital transformation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Briefcase,
                  title: "Research & Development (R&D)",
                  description: "Generating evidence to inform policy, practice, and innovation"
                },
                {
                  icon: Users,
                  title: "Training & Skillset Development (TSD)",
                  description: "Equipping young people and communities with digital, technical, and rights-based skills"
                },
                {
                  icon: Heart,
                  title: "Strategic Advocacy & Partnerships (SAP)",
                  description: "Building alliances to influence policy and amplify voices for justice"
                },
                {
                  icon: Lightbulb,
                  title: "Tech, Innovation & Digital Transformation (TID)",
                  description: "Creating solutions that harness technology for inclusive development"
                }
              ].map((pillar, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-playfair font-semibold text-gradient-blue mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

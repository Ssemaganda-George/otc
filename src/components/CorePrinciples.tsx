import { Search, GraduationCap, Megaphone, Lightbulb } from "lucide-react";

const principles = [
  {
    icon: Search,
    title: "Research & Development (R&D)",
    description: "Generating evidence to inform policy, practice, and innovation through comprehensive research and analysis."
  },
  {
    icon: GraduationCap,
    title: "Training & Skillset Development (TSD)",
    description: "Equipping young people and communities with digital, technical, and rights-based skills for the future."
  },
  {
    icon: Megaphone,
    title: "Strategic Advocacy & Partnerships (SAP)",
    description: "Building alliances to influence policy and amplify voices for justice and accountability across Africa."
  },
  {
    icon: Lightbulb,
    title: "Tech, Innovation & Digital Transformation (TID)",
    description: "Creating and supporting solutions that harness technology for inclusive and sustainable development."
  }
];

export function CorePrinciples() {
  return (
    <section className="py-24 section-dark-brown">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-white mb-6">
              Our Strategic Pillars
            </h2>
            <p className="text-body text-gray-300 max-w-3xl mx-auto text-justify sm:text-center">
              We deliver our work through four strategic pillars that drive inclusive digital transformation 
              while ensuring respect for fundamental human rights and social justice.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {principles.map((principle, index) => (
              <div 
                key={principle.title}
                className={`text-center group animate-fade-in-up opacity-0 [animation-delay:${index * 0.2}s] [animation-fill-mode:forwards]`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-golden/30 to-golden/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-golden transition-all duration-300 group-hover:scale-110 border border-golden/30">
                  <principle.icon className="w-10 h-10 text-golden" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-4">
                  {principle.title}
                </h3>
                <p className="text-body text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-dark-card/50 rounded-2xl p-8 border border-golden/30">
              <h3 className="heading-card text-white mb-4">
                Experience Our Principles in Action
              </h3>
              <p className="text-body text-gray-300 mb-6 max-w-2xl mx-auto">
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

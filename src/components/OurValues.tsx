import { Users, Lightbulb, ShieldCheck, Handshake, Target, Leaf, Shield, GraduationCap, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "African Agency & Ownership",
    description: "African people should have the agency, capacity and opportunity to shape, create and own solutions."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace creativity, experimentation and better ways of solving real problems."
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We work with honesty, accountability, transparency and professionalism."
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "We connect people, institutions, expertise, ideas and resources."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue high standards in our products, relationships and delivery."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We design for lasting economic, social and environmental value."
  },
  {
    icon: Shield,
    title: "Protection & Fairness",
    description: "We protect rights, intellectual property, interests and value while promoting fair relationships."
  },
  {
    icon: GraduationCap,
    title: "People & Talent",
    description: "We invest in human potential, knowledge, creativity and leadership."
  },
  {
    icon: TrendingUp,
    title: "Impact",
    description: "We focus on meaningful change that can be demonstrated and sustained."
  }
];

export function OurValues() {
  return (
    <section id="values" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Values
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our approach
              to building African-owned solutions.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className={`text-center group animate-fade-in-up opacity-0`} style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-golden/20 to-golden/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-golden transition-all duration-300 group-hover:scale-110">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-playfair font-semibold text-gradient-blue mb-4">
                  {value.title}
                </h4>
                <p className="text-body text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

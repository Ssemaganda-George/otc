import { Target, Eye, Heart, Users, Briefcase, Lightbulb, Globe } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Driving creative, future-oriented solutions that harness technology to improve lives and transform societies."
  },
  {
    icon: Globe,
    title: "Afrocentrism",
    description: "Advancing an African-led tech agenda, rooted in local knowledge, institutions, and leadership to shape Africa's digital present and future."
  },
  {
    icon: Heart,
    title: "Human Rights & Social Justice",
    description: "Ensuring that digital transformation upholds rights, dignity, and equity, and reduces inequalities for all Africans."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committing to the highest standards of professionalism, integrity, and impact in all our work."
  },
  {
    icon: Users,
    title: "Connectivity",
    description: "Building technologies and systems that seamlessly connect people, communities, and innovations across Africa."
  }
];

export function OurValues() {
  return (
    <section id="values" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Core Values
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our approach 
              to advancing Africa's digital transformation.
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

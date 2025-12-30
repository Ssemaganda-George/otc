import { Target, Eye, Heart, Users, Briefcase, Lightbulb, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

export function HomeAbout() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              About OneTechConnect
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We are Africa's premier technology law firm, bridging the gap between innovation and regulation 
              to create an enabling environment for digital transformation across the continent.
            </p>
          </div>

          {/* Mission, Vision, Values Grid - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Vision */}
            <div className="card-dark p-8 shadow-card hover:shadow-golden transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-golden" />
                </div>
                <h3 className="heading-card text-white">Our Vision</h3>
              </div>
              <p className="text-body text-gray-300 leading-relaxed text-justify sm:text-left">
                An Africa where innovation and digital transformation advance human rights and Social Justice for everyone.
              </p>
            </div>
            {/* Mission */}
            <div className="card-dark p-8 shadow-card hover:shadow-golden transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-golden" />
                </div>
                <h3 className="heading-card text-white">Our Mission</h3>
              </div>
              <p className="text-body text-gray-300 leading-relaxed text-justify sm:text-left">
                To drive inclusive digital transformation in health, sexual and reproductive health, finance, agriculture, and development across Africa while safeguarding fundamental human rights and advancing social justice through research, training, advocacy, and innovation.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-12">
            <h3 className="heading-card text-white mb-8">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`text-center group animate-fade-in-up opacity-0 [animation-delay:${index * 0.2}s] [animation-fill-mode:forwards]`}
              >
                <div className="w-16 h-16 bg-golden/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-golden transition-all duration-300 group-hover:scale-110">
                  <value.icon className="w-8 h-8 text-golden" />
                </div>
                <h4 className="text-xl font-playfair font-semibold text-white mb-4">
                  {value.title}
                </h4>
                <p className="text-body text-gray-300">
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

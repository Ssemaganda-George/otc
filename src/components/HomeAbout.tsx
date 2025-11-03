import { Target, Users, Heart, Lightbulb, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const coreValues = [
  {
    icon: Users,
    title: "Connectivity",
    description: "Building technologies and systems that seamlessly connect people, communities, and innovations across Africa."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Driving creative, future-oriented solutions that harness technology to improve lives and transform societies."
  },
  {
    icon: Globe,
    title: "Afrocentrism",
    description: "Advancing an African-led tech agenda, rooted in local knowledge, institutions, and leadership."
  },
  {
    icon: Heart,
    title: "Human Rights & Social Justice",
    description: "Ensuring that digital transformation upholds rights, dignity, and equity for all Africans."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committing to the highest standards of professionalism, integrity, and impact in all our work."
  }
];

export function HomeAbout() {
  return (
    <section className="py-24 section-dark-grey">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-white mb-6">
              About OneTechConnect
            </h2>
            <p className="text-body text-gray-300 max-w-3xl mx-auto text-justify sm:text-center">
              OneTechConnect (OTC) is a Youth-led African Organization that advances digital transformation 
              in health, sexual reproductive health, finance, agriculture and Development is advanced while 
              ensuring respect to fundamental human rights and social justice for every individual and 
              communities in Africa.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="card-dark border border-golden/30 rounded-2xl p-8 shadow-card hover:shadow-golden transition-all duration-300 card-hover">
              <h3 className="heading-card text-white mb-4">Our Mission</h3>
              <p className="text-body text-gray-300 leading-relaxed text-justify sm:text-left">
                To drive inclusive digital transformation in health, sexual and reproductive health, finance, agriculture, and development across Africa while safeguarding fundamental human rights and advancing social justice through research, training, advocacy, and innovation.
              </p>
            </div>

            {/* Vision */}
            <div className="card-dark border border-golden/30 rounded-2xl p-8 shadow-card hover:shadow-golden transition-all duration-300 card-hover">
              <h3 className="heading-card text-white mb-4">Our Vision</h3>
              <p className="text-body text-gray-300 leading-relaxed text-justify sm:text-left">
                An Africa where innovation and digital transformation advance human rights and leave no one behind.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h3 className="heading-card text-white text-center mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <div key={value.title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-golden/30 to-golden/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-golden/30">
                    <value.icon className="w-8 h-8 text-golden" />
                  </div>
                  <h4 className="font-playfair font-semibold text-white mb-2 text-xl">
                    {value.title}
                  </h4>
                  <p className="text-base text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-dark-card/50 rounded-2xl p-8 border border-golden/30">
              <h3 className="heading-card text-white mb-4">
                Ready to Transform Africa's Digital Future?
              </h3>
              <p className="text-body text-gray-300 mb-6 max-w-2xl mx-auto">
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

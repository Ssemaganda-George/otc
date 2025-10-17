import { useEffect, useState } from "react";
import { ArrowRight, Users, Scale, Briefcase, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import images from assets
import hero1 from "@/assets/sac5.png";
import hero2 from "@/assets/sac1.png";
import hero3 from "@/assets/sac3.png";

const heroImages = [hero1, hero2, hero3];

const highlights = [
  {
    icon: Scale,
    title: "Strategic Litigation",
    description: "Comprehensive legal solutions and strategic interest litigation for digital rights and justice across Africa.",
    link: "/products/strategic-litigation",
    linkText: "Learn More"
  },
  {
    icon: Brain,
    title: "Innovation Hub", 
    description: "Driving technological innovation through hackathons, innovation funds, data solutions, and our OTC Sandbox.",
    link: "/products/innovations",
    linkText: "Explore Innovation"
  },
  {
    icon: Briefcase,
    title: "Center for Digital Justice",
    description: "Capacity building through courses on AI, health rights, data privacy and digital justice.",
    link: "/products/center-for-digital-justice", 
    linkText: "View Programs"
  },
  {
    icon: Users,
    title: "Consultancy Services",
    description: "Expert advisory services for organizations navigating digital transformation and tech governance.",
    link: "/products/consultancy",
    linkText: "Get Support"
  }
];

export function HomeHighlights() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-card/30 to-background overflow-hidden"
      style={{
        minHeight: 600,
      }}
    >
      {/* Sliding Background Images */}
      <div className="absolute inset-0 w-full h-full z-0 transition-all duration-1000">
        {heroImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${bgIndex === idx ? "opacity-100" : "opacity-0"}`}
            style={{ zIndex: 0 }}
            draggable={false}
          />
        ))}
        {/* Overlay for contrast - reduce opacity for more visible images */}
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="heading-section text-gradient-blue mb-6">
                Empowering Africa's Digital Future
              </h2>
              <p className="text-body max-w-3xl mx-auto text-justify sm:text-center text-white drop-shadow-md bg-gradient-to-br from-yellow-900/90 via-yellow-800/90 to-yellow-700/90 rounded-xl px-6 py-4">
                OTC (OneTechConnect) advances research, Advocacy, trainings, innovation and strategic litigation in Africa 🌍  
                focusing on <span className="font-semibold">Equity</span>, and <span className="font-semibold">human rights</span> in the digital age.
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
          </div>
        </div>
      </div>
    </section>
  );
}
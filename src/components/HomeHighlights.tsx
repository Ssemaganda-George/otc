import { useEffect, useState } from "react";
import { ArrowRight, Users, Scale, Briefcase, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AOSWrapper from "@/components/AOSWrapper";

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
      className="relative py-12 md:py-16 lg:py-24 bg-gray-50 overflow-hidden"
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
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <AOSWrapper animation="fade-up" className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
                Empowering Africa's Digital Future
              </h2>
              <p className="text-base md:text-lg max-w-3xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
                OTC (OneTechConnect) advances research, Advocacy, trainings, innovation and strategic litigation in Africa 🌍
                focusing on <span className="font-semibold">Equity</span> and <span className="font-semibold">human rights</span> in the digital age.
              </p>
            </AOSWrapper>

            {/* Highlights Grid - Enhanced Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {highlights.map((highlight, index) => (
                <AOSWrapper
                  key={highlight.title}
                  animation="fade-up"
                  delay={index * 100}
                  className="h-full"
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <highlight.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-left">
                            {highlight.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-6 leading-relaxed">
                        {highlight.description}
                      </CardDescription>
                      <Link to={highlight.link}>
                        <Button variant="primary" size="sm" className="group/btn">
                          {highlight.linkText}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AOSWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
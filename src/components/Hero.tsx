import { useState, useEffect } from "react";
import { ArrowRight, Code, Scale, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/sac7.jpeg";
import heroImage2 from "@/assets/sac1.png";
import heroImage4 from "@/assets/sac3.png";
import heroImage6 from "@/assets/sac5.png";
import heroImage8 from "@/assets/sac7.png";

const heroSlides = [
  {
    image: heroImage1,
    message: "OTC is a Youth-led African Not for Profit Organization that ensures digital justice in health, sexual reproductive health, finance, agriculture and Development is advanced while ensuring respect to fundamental human rights and social justice for every individual and communities in Africa."
  },
  {
    image: heroImage2,
    message: "We nurture the next generation of African tech innovators through comprehensive legal support, mentorship programs, and advocacy."
  },
  {
    image: heroImage4,
    message: "We work around HealthTech& SRHR, AgriTech, FinTech & Development."
  },
  {
    image: heroImage6,
    message: "We promote social justice and human rights."
  },
  {
    image: heroImage8,
    message: "We Research, Capacitate, Advocate and Innovate"
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-16">
      {/* Sliding Background Images Container */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current 
                ? 'translate-x-0 opacity-100' 
                : index === (current + 1) % heroSlides.length
                ? 'translate-x-full opacity-0'
                : 'translate-x-[-100%] opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt="OTC Innovation Background" 
              className="w-full h-full object-cover opacity-90"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-16 h-16 bg-golden/15 rounded-full animate-float pointer-events-none" />
      <div className="absolute top-44 right-20 w-12 h-12 bg-primary/15 rounded-full animate-float pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-20 w-10 h-10 bg-golden/20 rounded-full animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-primary/40 rounded-full px-5 py-2 backdrop-blur-md shadow">
            <span className="w-2 h-2 bg-golden rounded-full animate-golden-pulse" />
            <span className="text-primary font-medium text-sm">Championing Digital Justice In Africa</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white animate-fade-in-up drop-shadow-lg">
            Championing Africa's Technological & Digital Justice
          </h1>

          {/* Sliding Messages Container */}
          <div className="relative min-h-[120px] md:min-h-[100px] overflow-hidden">
            {heroSlides.map((slide, index) => (
              <p
                key={index}
                className={`absolute inset-0 text-sm md:text-base lg:text-lg max-w-4xl mx-auto text-center text-white drop-shadow-md bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-950/90 rounded-xl px-6 py-4 transition-all duration-1000 ease-in-out flex items-center justify-center leading-relaxed ${
                  index === current 
                    ? 'translate-x-0 opacity-100' 
                    : index === (current + 1) % heroSlides.length
                    ? 'translate-x-full opacity-0'
                    : 'translate-x-[-100%] opacity-0'
                }`}
                style={{ cursor: 'default' }}
                tabIndex={0}
              >
                {slide.message}
              </p>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center space-y-2 group">
              <Code className="w-8 h-8 md:w-10 md:h-10 text-golden group-hover:scale-110 transition-transform" />
              <div className="text-xl md:text-2xl font-bold text-golden group-hover:text-white transition-colors">5+</div>
              <div className="text-white text-sm md:text-base">Tech Sectors</div>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <Scale className="w-8 h-8 md:w-10 md:h-10 text-golden group-hover:scale-110 transition-transform" />
              <div className="text-xl md:text-2xl font-bold text-golden group-hover:text-white transition-colors">100+</div>
              <div className="text-white text-sm md:text-base">Legal Frameworks</div>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-golden group-hover:scale-110 transition-transform" />
              <div className="text-xl md:text-2xl font-bold text-golden group-hover:text-white transition-colors">5+</div>
              <div className="text-white text-sm md:text-base">African Countries</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button variant="golden" size="lg" className="group transition-transform hover:scale-105">
              Explore Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero" size="lg" className="transition-transform hover:scale-105" asChild>
              <a href="/donate">Donate</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            title={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-golden scale-110' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
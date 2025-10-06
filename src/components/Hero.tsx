import { useState, useEffect } from "react";
import { ArrowRight, Code, Scale, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/sac7.jpeg";
import heroImage2 from "@/assets/sac1.png";
import heroImage4 from "@/assets/sac3.png";
import heroImage6 from "@/assets/sac5.png";
import heroImage8 from "@/assets/sac7.png";

const heroImages = [heroImage1, heroImage2, heroImage4, heroImage6, heroImage8];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Interactive subtitle keywords
  const subtitle = (
    <>
      OTC is a Youth-led African Not for Profit Organization that ensures digital justice in health, sexual reproductive health, finance, agriculture and Development is advanced while ensuring respect to fundamental human rights and social justice for every individual and communities in Africa.
    </>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Sliding Background Image with Overlay */}
      <div className="absolute inset-0 z-0 transition-all duration-700">
        <img 
          src={heroImages[current]} 
          alt="OTC Innovation Background" 
          className="w-full h-full object-cover opacity-90 transition-all duration-700"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-golden/15 rounded-full animate-float pointer-events-none" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary/15 rounded-full animate-float pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-golden/20 rounded-full animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-primary/40 rounded-full px-6 py-3 mb-8 backdrop-blur-md shadow">
            <span className="w-2 h-2 bg-golden rounded-full animate-golden-pulse" />
            <span className="text-primary font-medium">Championing Africa's Digital Justice</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-display text-white mb-8 animate-fade-in-up drop-shadow-lg">
            Championing Africa's Technological & Digital Justice
          </h1>

          {/* Subtitle (interactive on hover) */}
          <p
            className="text-body text-lg md:text-xl max-w-3xl mx-auto mb-12 animate-fade-in-up text-justify sm:text-center text-white drop-shadow-md bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-950/90 rounded-xl px-6 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            style={{ animationDelay: '0.2s', cursor: 'default' }}
            tabIndex={0}
          >
            {subtitle}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center space-y-2 group">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 text-golden mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl sm:text-2xl font-bold text-golden group-hover:text-white transition-colors">5+</div>
              <div className="text-white text-sm sm:text-base">Tech Sectors</div>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-golden mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl sm:text-2xl font-bold text-golden group-hover:text-white transition-colors">100+</div>
              <div className="text-white text-sm sm:text-base">Legal Frameworks</div>
            </div>
            <div className="flex flex-col items-center space-y-2 col-span-2 md:col-span-1 group">
              <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-golden mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl sm:text-2xl font-bold text-golden group-hover:text-white transition-colors">5+</div>
              <div className="text-white text-sm sm:text-base">African Countries</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button variant="golden" size="lg" className="group transition-transform hover:scale-105">
              Explore Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero" size="lg" className="transition-transform hover:scale-105">
              Get Legal Support
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-golden/40 rounded-full p-1 flex items-start justify-center">
          <div className="w-1 h-3 bg-golden rounded-full mx-auto animate-golden-pulse" />
        </div>
      </div>
    </section>
  );
}
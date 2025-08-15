import { ArrowRight, Code, Scale, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="OTC Innovation Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center sm:text-center py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-golden-pulse" />
            <span className="text-primary font-medium">Advancing Tech Legal Solutions in Africa</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-display text-gradient-blue mb-8 animate-fade-in-up">
            OneTechConnect
          </h1>

          {/* Subtitle */}
          <p className="text-body text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up text-justify sm:text-center" style={{ animationDelay: '0.2s' }}>
            Leading the fusion of technology and law across Africa. We empower innovation through expert legal guidance, 
            strategic advocacy, and cutting-edge research that drives the continent's digital transformation.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center space-y-2">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gradient-blue">5+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Tech Sectors</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gradient-blue">100+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Legal Frameworks</div>
            </div>
            <div className="flex flex-col items-center space-y-2 col-span-2 md:col-span-1">
              <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gradient-blue">20+</div>
              <div className="text-muted-foreground text-sm sm:text-base">African Countries</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button variant="golden" size="lg" className="group">
              Explore Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero" size="lg">
              Get Legal Support
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-golden-pulse" />
        </div>
      </div>
    </section>
  );
}

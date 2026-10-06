import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  display_order: number;
  is_active: boolean;
  category?: string;
  video_background?: string;
  accent_color?: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 50,
    skipSnaps: false,
  });

  const fetchHeroSlides = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching hero slides:', error);
        setSlides(getFallbackSlides());
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setSlides(getFallbackSlides());
      } else {
        setSlides(data);
      }
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      setSlides(getFallbackSlides());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHeroSlides();
  }, [fetchHeroSlides]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    };

    emblaApi.on('select', onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (slides.length > 0) {
      const autoScrollInterval = setInterval(() => {
        if (emblaApi && emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else if (emblaApi) {
          emblaApi.scrollTo(0);
        }
      }, 6000);

      return () => clearInterval(autoScrollInterval);
    }
  }, [emblaApi, slides]);

  const getFallbackSlides = (): HeroSlide[] => [
    {
      id: "1",
      title: "Championing Africa's",
      subtitle: "Technological & Digital Justice",
      description: "OTC is a Youth-led African Not for Profit Organization that ensures digital justice in health, sexual reproductive health, finance, agriculture and Development is advanced while ensuring respect to fundamental human rights and social justice for every individual and communities in Africa.",
      image: "/assets/sac7.jpeg",
      cta_text: "Learn More",
      cta_link: "/about",
      display_order: 1,
      is_active: true,
      category: "Digital Justice",
      accent_color: "hsl(217 91% 30%)"
    },
    {
      id: "2",
      title: "Nurturing the Next",
      subtitle: "Generation of African Tech Innovators",
      description: "We nurture the next generation of African tech innovators through comprehensive legal support, mentorship programs, and advocacy.",
      image: "/assets/sac1.png",
      cta_text: "Our Programs",
      cta_link: "/programmes",
      display_order: 2,
      is_active: true,
      category: "Innovation",
      accent_color: "hsl(43 89% 38%)"
    },
    {
      id: "3",
      title: "Working Around",
      subtitle: "HealthTech & SRHR, AgriTech, FinTech & Development",
      description: "We work around HealthTech & SRHR, AgriTech, FinTech & Development to ensure technology serves humanity.",
      image: "/assets/sac3.png",
      cta_text: "Our Work",
      cta_link: "/what-we-do",
      display_order: 3,
      is_active: true,
      category: "Technology",
      accent_color: "hsl(217 91% 8%)"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  if (loading) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5">
        <div className="text-center">
          <p className="text-gray-600">No hero slides available.</p>
        </div>
      </section>
    );
  }

  const currentSlide = slides[selectedIndex];

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Embla Carousel */}
      <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative min-w-full h-full flex">
              {/* Background Image/Video */}
              <div className="absolute inset-0 z-0">
                {slide.video_background ? (
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src={slide.video_background} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={slide.image} 
                    alt={`Slide ${slide.id}`} 
                    className="w-full h-full object-cover"
                    style={{ 
                      transform: selectedIndex === index ? 'scale(1)' : 'scale(1.05)',
                      transition: 'transform 1s ease-out'
                    }}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center px-4 md:px-8 py-20">
                <div className={`max-w-2xl transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                  {/* Category Badge */}
                  {slide.category && (
                    <div
                      className="mb-6 text-sm uppercase tracking-wider font-bold inline-block px-5 py-2 rounded-full"
                      style={{ 
                        backgroundColor: slide.accent_color || 'hsl(43 89% 38%)',
                        color: 'white',
                        boxShadow: `0 4px 20px ${slide.accent_color || 'hsl(43 89% 38%)'}40`
                      }}
                    >
                      {slide.category}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 text-white leading-tight tracking-tight">
                    {slide.title}
                    {slide.subtitle && (
                      <span 
                        className="block mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
                        style={{ color: slide.accent_color || 'hsl(43 89% 38%)' }}
                      >
                        {slide.subtitle}
                      </span>
                    )}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl leading-relaxed font-light">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={slide.cta_link || "/about"}
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-4 px-8 font-bold transition-all duration-300 text-center uppercase tracking-wider rounded-lg hover:scale-105 hover:shadow-2xl"
                      style={{ 
                        backgroundColor: slide.accent_color || 'hsl(43 89% 38%)',
                        boxShadow: `0 10px 30px ${slide.accent_color || 'hsl(43 89% 38%)'}50`
                      }}
                    >
                      <span>{slide.cta_text || "Learn More"}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-4 px-8 font-bold transition-all duration-300 text-center uppercase tracking-wider border-2 border-white/40 rounded-lg hover:bg-white/15 hover:border-white/70 hover:scale-105"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Modern style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Slide Counter */}
        <div className="text-white/90 text-sm font-semibold tracking-wider">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex 
                  ? "w-8 h-2" 
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              style={{ 
                backgroundColor: index === selectedIndex 
                  ? (currentSlide?.accent_color || 'hsl(43 89% 38%)') 
                  : undefined 
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

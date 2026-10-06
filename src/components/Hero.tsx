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
      }, 9000);

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
      <section className="relative min-h-[75vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-[75vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">No hero slides available.</p>
        </div>
      </section>
    );
  }

  const currentSlide = slides[selectedIndex];

  return (
    <section className="relative w-full h-[75vh] flex items-center overflow-hidden">
      {/* Embla Carousel */}
      <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative min-w-full h-full flex">
              {/* Background Image/Video */}
              <div className="absolute inset-0 z-0">
                {slide.video_background ? (
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src={slide.video_background} type="video/mp4" />
                  </video>
                ) : (
                  <img src={slide.image} alt={`Slide ${slide.id}`} className="w-full h-full object-cover" />
                )}
                {/* Subtle overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center px-4 md:px-8">
                <div className="max-w-2xl">
                  {/* Category Badge */}
                  {slide.category && (
                    <div
                      className="mb-4 text-sm uppercase tracking-wider font-bold inline-block px-4 py-1.5"
                      style={{ 
                        backgroundColor: slide.accent_color || 'hsl(43 89% 38%)',
                        color: 'white'
                      }}
                    >
                      {slide.category}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                    {slide.title}
                    {slide.subtitle && (
                      <span 
                        className="block mt-2 text-3xl md:text-4xl lg:text-5xl"
                        style={{ color: slide.accent_color || 'hsl(43 89% 38%)' }}
                      >
                        {slide.subtitle}
                      </span>
                    )}
                  </h1>

                  {/* Description */}
                  <p className="text-base md:text-lg mb-8 text-white/90 max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={slide.cta_link || "/about"}
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-3 px-6 font-medium transition-all duration-300 text-center uppercase tracking-wide text-sm hover:opacity-90"
                      style={{ backgroundColor: slide.accent_color || 'hsl(43 89% 38%)' }}
                    >
                      <span>{slide.cta_text || "Learn More"}</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-3 px-6 font-medium transition-all duration-300 text-center uppercase tracking-wide text-sm border-2 border-white/50 hover:bg-white/10"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Clean minimal style */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Slide Counter */}
        <div className="text-white/80 text-sm font-medium">
          {selectedIndex + 1} / {slides.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex 
                  ? "w-6 h-1.5" 
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
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
          className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;

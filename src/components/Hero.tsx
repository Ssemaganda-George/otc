import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight, Code, Scale, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

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
  const [slideProgress, setSlideProgress] = useState(0);

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
        // Use fallback data if database fetch fails
        setSlides(getFallbackSlides());
        setLoading(false);
        return;
      }

      // If no slides from database, use fallback
      if (!data || data.length === 0) {
        console.log('No slides found in database, using fallback data');
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
      setSlideProgress(0);
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
      }, 9000); // Changed from 12000 to 9000 milliseconds (9 seconds)

      return () => clearInterval(autoScrollInterval);
    }
  }, [emblaApi, slides]);

  useEffect(() => {
    if (slides.length > 0) {
      const progressInterval = setInterval(() => {
        setSlideProgress(prev => (prev + 100 / 90) % 100); // Updates every 100ms for 9 seconds
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [slides, selectedIndex]);

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
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No hero slides available.</p>
        </div>
      </section>
    );
  }

  const currentSlide = slides[selectedIndex];

  return (
    <section className="relative w-full h-[75vh] flex items-center overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div
          className="h-full transition-all duration-100 ease-linear"
          style={{
            width: `${slideProgress}%`,
            backgroundColor: currentSlide?.accent_color || 'hsl(43 89% 38%)' // Default to golden/orange
          }}
        ></div>
      </div>

      {/* Embla Carousel */}
      <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative min-w-full h-full flex">
              {/* Content Card - Left Side */}
              <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center px-4 md:px-8">
                <div className="bg-black/70 backdrop-blur-sm p-2 md:p-4 lg:p-6 max-w-3xl w-full rounded-lg -mt-10">
                  {/* Category Badge */}
                  {slide.category && (
                    <div
                      className="mb-4 text-sm md:text-base uppercase tracking-wider font-bold inline-block px-4 py-2 rounded-md"
                      style={{ backgroundColor: slide.accent_color || 'hsl(43 89% 38%)' }}
                    >
                      {slide.category}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white leading-tight">
                    {slide.title}
                    {slide.subtitle && <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl" style={{ color: slide.accent_color || 'hsl(43 89% 38%)' }}>{slide.subtitle}</span>}
                  </h1>

                  {/* Accent Line */}
                  <div
                    className="h-1.5 w-24 mb-6 rounded-full"
                    style={{ backgroundColor: slide.accent_color || 'hsl(43 89% 38%)' }}
                  ></div>

                  {/* Description */}
                  <p className="text-base md:text-lg lg:text-xl mb-8 text-white/90 max-w-3xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                    <Link
                      to={slide.cta_link || "/about"}
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-4 px-8 rounded-md font-medium transition-all duration-300 text-center uppercase tracking-wide text-sm md:text-base hover:scale-105 hover:shadow-xl min-w-[160px]"
                      style={{ backgroundColor: slide.accent_color || 'hsl(43 89% 38%)' }}
                    >
                      <span>{slide.cta_text || "Learn More"}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="group flex items-center justify-center w-full sm:w-auto text-white py-4 px-8 rounded-md font-medium transition-all duration-300 text-center uppercase tracking-wide text-sm md:text-base border-2 border-white/60 hover:bg-white/10 hover:scale-105 min-w-[160px] backdrop-blur-sm"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Background Image/Video - Right Side */}
              <div className="absolute inset-0 z-0">
                {slide.video_background ? (
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src={slide.video_background} type="video/mp4" />
                  </video>
                ) : (
                  <img src={slide.image} alt={`Slide ${slide.id}`} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
        {/* Slide Counter */}
        <div className="text-white text-sm font-medium">
          {selectedIndex + 1} / {slides.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 rounded-full hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex 
                  ? "w-8 h-3" 
                  : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
              style={{ backgroundColor: index === selectedIndex ? (currentSlide?.accent_color || 'hsl(43 89% 38%)') : undefined }}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 rounded-full hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
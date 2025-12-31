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
  const [slideProgress, setSlideProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 50, // Increased for heavier slide transitions
    skipSnaps: false,
  });

  // Fallback slides data
  const fallbackSlides: HeroSlide[] = [
    {
      id: "fallback-1",
      title: "Championing Africa's",
      subtitle: "Digital Transformation",
      description: "OneTechConnect leads Africa's technological advancement through innovative solutions, strategic partnerships, and unwavering commitment to human rights and social justice.",
      image: "/api/placeholder/1920/1080",
      cta_text: "Explore Our Mission",
      cta_link: "/about",
      display_order: 1,
      is_active: true,
      category: "Innovation",
      accent_color: "hsl(43 89% 38%)" // SACOTC Golden
    },
    {
      id: "fallback-2",
      title: "Strategic Litigation",
      subtitle: "& Digital Justice",
      description: "Defending digital rights and promoting equitable access to technology through expert legal advocacy and comprehensive training programs for legal professionals.",
      image: "/api/placeholder/1920/1080",
      cta_text: "Learn More",
      cta_link: "/products/strategic-litigation",
      display_order: 2,
      is_active: true,
      category: "Justice",
      accent_color: "hsl(43 89% 38%)" // SACOTC Golden
    },
    {
      id: "fallback-3",
      title: "Innovation Hub",
      subtitle: "Driving Excellence",
      description: "Empowering Africa's tech ecosystem through hackathons, innovation funding, cutting-edge data solutions, and our exclusive OTC Sandbox for transformative projects.",
      image: "/api/placeholder/1920/1080",
      cta_text: "Join Innovation Hub",
      cta_link: "/products/innovations",
      display_order: 3,
      is_active: true,
      category: "Technology",
      accent_color: "hsl(43 89% 38%)" // SACOTC Golden
    }
  ];

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
      }, 12000); // Increased interval for more deliberate auto-scroll

      return () => clearInterval(autoScrollInterval);
    }
  }, [emblaApi, slides]);

  useEffect(() => {
    if (slides.length > 0) {
      const progressInterval = setInterval(() => {
        setSlideProgress(prev => (prev + 100 / 90) % 100);
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [slides, selectedIndex]);

  const fetchHeroSlides = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching hero slides:', error);
        console.log('Using fallback slides due to database error');
        setSlides(fallbackSlides);
        setLoading(false);
        return;
      }

      // If no data from database, use fallback slides
      if (!data || data.length === 0) {
        console.log('No hero slides found in database, using fallback slides');
        setSlides(fallbackSlides);
      } else {
        setSlides(data);
      }
    } catch (error) {
      console.error('Failed to fetch hero slides:', error);
      console.log('Using fallback slides due to fetch error');
      setSlides(fallbackSlides);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHeroSlides();
  }, [fetchHeroSlides]);

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

  const currentSlide = slides[selectedIndex];

  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div
          className="h-full transition-all duration-100 ease-linear"
          style={{
            width: `${slideProgress}%`,
            backgroundColor: 'hsl(43 89% 38%)'
          }}
        ></div>
      </div>

      {/* Embla Carousel */}
      <div className="embla h-[65vh] md:h-[85vh] overflow-hidden w-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative min-w-full h-full flex">
              {/* Content Card - Left Side */}
              <div className="relative z-10 w-full md:w-4/5 lg:w-3/5 flex items-center">
                <div className="bg-black bg-opacity-70 p-6 md:p-8 lg:p-10 max-w-5xl mx-auto md:ml-12 lg:ml-24 w-full">
                  {/* Category Badge */}
                  {slide.category && (
                    <div
                      className="mb-3 text-sm md:text-base uppercase tracking-wider font-bold inline-block px-3 py-1 rounded-sm bg-golden text-golden-foreground"
                    >
                      {slide.category}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                    {slide.title}
                    {slide.subtitle && <span className="block mt-1 text-2xl md:text-3xl lg:text-4xl text-golden">{slide.subtitle}</span>}
                  </h1>

                  {/* Accent Line */}
                  <div className="h-1.5 w-20 mb-4 bg-golden"></div>

                  {/* Description */}
                  <p className="text-base md:text-lg lg:text-xl mb-6 text-white/90 max-w-2xl font-light">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Link
                      to={slide.cta_link || "/contact"}
                      className="flex items-center justify-center w-full sm:w-auto text-white py-2.5 px-5 rounded-sm transition-all duration-300 text-center uppercase tracking-wide text-sm md:text-base font-medium hover:scale-105 hover:shadow-lg min-w-[140px] bg-golden hover:bg-golden-hover"
                    >
                      <span>{slide.cta_text || "Learn More"}</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center w-full sm:w-auto text-white py-2.5 px-5 rounded-sm transition-all duration-300 text-center uppercase tracking-wide text-sm md:text-base font-medium border-2 border-white/60 hover:bg-white/10 hover:scale-105 min-w-[140px]"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
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
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === selectedIndex ? "w-8" : "bg-border hover:bg-muted-foreground"
              }`}
              style={{ backgroundColor: index === selectedIndex ? 'hsl(43 89% 38%)' : undefined }}
            />
          ))}
        </div>
        <button
          onClick={scrollNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
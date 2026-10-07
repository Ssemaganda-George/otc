import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import AOSWrapper from "@/components/AOSWrapper";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface HomeSection {
  id: string;
  section_name: string;
  title: string;
  content: string;
  section_type: string;
}

interface ImpactStat {
  id: string;
  number: string;
  label: string;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  category: string;
  publish_date: string;
}

const ourProducts = [
  { name: "OTC Innovation Hub", tagline: "Developing, connecting and scaling African innovation.", href: "/innovation-hub" },
  { name: "OTC Academy", tagline: "Research, learning and capability development.", href: "/academy" },
  { name: "Legal & Business Support Centre", tagline: "Protecting innovations and structuring opportunity.", href: "/legal-business-support" },
  { name: "OTC Fund", tagline: "Capital for African innovation and innovators.", href: "/fund" },
  { name: "OTC Media Hub", tagline: "Creating, telling and amplifying African stories.", href: "/media" },
];

const Index = () => {
  const [homeSections, setHomeSections] = useState<HomeSection[]>([]);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerValueIndex, setCenterValueIndex] = useState(0);
  const valuesScrollRef = useRef<HTMLDivElement>(null);

  const scrollValues = (direction: 'left' | 'right') => {
    const container = valuesScrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sectionsRes, statsRes, valuesRes, newsRes] = await Promise.all([
        supabase.from('home_sections').select('*').eq('is_active', true).order('display_order'),
        supabase.from('our_impact_stats').select('*').order('created_at'),
        supabase.from('core_values').select('*').eq('is_active', true).order('display_order'),
        supabase.from('news_updates').select('id, title, excerpt, featured_image, category, publish_date').eq('is_featured', true).order('publish_date', { ascending: false }).limit(3)
      ]);

      if (sectionsRes.data) setHomeSections(sectionsRes.data);
      if (statsRes.data) setImpactStats(statsRes.data);
      if (valuesRes.data) setCoreValues(valuesRes.data);
      if (newsRes.data) setLatestNews(newsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSectionContent = (sectionType: string) => {
    return homeSections.find(section => section.section_type === sectionType);
  };

  useEffect(() => {
    const container = valuesScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      const items = container.querySelectorAll('[data-value-index]');
      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const itemCenter = (item as HTMLElement).offsetLeft + (item as HTMLElement).offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenterValueIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [coreValues.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white custom-scrollbar font-poppins">
        <TopBar />
        <SiteHeader />
        <Navigation />
        <main className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      {/* 1. Top Bar - Social icons and search */}
      <TopBar />

      {/* 2. Site Header - Logo and quick actions */}
      <SiteHeader />

      {/* 3. Navigation Bar */}
      <Navigation />

      <main>
        {/* 4. Hero - Images with messages */}
        <HeroSlider />

        {/* 5. Impact & Statistics */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {impactStats.map((stat, index) => (
                  <div key={stat.id || index} className="py-6 px-4 border-t-2 border-primary/20">
                    <div className="text-5xl md:text-6xl font-extrabold text-foreground mb-2">{stat.number}</div>
                    <div className="text-base text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 6. Who We Are + Mission/Vision */}
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div>
                  <h2 className="text-5xl md:text-6xl lg:text-5xl font-black uppercase leading-[0.85] tracking-tight text-foreground mb-6">
                    Welcome To OTC
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    OTC is a youth-led African innovation organisation harnessing talent, technology, creativity and knowledge to build solutions in Health, SRHR and Sustainable Development.
                  </p>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                    We turn African ideas into scalable solutions through research, innovation, technical and financial support, business protection and media amplification.
                  </p>
                  <Link to="/about/who-we-are" className="inline-flex items-center bg-primary text-white px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg">
                    Learn more about us <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Right: Image */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                    <img src="/assets/sac1.png" alt="Who We Are" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
                    {getSectionContent('mission')?.title?.replace(/^OUR\s+/i, '') || 'MISSION'}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {getSectionContent('mission')?.content || 'Loading...'}
                  </p>
                </div>
                <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
                    {getSectionContent('vision')?.title?.replace(/^OUR\s+/i, '') || 'VISION'}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {getSectionContent('vision')?.content || 'Loading...'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 7. Our Values */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                    Our Values
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    The principles that guide our work and shape our commitment to Africa's digital transformation.
                  </p>
                </div>

              <div className="relative">
                <button
                  onClick={() => scrollValues('left')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Scroll values left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollValues('right')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Scroll values right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div 
                  ref={valuesScrollRef}
                  className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide"
                >
                {coreValues.map((value, index) => {
                  const distance = Math.abs(index - centerValueIndex);
                  const scale = distance === 0 ? 1.08 : distance === 1 ? 1 : 0.94;

                  return (
                    <div 
                      key={value.id} 
                      data-value-index={index}
                      className="snap-center flex-shrink-0 w-[280px] md:w-[320px]"
                      style={{ 
                        transform: `scale(${scale})`,
                        transition: 'transform 0.4s ease',
                        transformOrigin: 'center center'
                      }}
                    >
                      <div className="bg-white p-8 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                        <h3 className="text-2xl font-bold text-foreground text-center mb-3">
                          {value.title}
                        </h3>
                        {value.description && (
                          <p className="text-lg text-muted-foreground text-center leading-relaxed">
                            {value.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AOSWrapper>

      {/* Our Approach */}
      <AOSWrapper animation="fade-up" delay={150}>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Our Approach</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  At OTC, we take ideas from opportunity to impact. We discover real problems and opportunities, build innovative solutions and enterprises, protect their intellectual and commercial value, finance their growth with appropriate capital, amplify their stories and connect them to the right audiences, and scale what works to create lasting impact.
                </p>
              </div>
              <div>
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        </AOSWrapper>

        {/* 8. Our Approach */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Products</h2>
                <p className="text-xl text-muted-foreground">Five ways we turn African ideas into scalable solutions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {ourProducts.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="p-8 flex-1">
                      <h4 className="text-2xl font-bold text-foreground mb-3">{product.name}</h4>
                      <p className="text-lg text-muted-foreground leading-relaxed">{product.tagline}</p>
                    </div>
                    <div className="px-8 pb-8">
                      <span className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wide group-hover:bg-primary-dark transition-colors duration-300">
                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 10. Our Partners */}
        <AOSWrapper animation="fade-up" delay={250}>
          <section className="py-20 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
               <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10">Our Partners</h3>
              <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
                <img src="/partners/ministry-of-health.png" alt="Ministry of Health" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/personal-data-protection-office.png" alt="Personal Data Protection Office" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/ministry-of-science-innovation.png" alt="Ministry of Science & Innovation" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/adijust.png" alt="ADIJUST" className="h-16 md:h-24 w-auto object-contain" />
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 11. Latest News & Opportunities */}
        <AOSWrapper animation="fade-up" delay={400}>
          <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Latest News & Opportunities</h3>
                <Link to="/news" className="text-primary font-semibold inline-flex items-center gap-1 hover:translate-x-1 transition-transform">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {latestNews.map((news) => (
                  <article key={news.id} className="bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-300 overflow-hidden">
                    <img
                      src={news.featured_image || "/assets/sac3.png"}
                      alt={news.title}
                      className="w-full h-56 object-cover rounded-xl shadow-md"
                    />
                    <div className="p-6">
                      <span className="inline-block text-primary text-sm font-bold px-2 py-1 mb-3 uppercase tracking-wide">
                        {news.category || 'NEWS'}
                      </span>
                      <h4 className="text-2xl font-bold text-foreground mb-3 leading-snug">{news.title}</h4>
                      <p className="text-base text-muted-foreground leading-relaxed">{news.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link to="/news" className="inline-block bg-primary text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors duration-300">
                  View All News
                </Link>
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

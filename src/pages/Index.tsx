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
  section_type: string;
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  link_url?: string;
  link_text?: string;
  display_order?: number;
  is_active?: boolean;
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

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
}

interface Innovation {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  website_url: string | null;
}

const fallbackProducts: Product[] = [
  { id: "pr1", name: "OTC Innovation Hub", tagline: "Developing, connecting and scaling African innovation.", description: null, image_url: "/images/DJP_5027.jpg", link_url: "/innovation-hub", link_text: "Learn more" },
  { id: "pr2", name: "OTC Academy", tagline: "Research, learning and capability development.", description: null, image_url: "/images/DJP_5020.jpg", link_url: "/academy", link_text: "Learn more" },
  { id: "pr3", name: "Legal & Business Support Centre", tagline: "Protecting innovations and structuring opportunity.", description: null, image_url: "/images/DFA-2.jpg", link_url: "/legal-business-support", link_text: "Learn more" },
  { id: "pr4", name: "OTC Fund", tagline: "Capital for African innovation and innovators.", description: null, image_url: "/images/DFA-25-highlight-sessions-01.jpg", link_url: "/fund", link_text: "Learn more" },
  { id: "pr5", name: "OTC Media Hub", tagline: "Creating, telling and amplifying African stories.", description: null, image_url: "/images/DFA-25-Speakers-X-D01-09.jpg", link_url: "/media", link_text: "Learn more" },
];

const fallbackInnovations: Innovation[] = [
  { id: "wazazi-connect", name: "WazaziConnect", description: "A digital platform connecting parents and caregivers with trusted health and development resources.", logo_url: null, website_url: null },
  { id: "happy-farma", name: "HappyFarma", description: "A technology solution supporting farmers with access to information, inputs and markets.", logo_url: null, website_url: null },
];

const fallbackPartners: Partner[] = [
  { id: "p1", name: "Ministry of Health", logo_url: "/partners/ministry-of-health.png", website_url: "https://health.go.ug" },
  { id: "p2", name: "Personal Data Protection Office", logo_url: "/partners/personal-data-protection-office.png", website_url: null },
  { id: "p3", name: "Ministry of Science & Innovation", logo_url: "/partners/ministry-of-science-innovation.png", website_url: null },
  { id: "p4", name: "ADIJUST", logo_url: "/partners/adijust.png", website_url: null },
];

const fallbackImpactStats: ImpactStat[] = [
  { id: "st1", number: "2+", label: "Solutions Developed" },
  { id: "st2", number: "8+", label: "Organisations Supported" },
  { id: "st3", number: "2+", label: "Campaigns Supported" },
  { id: "st4", number: "1000+", label: "Individuals Reached" },
];

const Index = () => {
  const [homeSections, setHomeSections] = useState<HomeSection[]>([]);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerValueIndex, setCenterValueIndex] = useState(0);
  const valuesScrollRef = useRef<HTMLDivElement>(null);
  const [centerProductIndex, setCenterProductIndex] = useState(0);
  const productScrollRef = useRef<HTMLDivElement>(null);

  const scrollValues = (direction: 'left' | 'right') => {
    const container = valuesScrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = productScrollRef.current;
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
      const [sectionsRes, statsRes, valuesRes, newsRes, partnersRes, productsRes, innovationsRes] = await Promise.all([
        supabase.from('home_sections').select('*').eq('is_active', true).order('display_order'),
        supabase.from('our_impact_stats').select('*').order('created_at'),
        supabase.from('core_values').select('*').eq('is_active', true).order('display_order'),
        supabase.from('news_updates').select('id, title, excerpt, featured_image, category, publish_date').eq('is_featured', true).order('publish_date', { ascending: false }).limit(3),
        supabase.from('partners').select('id, name, logo_url, website_url').eq('is_active', true).order('display_order'),
        supabase.from('products').select('id, name, tagline, description, image_url, link_url, link_text').eq('is_active', true).order('display_order'),
        supabase.from('innovations').select('id, name, description, logo_url, website_url').eq('is_active', true).order('display_order')
      ]);

      if (sectionsRes.data) setHomeSections(sectionsRes.data);
      if (statsRes.data) setImpactStats(statsRes.data);
      if (valuesRes.data) setCoreValues(valuesRes.data);
      if (newsRes.data) setLatestNews(newsRes.data);
      if (partnersRes.data) setPartners(partnersRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (innovationsRes.data) setInnovations(innovationsRes.data);
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

  useEffect(() => {
    const container = productScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      const items = container.querySelectorAll('[data-product-index]');
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

      setCenterProductIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [products.length]);

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
          <section className="py-24 bg-golden-light">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {(impactStats.length > 0 ? impactStats : fallbackImpactStats).map((stat, index) => (
                  <div key={stat.id || index} className={`py-6 px-4 border-t-4 ${index % 2 === 0 ? 'border-primary' : 'border-accent'}`}>
                    <div className="text-5xl md:text-6xl font-extrabold text-foreground mb-2">
                      {stat.number.endsWith('+') ? stat.number : `${stat.number}+`}
                    </div>
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
                  <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-5">Who We Are</p>
                  <h2 className="text-5xl md:text-6xl lg:text-5xl font-black uppercase leading-[0.85] tracking-tight text-primary mb-6">
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
                <div className="relative group">
                  <div className="absolute -inset-3 border-2 border-golden-light rounded-3xl transition-all duration-500 group-hover:-inset-5 group-hover:border-primary/40" aria-hidden="true" />
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                    <img src={getSectionContent('welcome_to_otc')?.image || "/images/DJP_5027.jpg"} alt="Who We Are" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                <div className="bg-golden-light p-10 rounded-2xl border border-golden-light hover:shadow-golden transition-shadow duration-300">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
                    {getSectionContent('mission')?.title?.replace(/^OUR\s+/i, '') || 'MISSION'}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {getSectionContent('mission')?.content || 'Loading...'}
                  </p>
                </div>
                <div className="bg-accent-light p-10 rounded-2xl border border-accent-light hover:shadow-blue transition-shadow duration-300">
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
                  <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">What We Stand For</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                    Our Values
                  </h2>
                  <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
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
                  className="relative flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide"
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
                      <div className="bg-white p-8 border border-gray-200 hover:border-accent/40 hover:shadow-lg transition-all duration-300 h-full">
                        <div className="w-10 h-1 bg-accent mx-auto mb-5 rounded-full" />
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
        <section className="py-24 bg-accent-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">How We Work</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">Our Approach</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  At OTC, we take ideas from opportunity to impact. We discover real problems and opportunities, build innovative solutions and enterprises, protect their intellectual and commercial value, finance their growth with appropriate capital, amplify their stories and connect them to the right audiences, and scale what works to create lasting impact.
                </p>
              </div>
              <div className="group">
                {getSectionContent('our_approach')?.image ? (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                    <img src={getSectionContent('our_approach')?.image} alt="Our Approach" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-400 font-medium">Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        </AOSWrapper>

        {/* Our Innovations */}
        <AOSWrapper animation="fade-up" delay={150}>
          <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">What We've Built</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Innovations</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
                <p className="text-xl text-muted-foreground mt-6">Home-grown solutions creating sustainable impact across Africa.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(innovations.length > 0 ? innovations : fallbackInnovations).map((innovation) => (
                  <div key={innovation.id} className="bg-white p-10 border border-gray-200 hover:border-primary/30 hover:shadow-golden hover:-translate-y-1 transition-all duration-300 rounded-2xl text-center">
                    {innovation.logo_url ? (
                      innovation.website_url ? (
                        <a href={innovation.website_url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${innovation.name} website`} className="block cursor-pointer">
                          <img src={innovation.logo_url} alt={innovation.name} className="h-20 w-auto object-contain mx-auto mb-6 hover:opacity-80 transition-opacity" />
                        </a>
                      ) : (
                        <img src={innovation.logo_url} alt={innovation.name} className="h-20 w-auto object-contain mx-auto mb-6" />
                      )
                    ) : null}
                    <h3 className="text-2xl font-bold text-primary mb-3">{innovation.name}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{innovation.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/innovation-hub" className="inline-flex items-center bg-primary text-white px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg">
                  Explore the Innovation Hub <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Our Products */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">What We Offer</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Products</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
                <p className="text-xl text-muted-foreground mt-6">Five ways we turn African ideas into scalable solutions.</p>
              </div>

              <div className="relative">
                <button
                  onClick={() => scrollProducts('left')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Scroll products left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollProducts('right')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Scroll products right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div
                  ref={productScrollRef}
                  className="relative flex items-center overflow-x-auto snap-x snap-mandatory gap-8 pb-8 -mx-6 px-6 scrollbar-hide"
                >
                  {(products.length > 0 ? products : fallbackProducts).map((product, index) => {
                    const distance = Math.abs(index - centerProductIndex);
                    const scale = distance === 0 ? 1.1 : distance === 1 ? 0.96 : 0.9;

                    return (
                      <div
                        key={product.id}
                        data-product-index={index}
                        className="snap-center flex-shrink-0 w-[300px] md:w-[380px]"
                        style={{
                          transform: `scale(${scale})`,
                          transition: 'transform 0.4s ease',
                          transformOrigin: 'center center'
                        }}
                      >
                        <div className="group bg-white border border-gray-200 hover:border-primary/30 hover:shadow-golden transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
                          <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-out" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-golden-light/40">
                                <span className="text-4xl font-black text-primary/40">{product.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h4 className="text-xl font-bold text-foreground mb-2">{product.name}</h4>
                            <p className="text-base text-muted-foreground leading-relaxed flex-1">{product.tagline}</p>
                            <div className="pt-4">
                              <Link
                                to={product.link_url || '/'}
                                className="inline-flex items-center bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors duration-300"
                              >
                                {product.link_text || 'Learn more'} <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 10. Our Partners */}
        <AOSWrapper animation="fade-up" delay={250}>
          <section className="py-20 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
               <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">Working Together</p>
             <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Partners</h3>
             <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />
              <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
                {(partners.length > 0 ? partners : fallbackPartners).map((partner) => {
                  const logo = (
                    <img src={partner.logo_url} alt={partner.name} title={partner.name} className="h-16 md:h-24 w-auto object-contain" />
                  );
                  return partner.website_url ? (
                    <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" aria-label={partner.name} className="inline-block cursor-pointer hover:opacity-80 transition-opacity">
                      {logo}
                    </a>
                  ) : (
                    <span key={partner.id} className="inline-block">{logo}</span>
                  );
                })}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 11. Latest News & Opportunities */}
        <AOSWrapper animation="fade-up" delay={400}>
          <section className="py-24 bg-golden-light">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-4">Stay Updated</p>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Latest News & Opportunities</h3>
                </div>
                <Link to="/news" className="text-primary font-semibold inline-flex items-center gap-1 hover:translate-x-1 transition-transform">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {latestNews.map((news, index) => (
                    <article key={news.id} className="group bg-white border border-gray-200 hover:border-primary/30 hover:shadow-golden transition-all duration-300 overflow-hidden rounded-2xl">
                      <div className="overflow-hidden">
                        <img
                        src={news.featured_image || "/assets/sac3.png"}
                        alt={news.title}
                        className="w-full h-56 object-cover rounded-t-2xl scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      </div>
                      <div className="p-6">
                        <span className={`inline-block text-sm font-bold px-2 py-1 mb-3 uppercase tracking-wide ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`}>
                          {news.category || 'NEWS'}
                        </span>
                        <h4 className="text-2xl font-bold text-foreground mb-3 leading-snug">{news.title}</h4>
                        <p className="text-base text-muted-foreground leading-relaxed">{news.excerpt}</p>
                      </div>
                    </article>
                  ))}
              </div>

              <div className="mt-10 text-center">
                <Link to="/news" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-primary-dark hover:shadow-golden transition-all duration-300">
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

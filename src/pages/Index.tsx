import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import AOSWrapper from "@/components/AOSWrapper";
import { ArrowRight } from "lucide-react";

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

        {/* 5. Introduction - About, Mission, Vision */}
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* About Us */}
                <div className="p-8 border-l-4 border-primary bg-gray-50/50">
                  <h2 className="text-xl font-bold mb-4 text-foreground">
                    {getSectionContent('about_us')?.title || 'ABOUT US'}
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {getSectionContent('about_us')?.content || 'Loading...'}
                  </p>
                </div>

                {/* Mission */}
                <div className="p-8 border-l-4 border-primary/60 bg-gray-50/50">
                  <h2 className="text-xl font-bold mb-4 text-foreground">
                    {getSectionContent('mission')?.title || 'OUR MISSION'}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {getSectionContent('mission')?.content || 'Loading...'}
                  </p>
                </div>

                {/* Vision */}
                <div className="p-8 border-l-4 border-primary/40 bg-gray-50/50">
                  <h2 className="text-xl font-bold mb-4 text-foreground">
                    {getSectionContent('vision')?.title || 'OUR VISION'}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {getSectionContent('vision')?.content || 'Loading...'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 6. Our Values */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide our work and shape our commitment to Africa's digital transformation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {coreValues.map((value, index) => (
                  <div key={value.id} className="group">
                    <div className="bg-white p-6 border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-300 h-full">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary font-bold text-sm mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                      <h3 className="text-base font-bold text-foreground text-center mb-2">
                        {value.title}
                      </h3>
                      {value.description && (
                        <p className="text-sm text-muted-foreground text-center leading-relaxed">
                          {value.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 7. Our Products */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Products</h3>
                <p className="text-lg text-muted-foreground">Five ways we turn African ideas into scalable solutions.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {ourProducts.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="group bg-white p-6 border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col"
                  >
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {product.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mt-2 flex-1 leading-relaxed">{product.tagline}</p>
                    <div className="mt-4 flex items-center text-primary text-sm font-semibold">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 8. Our Partners */}
        <AOSWrapper animation="fade-up" delay={250}>
          <section className="py-20 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-10">Our Partners</h3>
              <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
                <img src="/partners/ministry-of-health.png" alt="Ministry of Health" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/personal-data-protection-office.png" alt="Personal Data Protection Office" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/ministry-of-science-innovation.png" alt="Ministry of Science & Innovation" className="h-16 md:h-24 w-auto object-contain" />
                <img src="/partners/adijust.png" alt="ADIJUST" className="h-16 md:h-24 w-auto object-contain" />
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 9. Impact & Statistics */}
        <AOSWrapper animation="fade-up" delay={300}>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact</h3>
                <p className="text-lg text-muted-foreground">Measuring our contribution to Africa's digital transformation.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {impactStats.map((stat, index) => (
                  <div key={stat.id || index} className="py-6 px-4 border-t-2 border-primary/20">
                    <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* 10. Latest News & Opportunities */}
        <AOSWrapper animation="fade-up" delay={400}>
          <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">Latest News & Opportunities</h3>
                <Link to="/news" className="text-primary font-semibold flex items-center hover:underline">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {latestNews.map((news) => (
                  <article key={news.id} className="bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-300 overflow-hidden">
                    <img
                      src={news.featured_image || "/assets/sac3.png"}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="inline-block text-primary text-xs font-bold px-2 py-1 mb-3 uppercase tracking-wide">
                        {news.category || 'NEWS'}
                      </span>
                      <h4 className="text-xl font-bold text-foreground mb-3 leading-snug">{news.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{news.excerpt}</p>
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

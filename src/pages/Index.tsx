import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import HeroSlider from "@/components/HeroSlider";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

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

interface CorePillar {
  id: string;
  letter: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

const Index = () => {
  const [homeSections, setHomeSections] = useState<HomeSection[]>([]);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([]);
  const [corePillars, setCorePillars] = useState<CorePillar[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sectionsRes, statsRes, pillarsRes, valuesRes, newsRes] = await Promise.all([
        supabase.from('home_sections').select('*').eq('is_active', true).order('display_order'),
        supabase.from('our_impact_stats').select('*').order('created_at'),
        supabase.from('core_pillars').select('*').eq('is_active', true).order('display_order'),
        supabase.from('core_values').select('*').eq('is_active', true).order('display_order'),
        supabase.from('news_updates').select('id, title, excerpt, featured_image, category, publish_date').eq('is_featured', true).order('publish_date', { ascending: false }).limit(3)
      ]);

      if (sectionsRes.data) setHomeSections(sectionsRes.data);
      if (statsRes.data) setImpactStats(statsRes.data);
      if (pillarsRes.data) setCorePillars(pillarsRes.data);
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
      <div className="min-h-screen bg-background custom-scrollbar font-poppins">
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
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />

      <main className="pt-6">
        {/* 1. Hero - full viewport height (reuse existing Hero for advanced visuals) */}
        <HeroSlider />

        {/* 2. Introduction (About Us, Mission & Vision) */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Us Card */}
            <div className="bg-primary text-primary-foreground p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-4 font-poppins">
                  {getSectionContent('about_us')?.title || 'ABOUT US'}
                </h2>
                <p className="text-base leading-relaxed text-primary-foreground/90">
                  {getSectionContent('about_us')?.content || 'Loading...'}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-card p-6 shadow-xl border border-gray-200 hover:shadow-card transition-all duration-300">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-poppins">
                  {getSectionContent('mission')?.title || 'OUR MISSION'}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-3">
                  {getSectionContent('mission')?.content || 'Loading...'}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-golden text-golden-foreground p-6 shadow-xl border border-gray-200 hover:shadow-golden transition-all duration-300">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-4 font-poppins">
                  {getSectionContent('vision')?.title || 'OUR VISION'}
                </h2>
                <p className="text-base leading-relaxed text-golden-foreground/90">
                  {getSectionContent('vision')?.content || 'Loading...'}
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* 2.5. Our Values */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and shape our commitment to Africa's digital transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((value, index) => (
                <div key={value.id} className="group">
                  <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary text-white font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-foreground text-center mb-3 font-poppins">
                      {value.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Core Pillars (What We Do) */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">What We Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {corePillars.map((pillar) => (
                <div key={pillar.id} className="bg-foreground text-white p-6 shadow-lg border border-gray-800 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-bold">
                      {pillar.letter}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{pillar.title}</h4>
                      <p className="text-sm text-white/90 mt-2">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Impact & Statistics */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-8 text-white">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {impactStats.map((stat, index) => (
                <div key={stat.id || index} className="py-8 px-4">
                  <div className="text-4xl md:text-5xl font-extrabold">{stat.number}</div>
                  <div className="mt-2 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Latest News & Opportunities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Latest News & Opportunities</h3>
              <Link to="/news" className="text-primary font-semibold">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((news) => (
                <article key={news.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                  <img
                    src={news.featured_image || "/assets/sac3.png"}
                    alt={news.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-primary text-white text-xs px-2 py-1 mb-2 uppercase">
                      {news.category || 'NEWS'}
                    </span>
                    <h4 className="text-lg font-bold text-foreground">{news.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{news.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/news" className="inline-block bg-primary text-white px-6 py-3 font-bold uppercase">View All News</Link>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default Index;

import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AOSWrapper from "@/components/AOSWrapper";
import { ArrowRight } from "lucide-react";

interface HomeSection {
  id: string;
  section_type: string;
  title: string;
  content: string;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  display_order: number;
}

const VisionMissionPage = () => {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('home_sections')
          .select('id, section_type, title, content')
          .in('section_type', ['vision', 'mission'])
          .eq('is_active', true)
          .order('display_order');

        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
        } else {
          setSections(sectionsData || []);
        }

        const { data: coreValuesData, error: coreValuesError } = await supabase
          .from('core_values')
          .select('id, title, description, display_order')
          .eq('is_active', true)
          .order('display_order');

        if (coreValuesError) {
          console.error('Error fetching core values:', coreValuesError);
        } else {
          setCoreValues(coreValuesData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSectionContent = (sectionType: string) => {
    return sections.find(section => section.section_type === sectionType);
  };

  const visionSection = getSectionContent('vision');
  const missionSection = getSectionContent('mission');

  if (loading) {
    return (
      <div className="min-h-screen bg-white custom-scrollbar font-poppins">
        <TopBar />
        <SiteHeader />
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />

      <main className="pt-20">
        {/* Clean header section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Vision & Mission
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our guiding principles for advancing African-led innovation
            </p>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {visionSection && (
                <AOSWrapper animation="fade-up" delay={100}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                      {visionSection.title || 'Our Vision'}
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {visionSection.content}
                    </p>
                  </div>
                </AOSWrapper>
              )}

              {missionSection && (
                <AOSWrapper animation="fade-up" delay={200}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                      {missionSection.title || 'Our Mission'}
                    </h2>
                    <div className="text-xl text-gray-700 leading-relaxed space-y-4">
                      {missionSection.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </AOSWrapper>
              )}

              {(!visionSection && !missionSection) && (
                <AOSWrapper animation="fade-up" delay={100}>
                  <div className="text-center py-12 md:col-span-2">
                    <p className="text-gray-600 text-xl">Content is being configured. Please check back later.</p>
                  </div>
                </AOSWrapper>
              )}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        {coreValues.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Our Core Values
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                  <AOSWrapper key={value.id} animation="fade-up" delay={index * 100}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-full">
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        {value.title}
                      </h3>
                      <p className="text-xl text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </AOSWrapper>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Ready to make an impact?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Join us in advancing African-led innovation and creating lasting change across the continent.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-golden text-white px-10 py-4 text-xl font-bold rounded-full hover:bg-golden-dark transition-all duration-300 shadow-lg"
            >
              Get in touch
              <ArrowRight className="ml-3 w-6 h-6" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisionMissionPage;

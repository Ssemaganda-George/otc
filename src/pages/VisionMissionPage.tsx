import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AOSWrapper from "@/components/AOSWrapper";

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
        // Fetch vision, mission sections
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

        // Fetch core values
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
      <div className="min-h-screen bg-background custom-scrollbar">
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
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <AOSWrapper animation="fade-up">
          <section className="bg-primary text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
                Vision & Mission
              </h1>
              <p className="text-xl md:text-2xl font-inter max-w-3xl mx-auto">
                Our guiding principles for advancing African-led innovation
              </p>
            </div>
          </section>
        </AOSWrapper>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-1 gap-12">
              {/* Vision */}
              {visionSection && (
                <AOSWrapper animation="fade-up" delay={100}>
                  <div className="bg-white p-8 shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold font-poppins text-primary mb-6">
                      {visionSection.title || 'Our Vision'}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {visionSection.content}
                    </p>
                  </div>
                </AOSWrapper>
              )}

              {/* Mission */}
              {missionSection && (
                <AOSWrapper animation="fade-up" delay={200}>
                  <div className="bg-white p-8 shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold font-poppins text-primary mb-6">
                      {missionSection.title || 'Our Mission'}
                    </h2>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                      {missionSection.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </AOSWrapper>
              )}

              {/* Fallback content if no sections are found */}
              {(!visionSection && !missionSection) && (
                <AOSWrapper animation="fade-up" delay={100}>
                  <div className="text-center py-12">
                    <p className="text-gray-600">Content is being configured. Please check back later.</p>
                  </div>
                </AOSWrapper>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VisionMissionPage;
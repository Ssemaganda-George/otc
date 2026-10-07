import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ResearchExpert {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  display_order: number;
}

const ResearchExpertsPage = () => {
  const [experts, setExperts] = useState<ResearchExpert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const { data, error } = await supabase
          .from('research_experts')
          .select('*')
          .order('display_order');

        if (error) {
          console.error('Error fetching research experts:', error);
          return;
        }

        setExperts(data || []);
      } catch (error) {
        console.error('Error fetching research experts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white custom-scrollbar">
        <TopBar />

        <SiteHeader />

        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading research experts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      {/* Fixed Navigation Bar */}
      <TopBar />

      <SiteHeader />

      <Navigation />

      <main className="pt-6">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6">
              Research Experts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our team of researchers and experts driving innovation in digital justice
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">
                Our Research Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our research experts bring diverse backgrounds in technology, law, policy, and social sciences to address complex digital justice challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map((expert) => (
                <div key={expert.id} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                  <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    {expert.image ? (
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {expert.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">{expert.name}</h3>
                  <p className="text-primary font-semibold mb-3">{expert.position}</p>
                  <p className="text-muted-foreground text-xl">
                    {expert.bio}
                  </p>
                </div>
              ))}
            </div>

            {experts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-muted-foreground">No research experts found. Please add experts through the admin panel.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResearchExpertsPage;
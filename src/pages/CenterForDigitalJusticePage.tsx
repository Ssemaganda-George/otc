import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Scale, BookOpen, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface DigitalJusticeService {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  features: string[];
}

const iconMap = {
  BookOpen,
  Shield,
  Users,
  Scale,
};

export default function CenterForDigitalJusticePage() {
  const [services, setServices] = useState<DigitalJusticeService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('digital_justice_services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching digital justice services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading digital justice services...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                Center for Digital Justice
                <span className="block text-lg text-golden font-normal mt-2">(Coming Soon)</span>
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                Building capacity and advancing knowledge at the intersection of technology, law, and human rights across Africa through comprehensive training programs and educational initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Programs
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive training and capacity building programs designed for African contexts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {services.map((service) => {
                  const IconComponent = iconMap[service.icon_name as keyof typeof iconMap] || Shield;
                  return (
                    <div key={service.id} className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                        {service.title}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Be the First to Know
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Get notified when our Center for Digital Justice launches and receive early access to our programs and training opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg" className="group">
                  Join Waitlist
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="hero" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
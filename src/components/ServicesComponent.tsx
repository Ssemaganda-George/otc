import { useState, useEffect } from "react";
import { BookOpen, Users, Shield, Building, TrendingUp, Scale } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  services: string[];
}

const iconMap = {
  BookOpen,
  Users,
  Shield,
  Building,
  TrendingUp,
  Scale
};

const consultancyServices = [
  {
    title: "Research & Development",
    description: "Comprehensive research and analysis including feasibility studies, impact assessments, legislative scrutiny, and expert legal and policy analysis",
    icon: BookOpen,
    services: [
      "Feasibility studies",
      "Impact assessments",
      "Legislative scrutiny",
      "Policy analysis",
      "Market research",
      "Technical documentation"
    ]
  },
  {
    title: "Training & Capacity Building",
    description: "Specialized training programs covering research methodology, academic writing, and tailored courses on contemporary issues",
    icon: Users,
    services: [
      "Research methodology training",
      "Academic writing workshops",
      "Professional development courses",
      "Customized training programs",
      "Online learning modules",
      "Certification programs"
    ]
  },
  {
    title: "Compliance & Legal Services",
    description: "Navigate legal landscapes with audits, documentation, and reporting. Specializing in data protection and privacy compliance",
    icon: Shield,
    services: [
      "Compliance audits",
      "Legal documentation",
      "Privacy assessments",
      "Data protection consulting",
      "Regulatory guidance",
      "Risk management"
    ]
  },
  {
    title: "Corporate & Intellectual Property",
    description: "Comprehensive corporate law services including intellectual property protection, mergers, acquisitions, and business structuring",
    icon: Building,
    services: [
      "IP protection and registration",
      "Corporate structuring",
      "Mergers & acquisitions",
      "Contract drafting and review",
      "Business licensing",
      "Commercial negotiations"
    ]
  },
  {
    title: "Strategic Consulting",
    description: "High-level strategic guidance for organizations navigating the intersection of technology, law, and policy in Africa",
    icon: TrendingUp,
    services: [
      "Digital transformation strategy",
      "Technology policy development",
      "Stakeholder engagement planning",
      "Change management",
      "Innovation strategy",
      "Market entry consulting"
    ]
  },
  {
    title: "Litigation & Advocacy",
    description: "Expert representation in technology-related disputes and advocacy for digital rights and policy reform",
    icon: Scale,
    services: [
      "Strategic litigation",
      "Digital rights advocacy",
      "Policy reform campaigns",
      "Dispute resolution",
      "Regulatory representation",
      "Public interest litigation"
    ]
  }
];

export function ServicesComponent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('our_services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Services
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Professional services designed to support organizations, governments, and communities 
              in navigating Africa's digital transformation landscape.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon_name as keyof typeof iconMap] || BookOpen;
              return (
                <div
                  key={service.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground text-sm mb-3">Services Include:</h4>
                    <ul className="space-y-2">
                      {service.services?.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">
              Need Custom Solutions?
            </h3>
            <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of experts can develop tailored solutions to meet your specific needs. 
              Contact us to discuss how we can support your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-golden">
                Request Consultation
              </button>
              <button className="btn-outline">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

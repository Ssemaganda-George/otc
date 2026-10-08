import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";
import { supabase } from "@/lib/supabase";

interface Innovation {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  website_url: string | null;
}

const fallbackInnovations: Innovation[] = [
  { id: "wazazi-connect", name: "WazaziConnect", description: "A digital platform connecting parents and caregivers with trusted health and development resources.", logo_url: null, website_url: null },
  { id: "happy-farma", name: "HappyFarma", description: "A technology solution supporting farmers with access to information, inputs and markets.", logo_url: null, website_url: null },
];

export default function InnovationHubPage() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);

  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        const { data, error } = await supabase
          .from('innovations')
          .select('id, name, description, logo_url, website_url')
          .eq('is_active', true)
          .order('display_order');
        if (error) {
          console.error('Error fetching innovations:', error);
        } else if (data) {
          setInnovations(data);
        }
      } catch (error) {
        console.error('Error fetching innovations:', error);
      }
    };
    fetchInnovations();
  }, []);

  return (
    <ProductPageLayout
      eyebrow="OTC Innovation Hub"
      title="Connecting African Innovation. Building Sustainable Solutions."
      intro={[
        "The OTC Innovation Hub is a pan-African platform for developing, supporting and scaling innovative solutions to Africa's challenges and opportunities.",
        "The Hub aims to develop, connect, empower, and scale African innovation for sustainable development and inclusive growth. We envision an Africa where home-grown innovation creates sustainable solutions, connects communities and drives inclusive development.",
        "We bring together innovators, entrepreneurs, researchers, technology developers, businesses, investors and institutions to transform ideas into practical, sustainable and scalable solutions.",
        "We believe in an Africa that does not simply consume innovation, but creates, owns and scales solutions for Africa and the world.",
      ]}
      whatWeDo={[
        { title: "IDEATE", description: "We help individuals and organisations identify challenges, explore opportunities and develop innovative ideas." },
        { title: "BUILD", description: "We support innovators to design, prototype, test and refine products, technologies and services." },
        { title: "INCUBATE & ACCELERATE", description: "We provide structured support, mentorship and technical assistance to help promising ideas and ventures move from concept to market." },
        { title: "CONNECT", description: "We connect innovators across Africa with knowledge, talent, markets, investors, institutions and strategic partners." },
        { title: "SCALE", description: "We support promising solutions to expand into new markets, reach more communities and create sustainable impact." },
      ]}
      areasOfFocus={[
        "Health and Wellbeing",
        "Sexual Reproductive Health",
        "Sustainable development",
        "Youth entrepreneurship",
        "Climate and environmental sustainability",
        "Social and community development",
      ]}
      howWeWork={["PROBLEM", "IDEA", "SOLUTION", "ENTERPRISE", "SCALE", "IMPACT"]}
      ctas={[
        { label: "Submit Your Idea", href: "/contact", variant: "golden" },
        { label: "Join the Innovation Hub", href: "/contact" },
        { label: "Partner with Us", href: "/contact" },
      ]}
    >
      {/* Connecting Africa's Innovation Ecosystem */}
      <AOSWrapper animation="fade-up">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">
              Connecting Africa's Innovation Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              OTC builds stronger connections between African innovators, markets, investors, researchers, businesses
              and institutions, enabling ideas, knowledge, technology and opportunities to move across borders.
            </p>
            <h3 className="font-bold text-accent mb-6 uppercase tracking-[0.25em] text-sm">Who We Work With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Innovators", "Entrepreneurs", "Start-ups", "Researchers", "Students", "Technology Developers", "Investors", "Businesses", "Universities", "Governments", "Development Partners"].map((who) => (
                <span key={who} className="border border-primary/30 text-primary text-sm font-semibold px-4 py-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  {who}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AOSWrapper>

      {/* Our Innovations */}
      <AOSWrapper animation="fade-up" delay={50}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-8">Our Innovations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(innovations.length > 0 ? innovations : fallbackInnovations).map((innovation) => (
                <div key={innovation.id} className="bg-white p-8 shadow-md border border-gray-100 hover:shadow-golden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                  {innovation.logo_url ? (
                    innovation.website_url ? (
                      <a href={innovation.website_url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${innovation.name} website`} className="block cursor-pointer">
                        <img src={innovation.logo_url} alt={innovation.name} className="h-16 w-auto object-contain mb-4 mx-auto hover:opacity-80 transition-opacity" />
                      </a>
                    ) : (
                      <img src={innovation.logo_url} alt={innovation.name} className="h-16 w-auto object-contain mb-4 mx-auto" />
                    )
                  ) : null}
                  <h4 className="text-xl font-bold text-primary mb-2">{innovation.name}</h4>
                  <p className="text-base text-muted-foreground">
                    {innovation.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-2xl font-bold text-foreground">
              Have an Idea? Let's build it. Let's connect it. Let's scale it.
            </p>
            <p className="text-muted-foreground mt-3 text-lg">
              Join the OTC Innovation Hub and be part of building sustainable African solutions for Africa and the world.
            </p>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

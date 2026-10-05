import { Link } from "react-router-dom";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";

export default function InnovationHubPage() {
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins mb-6">
              Connecting Africa's Innovation Ecosystem
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              OTC builds stronger connections between African innovators, markets, investors, researchers, businesses
              and institutions, enabling ideas, knowledge, technology and opportunities to move across borders.
            </p>
            <h3 className="font-bold text-primary mb-4 uppercase tracking-wide text-sm">Who We Work With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Innovators", "Entrepreneurs", "Start-ups", "Researchers", "Students", "Technology Developers", "Investors", "Businesses", "Universities", "Governments", "Development Partners"].map((who) => (
                <span key={who} className="border border-primary/30 text-primary text-sm font-semibold px-4 py-2">
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins mb-8">Our Innovations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-foreground mb-2">WazaziConnect</h4>
                <p className="text-sm text-muted-foreground">
                  A digital platform connecting parents and caregivers with trusted health and development resources.
                </p>
              </div>
              <div className="bg-white p-8 shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-foreground mb-2">HappyFarma</h4>
                <p className="text-sm text-muted-foreground">
                  A technology solution supporting farmers with access to information, inputs and markets.
                </p>
              </div>
            </div>
            <p className="mt-10 text-xl font-bold text-foreground">
              Have an Idea? Let's build it. Let's connect it. Let's scale it.
            </p>
            <p className="text-muted-foreground mt-2">
              Join the OTC Innovation Hub and be part of building sustainable African solutions for Africa and the world.
            </p>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

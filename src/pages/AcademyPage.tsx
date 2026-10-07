import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";

export default function AcademyPage() {
  return (
    <ProductPageLayout
      eyebrow="OTC Academy"
      title="Developing People. Building Capabilities. Shaping Africa's Future."
      intro={[
        "OTC Academy is the research, learning and capability-development arm of OTC. It equips individuals, teams and institutions with practical knowledge and skills to innovate, lead, build sustainable enterprises, use technology responsibly and create impact.",
      ]}
      whyWeExist="Africa's ideas and enterprises grow when people have the skills, confidence and opportunities to turn knowledge into action. OTC Academy closes that gap through practical, future-facing research and learning tied to real work, enterprise and innovation. We aim at equipping African individuals and organisations with the evidence, knowledge, skills and capabilities needed to drive innovation, entrepreneurship and sustainable development. We envision an informed, skilled, innovative and empowered Africa equipped to create and shape its own future."
      whatWeDo={[
        { description: "Undertake innovation research to support evidence-based solutions, learning material and policy interventions." },
        { description: "Design and deliver short courses, masterclasses and executive learning." },
        { description: "Run fellowships, leadership programmes and professional development initiatives." },
        { description: "Build organisational capability through tailored training and advisory support." },
        { description: "Develop practical learning pathways linked to OTC research, innovation and enterprise work." },
      ]}
      areasOfFocus={[
        "Innovation and entrepreneurship",
        "Artificial intelligence and emerging technologies",
        "Technology and digital transformation",
        "Business and enterprise development",
        "Leadership and management",
        "Research and innovation",
        "Digital skills",
        "Intellectual property",
        "Data protection, privacy and technology governance",
        "Digital marketing and communications",
        "Investment and financial literacy",
        "Professional and executive education",
        "Fellowships and organisational capacity development",
      ]}
      howWeWork={["RESEARCH", "LEARN", "APPLY", "BUILD", "LEAD", "IMPACT"]}
      ctas={[
        { label: "Explore Our Research Centre", href: "/academy/research-centre", variant: "golden" },
        { label: "Explore Available Trainings", href: "/contact" },
        { label: "Request Organisational Training", href: "/contact" },
      ]}
    >
      {/* Fellowship Portfolio */}
      <AOSWrapper animation="fade-up">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">Our Fellowship Portfolio</h2>
            <p className="text-lg text-muted-foreground">
              Space for current and previous fellowships, testimonials and learning outcomes — coming soon.
            </p>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

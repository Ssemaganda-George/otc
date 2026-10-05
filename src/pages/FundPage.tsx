import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";

export default function FundPage() {
  return (
    <ProductPageLayout
      eyebrow="OTC Fund"
      title="Capital for African Innovation. Protection for African Innovators."
      intro={[
        "OTC Fund is the capital-mobilisation and enterprise-financing arm of OTC. It seeks to connect promising African innovations, enterprises and creative ventures with appropriate forms of capital while promoting fair, transparent and mutually beneficial relationships.",
      ]}
      whyWeExist="Capital is often the difference between a promising idea and a viable enterprise. OTC Fund is designed to strengthen investment readiness, improve access to suitable financing and create responsible pathways between innovators and capital."
      tags={["Direct Funding", "Co-Investing", "Fiscal Hosting", "Sub-Granting", "Investment Readiness", "Capital Mobilisation"]}
      whatWeDo={[
        { description: "Mobilise capital for selected initiatives and ventures." },
        { description: "Provide or facilitate direct funding where appropriate." },
        { description: "Structure co-investment and partnership opportunities." },
        { description: "Support fiscal hosting and sub-granting arrangements." },
        { description: "Prepare ventures for investment and due diligence." },
        { description: "Connect enterprises to investors, grant-makers and financing partners." },
        { description: "Support scale financing and capital strategy." },
      ]}
      areasOfFocus={[
        "Seed and early-stage innovation",
        "Enterprise growth",
        "Impact and sustainable development",
        "Creative industries",
        "Technology and digital ventures",
        "Research-to-market opportunities",
        "Strategic co-investment and blended financing",
      ]}
      howWeWork={["READINESS", "MATCH", "STRUCTURE", "CAPITAL", "GROWTH", "IMPACT"]}
      ctas={[
        { label: "Explore Funding Opportunities", href: "/contact", variant: "golden" },
        { label: "Partner / Invest with OTC", href: "/contact" },
      ]}
    >
      <AOSWrapper animation="fade-up">
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              Funding windows are presented only when operational and legally established. Direct funding, facilitated
              capital and future funding windows are clearly distinguished.
            </p>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

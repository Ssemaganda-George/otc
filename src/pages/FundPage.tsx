import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";
import { PiggyBank, DollarSign, Handshake, Landmark, ClipboardCheck, Network, TrendingUp } from "lucide-react";

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
        { description: "Mobilise capital for selected initiatives and ventures.", icon: <PiggyBank className="w-10 h-10" /> },
        { description: "Provide or facilitate direct funding where appropriate.", icon: <DollarSign className="w-10 h-10" /> },
        { description: "Structure co-investment and partnership opportunities.", icon: <Handshake className="w-10 h-10" /> },
        { description: "Support fiscal hosting and sub-granting arrangements.", icon: <Landmark className="w-10 h-10" /> },
        { description: "Prepare ventures for investment and due diligence.", icon: <ClipboardCheck className="w-10 h-10" /> },
        { description: "Connect enterprises to investors, grant-makers and financing partners.", icon: <Network className="w-10 h-10" /> },
        { description: "Support scale financing and capital strategy.", icon: <TrendingUp className="w-10 h-10" /> },
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

import { Link } from "react-router-dom";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";

const readAndDownloadCategories = [
  "Market and opportunity intelligence",
  "Product and innovation research",
  "Product evaluation and impact",
  "Business and enterprise research",
  "AI, automation and emerging technology",
  "Climate, environment, gender and inclusion",
  "Policy and regulatory research",
  "Monitoring, evaluation and learning",
  "Environmental, social and sustainability assessment",
];

export default function ResearchCentrePage() {
  return (
    <ProductPageLayout
      eyebrow="OTC Academy"
      title="OTC Innovation Research Centre"
      intro={[
        "The OTC Innovation Research Centre is the evidence and intelligence engine of OTC. It studies problems, markets, users, technologies and systems so that decisions, products and investments are grounded in evidence rather than assumption.",
      ]}
      whyWeExist="Good innovation starts with understanding the problem and continues by testing whether a solution works. The Centre produces the research and evaluation needed to identify opportunities, reduce uncertainty, improve products and understand impact."
      whatWeDo={[
        { description: "Conduct market, consumer and opportunity research." },
        { description: "Support product discovery, user research, usability testing and product-market fit." },
        { description: "Undertake feasibility studies, enterprise diagnostics and value-chain analysis." },
        { description: "Evaluate products before launch and after deployment." },
        { description: "Produce policy, regulatory and technology research." },
        { description: "Deliver monitoring, evaluation and learning support." },
        { description: "Undertake environmental, social, sustainability and development impact assessments." },
      ]}
      howWeWork={["RESEARCH", "EVIDENCE", "INNOVATION", "EVALUATION", "IMPROVEMENT", "IMPACT"]}
    >
      <AOSWrapper animation="fade-up">
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins mb-8">Read and Download</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {readAndDownloadCategories.map((category) => (
                <span key={category} className="bg-white border border-gray-200 text-sm font-semibold px-4 py-2 text-foreground">
                  {category}
                </span>
              ))}
            </div>
            <Link
              to="/news/research-publications"
              className="inline-block bg-foreground text-white px-6 py-3 font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Browse Research Publications
            </Link>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

import { ProductPageLayout } from "@/components/ProductPageLayout";

export default function LegalBusinessSupportPage() {
  return (
    <ProductPageLayout
      eyebrow="OTC Legal & Business Protection Centre"
      title="Protecting Innovations. Structuring Opportunity. Enabling Growth."
      intro={[
        "The OTC Legal & Business Protection Centre helps innovators, entrepreneurs, creative professionals and enterprises protect what they create, structure opportunities properly, manage risk and transact with confidence.",
      ]}
      whyWeExist="Innovation creates value only when ownership, relationships, compliance and commercial arrangements are clear. The Centre integrates legal, intellectual-property, regulatory and business protection so that growth is built on a sound foundation."
      whatWeDo={[
        { description: "Advise on intellectual property protection, ownership, licensing and commercialisation." },
        { description: "Support company formation, governance, founder arrangements, partnerships and restructuring." },
        { description: "Provide transaction, due diligence and M&A support." },
        { description: "Advise on tax, licensing, regulatory compliance, data protection and governance." },
        { description: "Draft and review contracts and commercial arrangements." },
        { description: "Support investment transactions and start-up protection." },
        { description: "Protect creative and technology businesses, including software, music, film and digital content." },
      ]}
      areasOfFocus={[
        "Patents, trademarks, copyright, designs and trade secrets",
        "IP strategy, licensing and commercialisation",
        "Corporate structuring and governance",
        "Founder and shareholder arrangements",
        "Mergers, acquisitions and due diligence",
        "Tax and revenue advisory",
        "Regulatory, data-protection and technology compliance",
        "Contracts and commercial transactions",
        "Investment and start-up protection",
        "Creative and technology business protection",
      ]}
      howWeWork={["DISCOVER", "ASSESS", "PROTECT", "STRUCTURE", "COMPLY", "TRANSACT", "GROW"]}
      ctas={[
        { label: "Protect Your Idea", href: "/contact", variant: "golden" },
        { label: "Request Business & Legal Support", href: "/contact" },
      ]}
    />
  );
}

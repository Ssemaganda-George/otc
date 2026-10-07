import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import AOSWrapper from "@/components/AOSWrapper";

const bars = [
  { name: "Campaign Development", href: "/media/campaign-development" },
  { name: "Film & Art", href: "/media/film-and-art" },
  { name: "Digital & Events", href: "/media/digital-and-events" },
];

export default function MediaHubPage() {
  return (
    <ProductPageLayout
      eyebrow="OTC Media Hub"
      title="Creating. Telling. Entertaining. Inspiring."
      intro={[
        "OTC Media is the creative and storytelling ecosystem of OTC. It develops talent and produces music, film, art, drama, digital content and stories that entertain, inform, connect audiences and amplify African creativity.",
      ]}
      whyWeExist="Ideas, talent and innovation need strong stories and creative platforms to travel. OTC Media creates space for African voices, develops creative work and helps creators build audiences, protect value and pursue commercial opportunity."
      whatWeDo={[
        { description: "Produce music, audio, podcasts, video and digital content through OTC Studios." },
        { description: "Develop artists, music and creative partnerships through OTC Records." },
        { description: "Produce films, documentaries, series and short-form audiovisual work through OTC Films." },
        { description: "Support theatre, drama, visual arts, performance and cultural expression." },
        { description: "Create social, web and campaign content through OTC Digital." },
        { description: "Connect creators to business, legal, distribution and commercialisation support." },
      ]}
      areasOfFocus={[
        "Music and audio production",
        "Film and documentary",
        "Podcasts and interviews",
        "Digital content and series",
        "Theatre, drama and visual arts",
        "Artist and creator development",
        "Creative partnerships and campaigns",
        "Distribution, audience growth and commercialization",
      ]}
      howWeWork={["CREATE", "PRODUCE", "CONNECT", "BUILD AUDIENCE", "COMMERCIALISE", "SCALE"]}
      ctas={[
        { label: "Create With OTC", href: "/contact", variant: "golden" },
      ]}
    >
      {/* Three Bars */}
      <AOSWrapper animation="fade-up">
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-10 text-center">Explore OTC Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bars.map((bar) => (
                <Link
                  key={bar.href}
                  to={bar.href}
                  className="group bg-foreground text-white p-10 text-center shadow-lg hover:shadow-golden hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="text-xl font-bold group-hover:text-golden transition-colors">{bar.name}</h4>
                  <ArrowRight className="w-6 h-6 mx-auto mt-4 text-golden opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AOSWrapper>

      {/* How this product connects to OTC */}
      <AOSWrapper animation="fade-up" delay={50}>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">How This Product Connects to OTC</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              OTC Media amplifies research and innovation across the ecosystem, supports creators with Academy
              training, protects their work through the Legal & Business Protection Centre, connects promising
              creative ventures to the Fund and tells the stories of OTC products and impact.
            </p>
          </div>
        </section>
      </AOSWrapper>
    </ProductPageLayout>
  );
}

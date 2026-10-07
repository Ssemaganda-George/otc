import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { ArrowRight } from "lucide-react";

interface WhatWeDoItem {
  title?: string;
  description: string;
}

interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "golden";
}

interface ProductPageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string[];
  whyWeExist?: string;
  tags?: string[];
  whatWeDo?: WhatWeDoItem[];
  areasOfFocus?: string[];
  howWeWork?: string[];
  ctas?: CTA[];
  children?: ReactNode;
}

export function ProductPageLayout({
  eyebrow,
  title,
  intro,
  whyWeExist,
  tags,
  whatWeDo,
  areasOfFocus,
  howWeWork,
  ctas,
  children,
}: ProductPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />
      <main className="pt-6">
        {/* Hero */}
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
              <p className="uppercase tracking-widest text-primary font-bold text-sm mb-4">{eyebrow}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins mb-8 leading-tight">{title}</h1>
              <div className="space-y-6 text-left sm:text-center">
                {intro.map((paragraph, i) => (
                  <p key={i} className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Why We Exist */}
        {whyWeExist && (
          <AOSWrapper animation="fade-up" delay={100}>
            <section className="py-24 bg-gray-50">
              <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins mb-6">Why We Exist</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{whyWeExist}</p>
              </div>
            </section>
          </AOSWrapper>
        )}

        {/* Tags (e.g. funding mechanisms) */}
        {tags && tags.length > 0 && (
          <AOSWrapper animation="fade-up" delay={150}>
            <section className="py-12 bg-white">
              <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="bg-foreground text-white text-sm font-semibold px-4 py-2 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </AOSWrapper>
        )}

        {/* What We Do */}
        {whatWeDo && whatWeDo.length > 0 && (
          <AOSWrapper animation="fade-up" delay={200}>
            <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins mb-10 text-center">What We Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {whatWeDo.map((item, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                      {item.title && <h4 className="font-bold text-primary text-xl mb-3">{item.title}</h4>}
                      <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AOSWrapper>
        )}

        {/* Areas of Focus */}
        {areasOfFocus && areasOfFocus.length > 0 && (
          <AOSWrapper animation="fade-up" delay={250}>
            <section className="py-24 bg-gray-50">
              <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins mb-8">Areas of Focus</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {areasOfFocus.map((area) => (
                    <span key={area} className="border border-primary/30 text-primary text-base font-semibold px-5 py-2.5">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </AOSWrapper>
        )}

        {/* How We Work */}
        {howWeWork && howWeWork.length > 0 && (
          <AOSWrapper animation="fade-up" delay={300}>
            <section className="py-24 bg-primary text-white">
              <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-8">How We Work</h2>
                <div className="flex flex-wrap items-center justify-center gap-3 text-base md:text-lg font-bold uppercase tracking-wide">
                  {howWeWork.map((step, i) => (
                    <span key={step} className="flex items-center gap-3">
                      {step}
                      {i < howWeWork.length - 1 && <ArrowRight className="w-4 h-4" />}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </AOSWrapper>
        )}

        {/* Custom extra content per product */}
        {children}

        {/* CTAs */}
        {ctas && ctas.length > 0 && (
          <AOSWrapper animation="fade-up" delay={350}>
            <section className="py-24 bg-gray-50">
              <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4">
                {ctas.map((cta) => (
                  <Link
                    key={cta.href + cta.label}
                    to={cta.href}
                    className={`inline-flex items-center px-8 py-4 text-base font-bold uppercase tracking-wide rounded-full transition-opacity hover:opacity-90 ${
                      cta.variant === "golden" ? "bg-primary text-white" : "bg-foreground text-white"
                    }`}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </section>
          </AOSWrapper>
        )}
      </main>
      <Footer />
    </div>
  );
}

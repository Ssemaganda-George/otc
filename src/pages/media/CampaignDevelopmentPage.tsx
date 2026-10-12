import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { Link } from "react-router-dom";
import { ArrowRight, Users, GraduationCap, Video, Clock, Sparkles, Film, Calendar } from "lucide-react";

export default function CampaignDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />

      <main className="pt-6">
        {/* Hero */}
        <AOSWrapper animation="fade-up">
          <section className="py-20 bg-gradient-to-br from-primary/10 via-accent-subtle to-primary/5">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
              <p className="uppercase tracking-[0.25em] text-primary font-bold text-sm mb-5">OTC Media Hub</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins mb-6 leading-tight">
                Campaign Development
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We design and run creative campaigns that use art, digital media and storytelling to
                drive awareness, engagement and real impact across Africa.
              </p>
            </div>
          </section>
        </AOSWrapper>

        {/* Featured Campaign */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">Featured Campaign</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-4">
                  Data Justice Champions Campaign
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-10">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We partnered with <strong className="text-foreground">ADIJUST</strong>, designed and ran the
                    Data Justice Champions Campaign which sought to use art and digital media to enhance
                    responsible personal data handling among young Ugandans, with a focus on youth.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    We designed the campaign strategy that involved recruitment and scrutinisation of content
                    creators, and a TikTok challenge.
                  </p>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-accent-light rounded-xl p-6 text-center border border-primary/10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-black text-primary mb-1">200K+</p>
                      <p className="text-sm text-muted-foreground font-medium">Youths engaged on TikTok and social media</p>
                    </div>

                    <div className="bg-accent-light rounded-xl p-6 text-center border border-primary/10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-black text-primary mb-1">30+</p>
                      <p className="text-sm text-muted-foreground font-medium">Youths skilled on digital health rights in Katanga slum</p>
                    </div>

                    <div className="bg-accent-light rounded-xl p-6 text-center border border-primary/10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                        <Video className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-black text-primary mb-1">10+</p>
                      <p className="text-sm text-muted-foreground font-medium">TikTokers & content creators recruited and capacitated</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground italic border-t border-gray-100 pt-6">
                    This project was supported by ADIJUST in partnership with the University of Warwick and
                    the Personal Data Protection Office, with generous support from the Wellcome Trust.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Coming Soon */}
        <AOSWrapper animation="fade-up" delay={150}>
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">More Campaigns</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
                  Coming Soon
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Film & Art */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-golden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Film className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-poppins mb-3">Film & Art</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Compelling films, documentaries and visual art that tell African stories and amplify
                    creative expression.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </span>
                </div>

                {/* Digital & Events */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-golden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-poppins mb-3">Digital & Events</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Interactive digital experiences, virtual events and online campaigns that connect
                    audiences across the continent.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* CTA */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-white">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-4">
                Have a campaign in mind?
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                Let's build it together. We turn ideas into movements that move people.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-primary px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-golden-light hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Create With OTC <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/media"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Explore OTC Media
                </Link>
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>

      <Footer />
    </div>
  );
}

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsUpdatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                News & Updates
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                Stay informed about OTC's latest developments, research findings, advocacy wins, 
                and insights on technology, human rights, and digital transformation across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* News & Updates Articles Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Article Card - PASTE YOUR ARTICLE CONTENT HERE */}
              <article className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-card mb-8">
                {/* Article Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      November 25, 2025
                    </span>
                    <span>•</span>
                    <span>6 min read</span>
                  </div>
                  
                  <h3 className="text-3xl font-playfair font-bold text-gradient-blue mb-4">
                    Google LLC Withdraws Appeal in Landmark Ugandan Data Protection Case
                  </h3>
                  
                  <p className="text-lg text-muted-foreground italic">
                    A major breakthrough in digital rights and data protection enforcement as Google agrees to comply with Uganda's Data Protection and Privacy Act
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    OneTechConnect (OTC) announces a major breakthrough in digital rights and data protection enforcement following the withdrawal of Google LLC's appeal in the case of Ssekamwa Frank & 3 Others v. Google LLC, Complaint No. 08/11/24/6683. The withdrawal signifies Google's agreement to comply with Uganda's Data Protection and Privacy Act (DPPA), Cap 97, a landmark moment for Big Tech accountability in Africa.
                  </p>

                  <h4 className="text-2xl font-playfair font-semibold text-foreground mt-8 mb-4">
                    Introduction
                  </h4>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    In the original decision, the Personal Data Protection Office (PDPO), Uganda's Data Protection Authority ruled that Google LLC must (a) Register with the PDPO in Uganda; (b) Appoint a Data Protection Officer (DPO) based in Uganda; and (c) Demonstrate compliance with cross-border personal data transfer regulations applicable to Ugandan users.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Following a strong defence by the complainants and subsequent engagements with the Minister of ICT and National Guidance and the PDPO, Google formally notified authorities of its decision to withdraw the appeal and commence compliance steps.
                  </p>

                  <h4 className="text-2xl font-playfair font-semibold text-foreground mt-8 mb-4">
                    Background
                  </h4>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    On 8th November 2024, four Ugandan complainants Ssekamwa Frank, Leni Sharon Pamela, Amumpaire Raymond and Awino Mercy filed a complaint before the PDPO challenging Google's non compliance with the DPPA including failure to register with the PDPO and conducting cross-border data transfers without PDPO approval.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Google initially argued that it had no obligation to comply because it is not physically based in Uganda. The PDPO rejected this position and issued binding compliance directives. Google later appealed to the Minister of ICT and National Guidance. The complainants filed a detailed response, contesting Google's claims and defending Uganda's sovereign data protection standards.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    After a meeting chaired by the Minister and attended by PDPO officials and Google representatives, the tech giant formally withdrew its appeal on 5th November 2025 and committed to implement the PDPO's orders.
                  </p>

                  <h4 className="text-2xl font-playfair font-semibold text-foreground mt-8 mb-4">
                    Significance of the Withdrawal
                  </h4>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Google's withdrawal has far-reaching implications for Uganda and the African region:
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    1. The PDPO's ruling remains fully enforceable.<br />
                    2. Any company collecting or processing data belonging to Ugandans whether local or foreign must comply with Uganda's DPPA.<br />
                    3. All data collectors, controllers and processors operating in relation to Uganda must register with the PDPO.<br />
                    4. Companies conducting cross-border data transfers must meet Ugandan legal standards and demonstrate adequate safeguards.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This marks one of the strongest assertions of African data sovereignty, setting a precedent for holding multinational technology companies accountable under national law.
                  </p>

                  <h4 className="text-2xl font-playfair font-semibold text-foreground mt-8 mb-4">
                    About OneTechConnect
                  </h4>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    OneTechConnect (OTC) is a youth-led civil society organization advancing digital justice in Africa through research, advocacy, training, innovation, and strategic litigation. OTC focuses on critical domains including digital health, agri-tech, fintech, and development technologies.
                  </p>

                  <p className="text-muted-foreground leading-relaxed italic mb-6">
                    "This case affirms that the digital rights of Ugandan users cannot be ignored — regardless of where a company is headquartered. The withdrawal of the appeal is a win for digital justice, user dignity and national regulatory authority."
                  </p>
                </div>

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Data Protection</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Strategic Litigation</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Digital Rights</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Uganda</span>
                  </div>
                </div>
              </article>
              {/* End of Article Card */}
            </div>
          </div>
        </section>

        {/* More News Coming */}
        <section className="py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gradient-blue mb-6 text-center">
                  More News Coming Soon
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Research Publications & Findings",
                    "Strategic Litigation Updates",
                    "Partnership Announcements",
                    "Policy & Advocacy Wins",
                    "Event Coverage & Reports",
                    "Thought Leadership Articles"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-base text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary/20 text-center">
                  <p className="text-muted-foreground mb-6">
                    Want to stay updated on our latest developments?
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/newsletter">
                      <Button variant="golden" className="group">
                        Subscribe to Newsletter
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    
                    <Button variant="ghost-golden" className="group">
                      Follow @OneTechConnect
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Stay Connected
              </h2>
              <p className="text-body text-muted-foreground mb-8">
                Be the first to know about our latest research, advocacy wins, and insights on 
                technology and human rights in Africa.
              </p>
              
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="golden" className="group">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to receive updates from OneTechConnect. 
                  We respect your privacy and you can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

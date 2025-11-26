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
              {/* Article Card */}
              <article className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-card mb-8">
                {/* Article Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      November 25, 2025
                    </span>
                    <span>•</span>
                    <span>PDF Document</span>
                  </div>
                  
                  <h3 className="text-3xl font-playfair font-bold text-gradient-blue mb-4">
                    Google LLC Withdraws Appeal in Landmark Ugandan Data Protection Case
                  </h3>
                  
                  <p className="text-lg text-muted-foreground italic">
                    A major breakthrough in digital rights and data protection enforcement as Google agrees to comply with Uganda's Data Protection and Privacy Act
                  </p>
                </div>

                {/* Download PDF Section */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                  <h4 className="text-xl font-semibold text-primary mb-3">Download Full Article</h4>
                  <p className="text-base text-muted-foreground mb-6">
                    Get the complete article in PDF format for offline reading or sharing.
                  </p>
                  <Button variant="outline" size="lg" className="group" asChild>
                    <a href="/documents/Google-Press-Release.pdf" download>
                      <Newspaper className="w-5 h-5 mr-3" />
                      <span>Download PDF</span>
                    </a>
                  </Button>
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

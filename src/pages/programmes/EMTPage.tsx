import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Users, Target, BookOpen, Shield, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EMTPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                EmpowerThem (EMT)
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Ensuring digital transformation empowers vulnerable populations including children, youth, women and marginalized communities
              </p>
            </div>
          </div>
        </section>

        {/* Programme Overview */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  About the Programme
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed mb-6">
                  EmpowerThem focuses on the intersection of technology and vulnerable groups including children, youth women and marginalized communities in the areas of health, finance, agriculture, and development.
                </p>
              </div>

              {/* Goal */}
              <div className="bg-gradient-to-br from-golden/10 to-golden/5 border border-golden/20 rounded-2xl p-8 shadow-card mb-16">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-golden" />
                  <h2 className="text-2xl font-playfair font-bold text-golden">
                    Goal
                  </h2>
                </div>
                <p className="text-body text-foreground leading-relaxed">
                  To ensure that digital transformation empowers, rather than excludes, Africa's most vulnerable populations.
                </p>
              </div>

              {/* Objectives */}
              <div className="mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-8 text-center">
                  Objectives
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      icon: BookOpen,
                      title: "Build Digital Literacy",
                      description: "Build digital literacy and rights awareness among young people and vulnerable communities."
                    },
                    {
                      icon: Shield,
                      title: "Strengthen Access",
                      description: "Strengthen access to safe and inclusive technologies."
                    },
                    {
                      icon: Users,
                      title: "Amplify Voices",
                      description: "Amplify voices of underrepresented groups in shaping digital futures."
                    }
                  ].map((objective, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-blue transition-all duration-300 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <objective.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-2">
                          {objective.title}
                        </h3>
                        <p className="text-body text-muted-foreground leading-relaxed">
                          {objective.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="bg-secondary/20 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Expected Outcomes
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Empowered communities with greater agency in digital spaces; reduced inequalities in tech access; stronger protections for vulnerable groups.
                </p>
              </div>

              {/* Outputs & Activities */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Outputs & Activities
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Training programmes, digital rights toolkits, mentorship, advocacy campaigns, and community-driven innovation projects.
                </p>
              </div>

              {/* Target Groups */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6 text-center">
                  Who We Serve
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Children",
                    "Youth",
                    "Women",
                    "Marginalized Communities"
                  ].map((group, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-background/50 rounded-lg p-4">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-body text-foreground font-medium">{group}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div className="bg-gradient-to-br from-golden/5 to-golden/10 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6 text-center">
                  Focus Sectors
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Health",
                    "Finance",
                    "Agriculture",
                    "Development"
                  ].map((sector, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-body text-foreground font-medium">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Empower Communities
                </h2>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Help us ensure that digital transformation empowers Africa's most vulnerable populations - creating greater agency, reducing inequalities, and building stronger protections
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button variant="golden" size="lg" className="group">
                    Partner With Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="hero" size="lg">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
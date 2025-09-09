import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Lightbulb, Smartphone, Music, Users, Shield, Heart, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InnovationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                Innovations
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                Through our innovation hub, we transform dreams and vision into reality. We offer expert services 
                in website and mobile app design, coding, development and full-scale rollout.
              </p>
            </div>
          </div>
        </section>

        {/* Innovation Services */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Innovation Services
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive digital solutions from concept to deployment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                  {
                    icon: Smartphone,
                    title: "Mobile App Development",
                    description: "Native and cross-platform mobile applications"
                  },
                  {
                    icon: Lightbulb,
                    title: "Website Design & Development",
                    description: "Responsive and user-friendly web solutions"
                  },
                  {
                    icon: Users,
                    title: "Full-Scale Rollout",
                    description: "Complete deployment and launch strategies"
                  },
                  {
                    icon: Shield,
                    title: "Technical Coding",
                    description: "Expert programming and development services"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-blue transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Innovations */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Groundbreaking Innovations
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Discover our flagship products that are transforming lives across Africa
                </p>
              </div>

              <div className="space-y-12">
                {/* WazaziConnect */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <Heart className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-playfair font-semibold text-gradient-blue">
                          WazaziConnect
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        WazaziConnect (Swahili for Parents) is our flagship initiative designed to provide an affordable 
                        pathway for Africans who wish to become parents. The platform connects intending parents with 
                        surrogate mothers, donors and service providers creating opportunities for family building in a 
                        safe, ethical, and supportive environment.
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Guided by principles of:</h4>
                        <div className="space-y-2">
                          {["Privacy & Confidentiality", "Gender Equity & Inclusivity", "Human Rights and Ethical Standards"].map((principle, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm text-muted-foreground">{principle}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-8">
                        With WazaziConnect, we envision a future where technology helps people overcome barriers to 
                        parenthood while safeguarding dignity, rights, and justice.
                      </p>

                      <div className="flex space-x-4">
                        <Button variant="golden" size="sm" className="group">
                          Download App
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="ghost-golden" size="sm" className="group">
                          Visit Website
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 lg:p-12 flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                        <Heart className="w-24 h-24 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTC Records */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="bg-gradient-to-br from-golden/10 to-golden/5 p-8 lg:p-12 flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-golden/20 to-golden/10 rounded-2xl flex items-center justify-center">
                        <Music className="w-24 h-24 text-golden" />
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-golden/20 to-golden/10 rounded-lg flex items-center justify-center mr-4">
                          <Music className="w-6 h-6 text-golden" />
                        </div>
                        <h3 className="text-2xl font-playfair font-semibold text-gradient-blue">
                          OTC Records
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Discover innovation fused with African culture. OTC Records promotes and preserves African 
                        talent and culture through music, art, and design.
                      </p>

                      <div className="mb-8">
                        <h4 className="font-semibold text-foreground mb-3">Our services include:</h4>
                        <div className="space-y-2">
                          {[
                            "Sound and video recording",
                            "Content creation (songwriting, playwriting)",
                            "Full event planning and management"
                          ].map((service, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-golden rounded-full" />
                              <span className="text-sm text-muted-foreground">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button variant="golden" size="sm" className="group">
                        Explore OTC Records
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button variant="hero" size="lg" className="group">
                  Explore All Innovations
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

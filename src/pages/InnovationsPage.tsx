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
                Innovation Hub
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                Driving technological innovation and digital transformation across Africa through hackathons, 
                funding opportunities, data solutions, and our innovation sandbox.
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
                  Innovation Hub Initiatives
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Fostering innovation and supporting tech entrepreneurs across Africa
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    icon: Users,
                    title: "Hackathons",
                    description: "Bringing together innovators to solve Africa's most pressing challenges through collaborative tech events. (Coming Soon)"
                  },
                  {
                    icon: Lightbulb,
                    title: "OTC Innovation Fund",
                    description: "Supporting groundbreaking tech solutions with funding and mentorship for African entrepreneurs. (Coming Soon)"
                  },
                  {
                    icon: Shield,
                    title: "Data",
                    description: "Providing data solutions and analytics for rights-based decision making and innovation. (Coming Soon)"
                  },
                  {
                    icon: Smartphone,
                    title: "OTC Sandbox",
                    description: "A safe environment for testing and developing innovative tech solutions before full deployment. (Coming Soon)"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                      {service.title}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products - Coming Soon */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card border border-border rounded-2xl p-12 shadow-card">
                <div className="w-20 h-20 bg-gradient-to-br from-golden/20 to-golden/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-10 h-10 text-golden" />
                </div>
                <h2 className="heading-section text-gradient-blue mb-6">
                  Featured Products
                </h2>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                  We're developing innovative solutions including WazaziConnect and OTC Records. 
                  Stay tuned for exciting launches that will transform African tech and culture.
                </p>
                <div className="inline-block bg-golden/10 border border-golden/30 rounded-full px-6 py-3">
                  <span className="text-golden font-semibold">Coming Soon</span>
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

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Brain, Target, Search, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiNowPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                AfricanIntelligenceNow (AiNow)
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Exploring the rapid evolution of Artificial Intelligence in Africa with a focus on rights, inclusion, and African realities
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
                  AiNow explores the rapid evolution of Artificial Intelligence in Africa, focusing on its application in the critical areas of health, agriculture, finance and development. We are dedicated to ensuring that the development and deployment of AI not only respects the fundamental rights of African people but also aligns with their social values and norms. Our program examines how AI can be based on or can effectively understand and interact with African intelligence and data. The "Now" in our name underscores the urgency of acting in the present to shape a future where AI serves as a force for good.
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
                  To promote AI solutions that are rights-respecting, inclusive, and responsive to Africa's realities.
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
                      icon: Search,
                      title: "Examine Opportunities & Risks",
                      description: "Examine the opportunities and risks of AI for African societies."
                    },
                    {
                      icon: BookOpen,
                      title: "Support Research",
                      description: "Support research on AI built on African data and contexts."
                    },
                    {
                      icon: Users,
                      title: "Advocate for Rights-Based AI",
                      description: "Advocate for AI that can effectively understand, serve, and interact with African citizens."
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
                  Increased awareness and capacity on AI and rights; stronger regional dialogue on AI ethics; practical models for rights-based AI.
                </p>
              </div>

              {/* Outputs & Activities */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Outputs & Activities
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Policy briefs, research reports, expert dialogues, and community engagement platforms.
                </p>
              </div>

              {/* Key Focus Areas */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6 text-center">
                  Critical Application Areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Health",
                    "Agriculture",
                    "Finance",
                    "Development"
                  ].map((area, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-background/50 rounded-lg p-4">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-body text-foreground font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Join the Movement
                </h2>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Help shape a future where AI serves as a force for good in Africa - acting now to ensure rights-respecting, inclusive AI solutions
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
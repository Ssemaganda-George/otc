import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Heart, Target, Users, Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TSGPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                Tech & SRHR Governance (TSG)
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Examining complex governance challenges at the intersection of technology and sexual and reproductive health and rights in Africa
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
                  The Tech & SRHR Governance (TSG) programme examines the complex governance challenges at the intersection of technology, digitalization, and sexual and reproductive health and rights (SRHR) in Africa. It explores both the opportunities and risks that emerging technologies bring to the SRHR landscape ranging from improved access to health information and services, to threats such as privacy violations, data misuse, and exclusion of vulnerable groups.
                </p>
              </div>

              {/* Goal */}
              <div className="bg-gradient-to-br from-golden/10 to-golden/5 border border-golden/20 rounded-2xl p-8 shadow-card mb-16">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-golden" />
                  <h2 className="text-2xl font-playfair font-bold text-golden">
                    Our Goal
                  </h2>
                </div>
                <p className="text-body text-foreground leading-relaxed">
                  Through TSG, we aim to ensure that digital transformation in Africa strengthens, rather than undermines, sexual and reproductive health and rights advancing dignity, equity, and justice for all.
                </p>
              </div>

              {/* Strategic Objectives */}
              <div className="mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-8 text-center">
                  TSG is anchored in four strategic objectives:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: BookOpen,
                      title: "Research & Development",
                      description: "Research & Development aimed at generating evidence on how technology impacts SRHR policies, access, and accountability."
                    },
                    {
                      icon: Users,
                      title: "Advocacy & Movement Building",
                      description: "Advocacy & Movement Building to influence policy reforms and building coalitions to promote rights-based digital governance in SRHR."
                    },
                    {
                      icon: Target,
                      title: "Training & Skillset Development",
                      description: "Training & Skillset Development to equip stakeholders with knowledge and skills to navigate the digital-SRHR interface responsibly."
                    },
                    {
                      icon: Lightbulb,
                      title: "Innovation",
                      description: "Innovation aimed at supporting the design and deployment of inclusive, ethical, and rights-respecting digital solutions for SRHR."
                    }
                  ].map((objective, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-blue transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <objective.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                        {objective.title}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Focus Areas */}
              <div className="bg-secondary/20 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6 text-center">
                  Key Focus Areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Health Information Access",
                    "Privacy Protection",
                    "Data Governance",
                    "Digital SRHR Services",
                    "Rights-Based Technologies",
                    "Inclusive Digital Solutions"
                  ].map((area, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-body text-muted-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Get Involved
                </h2>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Join us in ensuring that digital transformation strengthens sexual and reproductive health and rights across Africa
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
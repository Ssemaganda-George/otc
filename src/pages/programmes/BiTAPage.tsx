import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Shield, Target, Search, Users, BookOpen, Gavel, ArrowRight, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BiTAPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                BigTech Africa (BiTA)
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Holding technology actors accountable while promoting innovation that respects rights and justice across Africa
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
                  BiTA examines the role and impact of big tech, small and medium tech companies, and governments operating across health, agriculture, finance, and development sectors. We explore how their operations intersect with fundamental rights such as the right to health, privacy, expression, property, a decent environment and development.
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
                  To hold technology & innovation actors accountable while promoting innovation that respects rights and justice.
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
                      title: "Analyse Tech Business Models",
                      description: "Analyse how tech business models affect rights in Africa."
                    },
                    {
                      icon: Shield,
                      title: "Strengthen Regulatory Responses",
                      description: "Strengthen regulatory responses to the risks of digital monopolies."
                    },
                    {
                      icon: Users,
                      title: "Build Public Awareness",
                      description: "Build public awareness on the implications of tech practices for human rights."
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

              {/* Strategic Litigation Highlight */}
              <div className="bg-gradient-to-br from-golden/10 to-golden/5 border border-golden/20 rounded-2xl p-8 shadow-card mb-16">
                <div className="flex items-center space-x-3 mb-4">
                  <Gavel className="w-6 h-6 text-golden" />
                  <h2 className="text-2xl font-playfair font-bold text-golden">
                    Ssekamwa Frank & 3 Others v Google LLC
                  </h2>
                </div>
                <p className="text-body text-foreground leading-relaxed mb-6">
                  This strategic interest litigation led to a landmark decision where the Personal Data Protection Office (PDPO) in Uganda found Google in breach of the country's data laws. The ruling ordered Google to register within 30 days and comply with Uganda's data protection regulations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="https://www.newvision.co.ug/category/news/google-declared-in-breach-of-ugandas-data-pro-NV_214858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-golden hover:text-golden/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Read: New Vision Article</span>
                  </a>
                  <a 
                    href="https://www.business-humanrights.org/es/latest-news/uganda-data-protection-office-rules-against-google-for-privacy-violations-ordering-registration-within-30-days/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-golden hover:text-golden/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Read: Business & Human Rights</span>
                  </a>
                </div>
              </div>

              {/* Library Section */}
              <div className="mb-16">
                <div className="flex items-center space-x-3 mb-8">
                  <BookOpen className="w-7 h-7 text-primary" />
                  <h2 className="text-2xl font-playfair font-bold text-gradient-blue">
                    BiTA Library & Resources
                  </h2>
                </div>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                  Access landmark case documents, research papers, policy documents, and resources on tech accountability, data protection, and digital health in Africa.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Data Protection and Privacy Act */}
                  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-blue">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-primary">
                        Data Protection and Privacy Act 2019
                      </CardTitle>
                      <CardDescription>
                        Uganda's comprehensive data protection legislation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        The Data Protection and Privacy Act, 2019 provides for the protection of personal data and privacy of individuals, regulates data processing, and establishes the Personal Data Protection Office.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Data-Protection-and-Privacy-Act-2019-Uganda (1).pdf" target="_blank" rel="noopener noreferrer">
                            <span>View Document</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Data-Protection-and-Privacy-Act-2019-Uganda (1).pdf" download>
                            <span>Download PDF</span>
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Digital Health Strategic Plan */}
                  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-blue">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-primary">
                        Digital Health Strategic Plan 2025
                      </CardTitle>
                      <CardDescription>
                        Health Information & Digital Health framework
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Strategic plan outlining Uganda's approach to digital health implementation, health information systems, and the integration of technology in healthcare delivery.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Health-Information-Digital-Health-Strategic-Plan-2025 (1).pdf" target="_blank" rel="noopener noreferrer">
                            <span>View Document</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Health-Information-Digital-Health-Strategic-Plan-2025 (1).pdf" download>
                            <span>Download PDF</span>
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Digital Health Guidelines Compendium */}
                  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-blue">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-primary">
                        Digital Health Guidelines Compendium
                      </CardTitle>
                      <CardDescription>
                        Approved guidelines for digital health implementation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Comprehensive compendium of approved digital health guidelines covering standards, protocols, and best practices for digital health solutions in Uganda.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Compendium-of-Approved-Digital-Health-Guidelines-Combined (2).pdf" target="_blank" rel="noopener noreferrer">
                            <span>View Document</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Compendium-of-Approved-Digital-Health-Guidelines-Combined (2).pdf" download>
                            <span>Download PDF</span>
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ministry Circular - MDA Registration */}
                  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-blue">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-primary">
                        Ministry Circular - MDA Registration
                      </CardTitle>
                      <CardDescription>
                        ICT & National Guidance notification requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Official circular from the Ministry of ICT and National Guidance outlining notification requirements for Ministries, Departments, and Agencies (MDAs) to register.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Ministry of ICT and National Guidance  Circular &#8211_ Notification of requirement to register MDAs.pdf" target="_blank" rel="noopener noreferrer">
                            <span>View Document</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-between group" asChild>
                          <a href="/documents/Ministry of ICT and National Guidance  Circular &#8211_ Notification of requirement to register MDAs.pdf" download>
                            <span>Download PDF</span>
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Google Case Reference */}
                <div className="mt-8 bg-gradient-to-br from-golden/10 to-golden/5 border border-golden/20 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gavel className="w-6 h-6 text-golden" />
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-semibold text-golden mb-2">
                        Landmark Case: Ssekamwa Frank & 3 Others v Google LLC
                      </h3>
                      <p className="text-sm text-foreground mb-4">
                        The Personal Data Protection Office (PDPO) in Uganda found Google in breach of the country's data protection laws, 
                        ordering the company to register and comply with local regulations within 30 days.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="group" asChild>
                          <a 
                            href="https://www.newvision.co.ug/category/news/google-declared-in-breach-of-ugandas-data-pro-NV_214858"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            <span>New Vision Article</span>
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="group" asChild>
                          <a 
                            href="https://www.business-humanrights.org/es/latest-news/uganda-data-protection-office-rules-against-google-for-privacy-violations-ordering-registration-within-30-days/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            <span>Business & Human Rights</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="bg-secondary/20 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Expected Outcomes
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Improved accountability of tech companies; stronger legal and policy frameworks; informed citizens able to demand rights-based digital governance.
                </p>
              </div>

              {/* Outputs & Activities */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">
                  Outputs & Activities
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Research studies, public dialogues, strategic litigation, and multi-stakeholder advocacy platforms.
                </p>
              </div>

              {/* Key Focus Areas */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6 text-center">
                  Rights & Sectors We Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Right to Health",
                    "Right to Privacy",
                    "Right to Expression",
                    "Right to Property",
                    "Right to Decent Environment",
                    "Right to Development"
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
                  Support Accountability
                </h2>
                <p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Join us in holding tech companies accountable and building stronger frameworks for rights-based digital governance
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
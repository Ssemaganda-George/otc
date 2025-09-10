import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { BookOpen, Users, Shield, Building, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultancyServices = [
  {
    icon: BookOpen,
    title: "Research & Development",
    description: "We provide comprehensive research and analysis to inform your strategy, including feasibility studies, impact assessments, legislative and post-legislative scrutiny, and expert legal and policy analysis. Our team is skilled in both qualitative and quantitative research from data collection and analysis to synthesis.",
    features: [
      "Feasibility studies",
      "Impact assessments", 
      "Legislative scrutiny",
      "Expert legal and policy analysis"
    ]
  },
  {
    icon: Users,
    title: "Training & Capacity Building",
    description: "We empower your team through specialized training. Our programs cover research methodology, academic writing, and publishing, in addition to tailored short courses and masterclasses on contemporary issues in our key sectors.",
    features: [
      "Research methodology training",
      "Academic writing and publishing",
      "Tailored short courses",
      "Masterclasses on contemporary issues"
    ]
  },
  {
    icon: Shield,
    title: "Compliance & Legal Services",
    description: "We help you navigate the legal and regulatory landscape with services that include audits, documentation, and reporting. We specialize in data protection and privacy, offering services as a Data Protection Officer and providing legal advice on regulatory compliance.",
    features: [
      "Legal audits and documentation",
      "Data Protection Officer services",
      "Privacy compliance",
      "Regulatory compliance advice"
    ]
  },
  {
    icon: Building,
    title: "Corporate & Intellectual Property",
    description: "We assist with all aspects of corporate formation and compliance, including company registration and secretarial services. We also help you protect your innovations by registering and safeguarding Intellectual Property (IP) rights for tech in health, agriculture, finance, and development.",
    features: [
      "Company registration",
      "Corporate secretarial services",
      "IP rights registration",
      "Innovation protection"
    ]
  },
  {
    icon: TrendingUp,
    title: "Mergers, Acquisitions & Insolvency",
    description: "Our experts guide African startups in HealthTech, AgriTech, FinTech, and development through the complexities of mergers and acquisitions to help them scale and remain sustainable. We also have experienced practitioners who can facilitate a legal and safe business transformation or closure.",
    features: [
      "M&A guidance for startups",
      "Scaling strategies",
      "Business transformation",
      "Legal closure processes"
    ]
  },
  {
    icon: DollarSign,
    title: "Organizational Strategy & Business Finance",
    description: "We offer advice on the most appropriate business vehicles for new and existing entities, provide fiscal hosting, and manage project funds. Our team includes professional fundraising experts who can help you secure the grants and funding necessary to sustain your projects.",
    features: [
      "Business vehicle selection",
      "Fiscal hosting",
      "Project fund management",
      "Grant and funding support"
    ]
  }
];

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                Consultancy Services
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                We offer a range of expert consultancy services designed to support innovation and growth across Africa, 
                available with flexible payment options, including legal tender, equity, partnerships, co-investment, 
                and other in-kind arrangements.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-playfair font-semibold text-gradient-blue mb-8">
                Flexible Payment Options
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  "Legal Tender",
                  "Equity",
                  "Partnerships", 
                  "Co-investment",
                  "In-kind Arrangements"
                ].map((option, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-4 shadow-card">
                    <span className="text-sm font-medium text-primary">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Consultancy Services
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive expertise across all aspects of technology, innovation, and business development
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {consultancyServices.map((service, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                          {service.title}
                        </h3>
                        <p className="text-body text-muted-foreground leading-relaxed mb-4">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-22">
                      <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Contact us today to discuss how our consultancy services can support your organization's 
                growth and innovation objectives across Africa.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg">
                  Start Consultation
                </Button>
                <Button variant="hero" size="lg">
                  Learn More
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

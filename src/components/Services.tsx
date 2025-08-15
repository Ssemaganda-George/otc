import { Trophy, Scale, BookOpen, Megaphone, Users, Shield, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Trophy,
    title: "Hackathon Program",
    description: "Supporting innovations that propel the wellbeing of people living on the continent.",
    features: [
      "Financial support for developers and startups",
      "Legal guidance and intellectual property protection",
      "Technical mentorship and development support",
      "Focus on digital health, fintech, AgriTech, education and transport"
    ],
    benefits: ["Up to $50,000 funding", "6-month mentorship", "Legal protection", "Market access"],
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: Scale,
    title: "Legal & Regulatory Support",
    description: "Comprehensive legal guidance for tech companies navigating Africa's regulatory landscape.",
    features: [
      "Regulatory compliance assessment and guidance",
      "Intellectual property protection and licensing",
      "Data protection and privacy law compliance",
      "Contract drafting and technology agreements"
    ],
    benefits: ["Expert legal team", "Regulatory compliance", "IP protection", "Risk mitigation"],
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    icon: BookOpen,
    title: "Research & Training",
    description: "Cutting-edge research and professional development in technology law and policy.",
    features: [
      "Technology law research and policy development",
      "Professional training and certification programs",
      "Industry reports and white papers",
      "Capacity building for legal professionals"
    ],
    benefits: ["Industry insights", "Professional certification", "Skill development", "Knowledge access"],
    color: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-500/30"
  },
  {
    icon: Megaphone,
    title: "Strategic Advocacy",
    description: "Influencing policy and regulatory frameworks to support innovation and human rights.",
    features: [
      "Policy advocacy and regulatory reform initiatives",
      "Stakeholder engagement and public consultation",
      "Rights-based approach to technology governance",
      "International cooperation and best practice sharing"
    ],
    benefits: ["Policy influence", "Stakeholder access", "Rights protection", "Global network"],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30"
  }
];

const highlights = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Access to experienced tech lawyers and industry specialists"
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Support",
    description: "End-to-end solutions for your tech venture"
  },
  {
    icon: Shield,
    title: "Protection & Compliance",
    description: "Ensuring your innovation is legally protected"
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "Rigorous standards in all our services"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Services
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto text-justify sm:text-center">
              Comprehensive support for tech innovation and legal compliance across Africa. 
              We provide the expertise and resources you need to succeed in the digital economy.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`group bg-card border ${service.borderColor} rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-500 card-hover`}
              >
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.benefits.map((benefit, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Highlights */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20 mb-16">
            <div className="text-center mb-8">
              <h3 className="heading-card text-gradient-blue mb-4">
                Why Choose OTC?
              </h3>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Our unique combination of legal expertise, technological understanding, and African context 
                makes us the ideal partner for your innovation journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <div key={highlight.title} className="text-center group">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="heading-card text-gradient-blue mb-6">
              Get Started With Our Services
            </h3>
            <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to take your tech innovation to the next level? Contact us today to discuss 
              how our services can support your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="golden" size="lg">
                Schedule Consultation
              </Button>
              <Button variant="hero" size="lg">
                View Service Packages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

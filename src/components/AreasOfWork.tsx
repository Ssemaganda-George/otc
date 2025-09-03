import { Heart, Sprout, Banknote, GraduationCap, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const areas = [
  {
    icon: Heart,
    title: "Health",
    description: "Innovating digital health solutions to enhance healthcare delivery and accessibility across Africa, focusing on telemedicine, health data protection, and medical AI regulation.",
    features: ["Digital Health Platforms", "Medical Data Privacy", "Telemedicine Regulation", "AI in Healthcare"],
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30"
  },
  {
    icon: Sprout,
    title: "Agriculture",
    description: "Developing AgriTech solutions to improve farming practices and food security, including smart farming technologies, agricultural data management, and supply chain optimization.",
    features: ["Smart Farming Tech", "Agricultural Data", "Supply Chain", "Precision Agriculture"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  },
  {
    icon: Banknote,
    title: "Finance",
    description: "Creating fintech innovations to promote financial inclusion and economic growth, covering cryptocurrency regulation, digital banking, and mobile payment systems.",
    features: ["Digital Banking", "Cryptocurrency Law", "Mobile Payments", "Financial Inclusion"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Implementing EdTech solutions to make quality education more accessible and effective, including online learning platforms, educational data protection, and digital literacy.",
    features: ["E-Learning Platforms", "Educational Data", "Digital Literacy", "Remote Education"],
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Developing smart transportation solutions to improve mobility and logistics, including autonomous vehicles, smart traffic systems, and logistics optimization.",
    features: ["Smart Traffic", "Autonomous Vehicles", "Logistics Tech", "Urban Mobility"],
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30"
  }
];

export function AreasOfWork() {
  return (
    <section id="areas" className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Areas of Work
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto text-justify sm:text-center">
              OTC focuses on the application of technology in core sectors that, when supported sustainably, 
              will enhance equitable access to services and better wellbeing of every person living on the continent.
            </p>
          </div>

          {/* Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {areas.map((area, index) => (
              <div 
                key={area.title}
                className={`group bg-card border ${area.borderColor} rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-500 card-hover`}
              >
                {/* Icon and Title */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gradient-blue">
                    {area.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {area.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {area.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <Button variant="ghost-golden" className="w-full group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="heading-card text-gradient-blue mb-6">
                Sustainable, Interoperable Solutions
              </h3>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                We believe in creating sustainable, interoperable solutions that respect human rights and promote 
                social justice across all our areas of work. Our approach ensures that technology serves humanity, 
                not the other way around.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg">
                  Partner With Us
                </Button>
                <Button variant="hero" size="lg">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

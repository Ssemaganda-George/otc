import { BookOpen, Users, Shield, Building, TrendingUp, Lightbulb } from "lucide-react";

const products = [
  {
    title: "OTC Legal Clinic",
    description: "Comprehensive legal support for technology and digital rights issues across Africa",
    icon: Shield,
    features: [
      "Digital rights advocacy",
      "Technology law consultation", 
      "Privacy and data protection",
      "Intellectual property guidance"
    ]
  },
  {
    title: "Digital Governance Platform",
    description: "Advanced tools and frameworks for implementing effective digital governance",
    icon: Building,
    features: [
      "Policy development tools",
      "Regulatory compliance frameworks",
      "Stakeholder engagement platforms",
      "Impact monitoring systems"
    ]
  },
  {
    title: "Innovation Lab",
    description: "Incubation and acceleration programs for tech solutions addressing African challenges",
    icon: Lightbulb,
    features: [
      "Technology incubation",
      "Startup acceleration",
      "Innovation workshops",
      "Prototype development"
    ]
  },
  {
    title: "Training Academy",
    description: "Comprehensive education and capacity building programs for the digital transformation",
    icon: Users,
    features: [
      "Professional certification courses",
      "Executive training programs",
      "Community workshops",
      "Online learning platforms"
    ]
  }
];

export function ProductsOverview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Products & Solutions
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Comprehensive products and solutions designed to advance Africa's digital transformation 
              while protecting rights and promoting inclusive development.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {products.map((product, index) => (
              <div 
                key={product.title}
                className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-primary">
                    {product.title}
                  </h3>
                </div>
                
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-secondary/60 to-secondary/40 rounded-2xl p-8">
            <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">
              Ready to Transform Your Digital Future?
            </h3>
            <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover how our products and solutions can help you navigate the digital landscape 
              while upholding rights and promoting inclusive development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-golden">
                Explore Solutions
              </button>
              <button className="btn-outline">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

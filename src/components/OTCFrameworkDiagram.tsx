import { ArrowDown, ArrowRight } from "lucide-react";

export function OTCFrameworkDiagram() {
  const sectors = ["HEALTH", "AGRICULTURE", "FINANCE", "DEVELOPMENT"];
  const activities = ["RESEARCH", "TRAINING", "ADVOCACY", "INNOVATION"];
  const rights = ["Health", "Privacy", "Property", "Environment", "Development"];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              OTC Framework Visualization
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto">
              A visual representation of our comprehensive framework that guides technology development 
              and innovation across Africa while ensuring human rights protection.
            </p>
          </div>

          {/* Framework Diagram */}
          <div className="relative bg-black rounded-3xl p-8 md:p-12 border border-primary/30 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            </div>

            <div className="relative z-10 space-y-8">
              {/* Top Level - Framework Title */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/30 border-2 border-primary rounded-xl px-8 py-4 shadow-lg hover:shadow-blue transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-playfair">
                    OTC OPERATION FRAMEWORK
                  </h3>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
              </div>

              {/* Second Level - Tech & Innovation */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary/15 to-primary/25 border border-primary rounded-lg px-6 py-3 shadow-md hover:shadow-blue transition-all duration-300 hover:scale-105">
                  <h4 className="text-lg md:text-xl font-semibold text-white">
                    TECH & INNOVATION IN AFRICA
                  </h4>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-primary/80" />
              </div>

              {/* Third Level - Sectors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sectors.map((sector, index) => (
                  <div key={sector} className="text-center">
                    <div className={`bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/50 rounded-lg px-4 py-3 shadow-md hover:shadow-blue transition-all duration-300 hover:scale-105 group`}>
                      <span className="text-sm md:text-base font-medium text-white group-hover:text-primary transition-colors">
                        {sector}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connecting Lines */}
              <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-8 w-full max-w-md">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex justify-center">
                      <ArrowDown className="w-5 h-5 text-primary/60" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fourth Level - Activities */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activities.map((activity, index) => (
                  <div key={activity} className="text-center">
                    <div className={`bg-gradient-to-br from-primary/8 to-primary/15 border border-primary/40 rounded-lg px-4 py-3 shadow-md hover:shadow-blue transition-all duration-300 hover:scale-105 group`}>
                      <span className="text-sm md:text-base font-medium text-white group-hover:text-primary transition-colors">
                        {activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary animate-pulse" />
              </div>

              {/* Fifth Level - Human Rights Header */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/30 border-2 border-primary rounded-xl px-6 py-4 shadow-lg hover:shadow-blue transition-all duration-300 hover:scale-105">
                  <h4 className="text-lg md:text-xl font-bold text-white font-playfair">
                    FUNDAMENTAL HUMAN RIGHTS
                  </h4>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-primary/80" />
              </div>

              {/* Sixth Level - Rights */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {rights.map((right, index) => (
                  <div key={right} className="text-center">
                    <div className={`bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/50 rounded-lg px-3 py-2 shadow-md hover:shadow-blue transition-all duration-300 hover:scale-105 group`}>
                      <span className="text-xs md:text-sm font-medium text-white group-hover:text-primary transition-colors">
                        {right}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
              </div>

              {/* Bottom Level - Vision Statement */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary/15 to-primary/25 border-2 border-primary rounded-2xl px-6 py-6 shadow-xl hover:shadow-blue transition-all duration-300 hover:scale-105">
                  <p className="text-sm md:text-base font-medium text-white leading-relaxed max-w-4xl mx-auto">
                    "An African Digital Present and Future Ingrained in Human Rights and Justice for All"
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-primary/40 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-primary/35 rounded-full animate-ping"></div>
          </div>

          {/* Framework Explanation */}
          <div className="mt-16 bg-card border border-border rounded-2xl p-8 shadow-card">
            <h3 className="heading-card text-gradient-blue mb-6 text-center">
              Understanding the Framework
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Framework Components:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Sectors:</strong> Four key areas of technology focus</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Activities:</strong> Core operational approaches</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Rights:</strong> Fundamental protections we ensure</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Vision:</strong> Our ultimate goal for Africa</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Principles:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Integration:</strong> Technology and law working together</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Rights-Based:</strong> Human rights at the center</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">African-Led:</strong> Solutions by and for Africans</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                    <span><strong className="text-primary">Sustainable:</strong> Long-term impact and viability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

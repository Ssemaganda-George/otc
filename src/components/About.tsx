import { Target, Eye, Heart, Users, Briefcase, Lightbulb, Globe } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Driving creative, future-oriented solutions that harness technology to improve lives and transform societies."
  },
  {
    icon: Globe,
    title: "Afrocentrism",
    description: "Advancing an African-led tech agenda, rooted in local knowledge, institutions, and leadership to shape Africa's digital present and future."
  },
  {
    icon: Heart,
    title: "Human Rights & Social Justice",
    description: "Ensuring that digital transformation upholds rights, dignity, and equity, and reduces inequalities for all Africans."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committing to the highest standards of professionalism, integrity, and impact in all our work."
  },
  {
    icon: Users,
    title: "Connectivity",
    description: "Building technologies and systems that seamlessly connect people, communities, and innovations across Africa."
  }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              About OneTechConnect
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              We are Africa's premier technology law firm, bridging the gap between innovation and regulation 
              to create an enabling environment for digital transformation across the continent.
            </p>
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Mission</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
                To champion Africa's technological and digital transformation through innovative legal frameworks, 
                policy advocacy, and strategic litigation. We empower the intersection of law, technology, and human rights 
                to ensure that Africa's digital future is secure, equitable, and prosperity-driven for all.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Vision</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
                An Africa where technology drives sustainable development, economic growth, and social justice. 
                We envision a digitally transformed continent that leads global innovation while preserving 
                cultural values and promoting inclusive prosperity for all African communities.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-12">
            <h3 className="heading-card text-gradient-blue mb-8">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`text-center group animate-fade-in-up opacity-0 [animation-delay:${index * 0.2}s] [animation-fill-mode:forwards]`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-golden/20 to-golden/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-golden transition-all duration-300 group-hover:scale-110">
                  <value.icon className="w-8 h-8 text-golden" />
                </div>
                <h4 className="text-xl font-playfair font-semibold text-gradient-blue mb-4">
                  {value.title}
                </h4>
                <p className="text-body text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* OTC Framework Diagram */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="heading-card text-gradient-blue mb-4">Our Strategic Framework</h3>
              <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive approach to advancing Africa's digital transformation through 
                integrated legal, technological, and social justice initiatives.
              </p>
            </div>
            
            {/* Framework Diagram */}
            <div className="max-w-5xl mx-auto space-y-8">
              
              {/* Title Box - Full Width */}
              <div className="relative group animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-center shadow-blue transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group-hover:animate-glow-pulse">
                  <h4 className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight">
                    THE OTC FRAMEWORK ON TECH, INNOVATION & DIGITALISATION IN AFRICA
                  </h4>
                </div>
                {/* Connecting Arrow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-golden opacity-60 animate-flow-line"></div>
              </div>

              {/* Four Sector Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { title: "HEALTH & SRHR", desc: "Sexual & Reproductive Health Rights", icon: Heart },
                  { title: "AGRICULTURE", desc: "Tech & Innovation", icon: Lightbulb },
                  { title: "FINANCE", desc: "FinTech & Governance", icon: Briefcase },
                  { title: "DEVELOPMENT", desc: "Digitalization & Growth", icon: Target }
                ].map((sector, index) => (
                  <div key={sector.title} className={`relative group animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                    <div className="bg-card border-2 border-primary/20 rounded-xl p-4 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[120px] flex flex-col justify-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <sector.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h5 className="font-bold text-foreground text-sm mb-1">{sector.title}</h5>
                      <p className="text-xs text-muted-foreground">{sector.desc}</p>
                    </div>
                    {/* Connecting lines to center */}
                    <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary to-primary/40 opacity-40"></div>
                  </div>
                ))}
              </div>

              {/* Central Hub - Human Rights */}
              <div className="relative flex justify-center">
                <div className="relative group animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                  <div className="bg-gradient-to-br from-golden to-golden-dark rounded-2xl p-8 text-center shadow-golden transition-all duration-500 hover:shadow-lg hover:scale-105 max-w-md group-hover:animate-glow-pulse">
                    <div className="text-4xl mb-4 animate-float">⚖️</div>
                    <h5 className="text-xl font-bold text-golden-foreground mb-2">
                      FUNDAMENTAL HUMAN RIGHTS
                    </h5>
                    <h6 className="text-lg font-semibold text-golden-foreground/90 mb-3">
                      & SOCIAL JUSTICE
                    </h6>
                    <p className="text-sm text-golden-foreground/80">
                      The core principle guiding all our initiatives
                    </p>
                  </div>
                  {/* Connecting Arrow Down */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-golden to-primary opacity-60 animate-flow-line"></div>
                </div>
              </div>

              {/* Four Department Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { title: "RESEARCH", desc: "Evidence & Analysis", icon: "🔬", color: "border-purple-400" },
                  { title: "TRAINING", desc: "Capacity Building", icon: "📚", color: "border-indigo-400" },
                  { title: "ADVOCACY", desc: "Policy & Partnerships", icon: "📢", color: "border-pink-400" },
                  { title: "INNOVATION", desc: "Tech Solutions", icon: "💡", color: "border-amber-400" }
                ].map((dept, index) => (
                  <div key={dept.title} className={`relative group animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.7 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                    {/* Connecting lines from center */}
                    <div className="hidden md:block absolute -top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-primary to-golden opacity-40 animate-flow-line"></div>
                    <div className={`bg-card border-2 ${dept.color} rounded-xl p-4 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary hover:scale-105 group-hover:animate-glow-pulse`}>
                      <div className="text-2xl mb-2">{dept.icon}</div>
                      <h5 className="font-bold text-foreground text-sm mb-1">{dept.title}</h5>
                      <p className="text-xs text-muted-foreground">{dept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Vision Box - Full Width */}
              <div className="relative animate-fade-in-up opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                {/* Connecting Arrow */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-golden to-primary opacity-60 animate-flow-line"></div>
                <div className="bg-gradient-to-r from-golden-light/80 to-golden-light/60 border-2 border-golden/50 rounded-2xl p-6 text-center shadow-golden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] group hover:animate-glow-pulse">
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    "Transformation that Promotes Human Rights and Justice for All in Africa"
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our ultimate goal: An Africa where technology drives inclusive prosperity and social justice
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Operationalising the OTC Framework */}
          <div className="mt-24 bg-secondary/30 rounded-3xl p-12">
            <div className="text-center mb-16">
              <h3 className="heading-section text-gradient-blue mb-6">Operationalising the OTC Framework</h3>
              <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                We operationalize the OTC Framework through our four (4) strategic pillars
              </p>
            </div>

            {/* Four Strategic Pillars Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              {[
                { title: "RESEARCH", icon: Target },
                { title: "TRAINING", icon: Users },
                { title: "ADVOCACY", icon: Briefcase },
                { title: "INNOVATION", icon: Lightbulb }
              ].map((pillar, index) => (
                <div key={pillar.title} className={`animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="bg-card border-2 border-primary/20 rounded-xl p-8 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[140px] flex flex-col justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary">{pillar.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Pillar Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  title: "Research",
                  items: [
                    "Documentation",
                    "Think tanks", 
                    "Experiments",
                    "Policy Analysis",
                    "Legislative Scrutiny",
                    "Kimeeza / Public debates",
                    "Implementation"
                  ]
                },
                {
                  title: "Training",
                  items: [
                    "Short courses",
                    "Academic programmes", 
                    "Seminars",
                    "Master classes",
                    "Webinars"
                  ]
                },
                {
                  title: "Advocacy", 
                  items: [
                    "Reporting",
                    "MDA collaborations",
                    "Activism",
                    "Litigation",
                    "ADR",
                    "Legislative drafting",
                    "Coalition/Networks/Movement"
                  ]
                },
                {
                  title: "Innovation",
                  items: [
                    "Hackathons",
                    "IP Protection",
                    "Data",
                    "Sandboxes", 
                    "Compliance services",
                    "Grant & Donations",
                    "Investment Fund"
                  ]
                }
              ].map((pillar, index) => (
                <div key={pillar.title} className={`animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[380px] flex flex-col">
                    <h5 className="text-lg font-semibold text-primary mb-6 pb-3 border-b border-border">{pillar.title}</h5>
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {pillar.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connectivity Statement */}
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 text-center shadow-card">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-primary">One Tech Approach</h4>
              </div>
              <p className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
                <span className="font-semibold text-primary">Connectivity:</span> Building technologies and systems that seamlessly connect people, communities, and innovations across Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Heart, Lightbulb, Briefcase, Target, Globe, Users } from "lucide-react";

export function OTCFramework() {
  // State for each pillar's details
  const [showResearch, setShowResearch] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showAdvocacy, setShowAdvocacy] = useState(false);
  const [showInnovation, setShowInnovation] = useState(false);

  return (
    <section id="otc-framework" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              The OTC Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                  THE OTC AFROCENTRIC FRAMEWORK FOR DIGITAL TRANSFORMATION
                </h4>
              </div>
              {/* Connecting Arrow */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-primary/40 opacity-60"></div>
            </div>

            {/* Four Sector Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "HEALTH & SRHR", desc: "Sexual & Reproductive Health Rights", icon: Heart },
                { title: "AGRICULTURE", desc: "AgiTech & Innovation", icon: Lightbulb },
                { title: "FINANCE", desc: "FinTech & Governance", icon: Briefcase },
                { title: "DEVELOPMENT", desc: "Digitalization & Growth", icon: Target }
              ].map((sector, index) => (
                <div key={sector.title} className={`relative group animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="bg-card border-2 border-primary/20 rounded-xl p-4 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[120px] flex flex-col justify-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <sector.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h5 className="font-bold text-foreground text-sm mb-1">{sector.title}</h5>
                    <p className="text-sm text-muted-foreground">{sector.desc}</p>
                  </div>
                  {/* Connecting lines to center */}
                  <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary to-primary/40 opacity-40"></div>
                </div>
              ))}
            </div>

            {/* Central Hub - Human Rights */}
            <div className="relative flex justify-center">
              <div className="relative group animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <div className="bg-gradient-to-br from-golden-light/90 to-golden-light/70 border-2 border-golden/50 rounded-2xl p-6 text-center shadow-golden transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:animate-glow-pulse min-w-[280px]">
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    HUMAN RIGHTS & SOCIAL JUSTICE
                  </h4>
                  <p className="text-base text-muted-foreground">
                    At the heart of everything we do
                  </p>
                </div>
                {/* Connecting Arrow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-golden to-primary opacity-60"></div>
              </div>
            </div>

            {/* Department Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "RESEARCH", desc: "Evidence-based insights", icon: Target },
                { title: "TRAINING", desc: "Capacity building", icon: Users },
                { title: "ADVOCACY", desc: "Policy & legal reform", icon: Briefcase },
                { title: "INNOVATION", desc: "Tech solutions", icon: Lightbulb }
              ].map((dept, index) => (
                <div key={dept.title} className={`relative group animate-fade-in-up opacity-0`} style={{ animationDelay: `${0.7 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:scale-105 group-hover:animate-glow-pulse min-h-[100px] flex flex-col justify-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <dept.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h5 className="font-bold text-foreground text-sm mb-1">{dept.title}</h5>
                    <p className="text-sm text-muted-foreground">{dept.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Vision Box - Full Width */}
            <div className="relative animate-fade-in-up opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
              {/* Connecting Arrow */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-golden to-primary opacity-60"></div>
              <div className="bg-gradient-to-r from-golden-light/80 to-golden-light/60 border-2 border-golden/50 rounded-2xl p-6 text-center shadow-golden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] group hover:animate-glow-pulse">
                <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  "Transformation that Promotes Human Rights and Justice for All in Africa"
                </h4>
                <p className="text-base text-muted-foreground">
                  Our ultimate goal: An Africa where technology drives inclusive prosperity and social justice
                </p>
              </div>
            </div>
          </div>

          {/* Operationalising the OTC Framework */}
          <div className="mt-24 bg-secondary/30 rounded-3xl p-12">
            <div className="text-center mb-16">
              <h3 className="heading-section text-gradient-blue mb-6">Operationalising the OTC Framework</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We operationalize the OTC Framework through our four (4) strategic pillars
              </p>
            </div>

            {/* Four Strategic Pillars Header with golden buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              {/* Research */}
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: `0.2s`, animationFillMode: 'forwards' }}>
                <div className="bg-card border-2 border-primary/20 rounded-xl p-8 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">RESEARCH</h4>
                  </div>
                  <button
                    className="px-4 py-1 rounded-full bg-golden text-golden-foreground text-xs font-semibold shadow-lg hover:bg-golden-dark hover:scale-105 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 mt-4"
                    onClick={() => setShowResearch((prev) => !prev)}
                  >
                    {showResearch ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {showResearch && (
                  <div className="mt-4 bg-card border border-primary/10 rounded-xl p-4 shadow-card">
                    <ul className="space-y-2 text-left">
                      {[
                        "Documentation",
                        "Think tanks", 
                        "Experiments",
                        "Policy Analysis",
                        "Legislative Scrutiny",
                        "Kimeeza / Public debates",
                        "Implementation"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Training */}
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: `0.3s`, animationFillMode: 'forwards' }}>
                <div className="bg-card border-2 border-primary/20 rounded-xl p-8 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">TRAINING</h4>
                  </div>
                  <button
                    className="px-4 py-1 rounded-full bg-golden text-golden-foreground text-xs font-semibold shadow-lg hover:bg-golden-dark hover:scale-105 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 mt-4"
                    onClick={() => setShowTraining((prev) => !prev)}
                  >
                    {showTraining ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {showTraining && (
                  <div className="mt-4 bg-card border border-primary/10 rounded-xl p-4 shadow-card">
                    <ul className="space-y-2 text-left">
                      {[
                        "Short courses",
                        "Academic programmes", 
                        "Seminars",
                        "Master classes",
                        "Webinars"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Advocacy */}
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: `0.4s`, animationFillMode: 'forwards' }}>
                <div className="bg-card border-2 border-primary/20 rounded-xl p-8 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">ADVOCACY</h4>
                  </div>
                  <button
                    className="px-4 py-1 rounded-full bg-golden text-golden-foreground text-xs font-semibold shadow-lg hover:bg-golden-dark hover:scale-105 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 mt-4"
                    onClick={() => setShowAdvocacy((prev) => !prev)}
                  >
                    {showAdvocacy ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {showAdvocacy && (
                  <div className="mt-4 bg-card border border-primary/10 rounded-xl p-4 shadow-card">
                    <ul className="space-y-2 text-left">
                      {[
                        "Reporting",
                        "MDA collaborations",
                        "Activism",
                        "Litigation",
                        "ADR",
                        "Legislative drafting",
                        "Coalition/Networks/Movement"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Innovation */}
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: `0.5s`, animationFillMode: 'forwards' }}>
                <div className="bg-card border-2 border-primary/20 rounded-xl p-8 text-center shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">INNOVATION</h4>
                  </div>
                  <button
                    className="px-4 py-1 rounded-full bg-golden text-golden-foreground text-xs font-semibold shadow-lg hover:bg-golden-dark hover:scale-105 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 mt-4"
                    onClick={() => setShowInnovation((prev) => !prev)}
                  >
                    {showInnovation ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {showInnovation && (
                  <div className="mt-4 bg-card border border-primary/10 rounded-xl p-4 shadow-card">
                    <ul className="space-y-2 text-left">
                      {[
                        "Hackathons",
                        "IP Protection",
                        "Data",
                        "Sandboxes", 
                        "Compliance services",
                        "Grant & Donations",
                        "Investment Fund"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-base text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Connectivity Statement */}
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 text-center shadow-card mt-16">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-primary">One Tech Approach</h4>
              </div>
              <p className="text-xl text-foreground leading-relaxed max-w-4xl mx-auto">
                <span className="font-semibold text-primary">Connectivity:</span> Building technologies and systems that easily Connects people, communities, and innovations across Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
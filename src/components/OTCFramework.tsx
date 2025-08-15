import { Target, Users, Shield, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OTCFrameworkDiagram } from "./OTCFrameworkDiagram";

const frameworkSteps = [
  {
    step: "01",
    title: "Framework Foundation",
    description: "Establishing the theoretical and practical foundation for technology-law integration",
    details: ["Legal framework analysis", "Technology assessment", "Stakeholder mapping", "Risk evaluation"]
  },
  {
    step: "02", 
    title: "Themes of Work",
    description: "Focusing on four critical sectors: Health, Agriculture, Finance, and Development",
    details: ["Sector-specific analysis", "Regulatory mapping", "Innovation opportunities", "Impact assessment"]
  },
  {
    step: "03",
    title: "Programme Implementation",
    description: "Executing comprehensive programmes with institutional development and sustainability",
    details: ["Programme design", "Resource allocation", "Capacity building", "Monitoring & evaluation"]
  },
  {
    step: "04",
    title: "Rights Protection",
    description: "Ensuring fundamental rights are protected and promoted in all technology implementations",
    details: ["Rights-based approach", "Privacy protection", "Dignity preservation", "Access to justice"]
  }
];

const scopeOfRights = [
  {
    icon: Target,
    title: "Right to Health",
    description: "Ensuring technology enhances rather than hinders access to quality healthcare services"
  },
  {
    icon: Shield,
    title: "Right to Privacy",
    description: "Protecting personal data and ensuring privacy in all digital interactions and services"
  },
  {
    icon: Users,
    title: "Right to Development",
    description: "Ensuring technology contributes to sustainable and inclusive development for all"
  },
  {
    icon: Globe,
    title: "Right to Environment",
    description: "Promoting technology that supports environmental sustainability and climate action"
  }
];

export function OTCFramework() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              The OTC Framework
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto">
              Our comprehensive framework guides innovation and technology development in Africa, 
              focusing on four key sectors while ensuring human rights protection and sustainable development.
            </p>
          </div>

          {/* Framework Diagram */}
          <OTCFrameworkDiagram />

          {/* Framework Details */}
          <div className="mt-24">
            {/* Framework Overview */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
                <div className="text-center mb-8">
                  <h3 className="heading-card text-gradient-blue mb-4">
                    Operationalising the OTC Framework
                  </h3>
                  <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                    Under this framework, we focus on innovation and technology in Africa across four key sectors, 
                    conducting research, training, advocacy, and innovation to enhance respect and promotion of 
                    fundamental human rights.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {frameworkSteps.map((step, index) => (
                    <div key={step.step} className="text-center">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-foreground mb-3">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-primary mr-2" />
                            <span className="text-xs text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          {/* Scope of Rights */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="heading-card text-gradient-blue mb-4">
                Scope of Rights Protection
              </h3>
              <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                Our framework ensures that all technology development and implementation respects 
                and promotes fundamental human rights across all sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {scopeOfRights.map((right, index) => (
                <div key={right.title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <right.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-playfair font-semibold text-gradient-blue mb-3">
                    {right.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Goal */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="heading-card text-gradient-blue mb-4">
                Our Overall Goal
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-body text-muted-foreground leading-relaxed mb-6">
                  We work towards a <strong className="text-primary">Digitized Africa</strong> where respect for human rights 
                  and access to justice is for everyone. Our vision encompasses a continent where technology serves 
                  as a tool for empowerment, inclusion, and sustainable development.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-blue mb-2">Digitization</div>
                    <p className="text-sm text-muted-foreground">Converting analog systems to digital formats</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-blue mb-2">Innovation</div>
                    <p className="text-sm text-muted-foreground">Creating new solutions for African challenges</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-blue mb-2">Justice</div>
                    <p className="text-sm text-muted-foreground">Ensuring equitable access to technology benefits</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-4">Key Focus Areas:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["African Tech Justice", "Human Rights", "Sustainable Development", "Digital Inclusion"].map((area) => (
                      <span key={area} className="text-sm bg-primary/10 text-primary px-3 py-2 rounded-full border border-primary/20 text-center">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button variant="golden" size="lg" className="group">
                Learn More About Our Framework
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

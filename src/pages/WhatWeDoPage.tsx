import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Heart, Leaf, DollarSign, Laptop, Users, BookOpen, Megaphone, Lightbulb } from "lucide-react";

const focusAreas = [
  {
    title: "HealthTech & Sexual Reproductive Health and Rights",
    description: "Advancing digital health solutions while safeguarding reproductive rights and dignity",
    icon: Heart,
    color: "text-red-600"
  },
  {
    title: "Agriculture, Tech & Innovation",
    description: "Transforming agricultural practices through innovative technology solutions",
    icon: Leaf,
    color: "text-green-600"
  },
  {
    title: "FinTech & Governance",
    description: "Promoting inclusive financial technologies and transparent governance systems",
    icon: DollarSign,
    color: "text-yellow-600"
  },
  {
    title: "Tech, Innovation, Digitalization & Development",
    description: "Driving comprehensive digital transformation for sustainable development",
    icon: Laptop,
    color: "text-blue-600"
  }
];

const departments = [
  {
    title: "Research & Development",
    description: "Generating evidence to inform policy, practice, and innovation",
    icon: BookOpen
  },
  {
    title: "Training & Skill Development", 
    description: "Equipping young people and communities with digital, technical, and rights-based skills",
    icon: Users
  },
  {
    title: "Advocacy & Partnerships",
    description: "Building alliances to influence policy and amplify voices for justice and accountability",
    icon: Megaphone
  },
  {
    title: "Tech, Innovation & Digital Transformation (TID)",
    description: "Creating and supporting solutions that harness technology for inclusive development",
    icon: Lightbulb
  }
];

const programmes = [
  {
    title: "Tech & SRHR Governance (TSG)",
    description: "Examining governance challenges at the intersection of technology and sexual reproductive health rights in Africa",
    objectives: [
      "Research & Development on technology's impact on SRHR policies",
      "Advocacy & Movement Building for rights-based digital governance",
      "Training & Skillset Development for stakeholders",
      "Innovation supporting inclusive, ethical digital solutions"
    ]
  },
  {
    title: "AfricanIntelligenceNow (AiNow)",
    description: "Exploring AI evolution in Africa, focusing on health, agriculture, finance and development while respecting fundamental rights",
    objectives: [
      "Examine opportunities and risks of AI for African societies",
      "Support research on AI built on African data and contexts",
      "Advocate for AI that serves and interacts with African citizens"
    ]
  },
  {
    title: "BigTech Africa (BiTA)",
    description: "Examining the role and impact of big tech companies and governments across key sectors",
    objectives: [
      "Analyse how tech business models affect rights in Africa",
      "Strengthen regulatory responses to digital monopolies",
      "Build public awareness on tech practices and human rights"
    ]
  },
  {
    title: "EmpowerThem (EMT)",
    description: "Focusing on technology's intersection with vulnerable groups including children, youth, women and marginalized communities",
    objectives: [
      "Build digital literacy and rights awareness",
      "Strengthen access to safe and inclusive technologies",
      "Amplify voices of underrepresented groups"
    ]
  }
];

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-display text-gradient-blue mb-8">
                What We Do
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                OTC drives inclusive digital transformation across Africa through strategic focus areas, 
                specialized departments, and targeted programmes that advance human rights and social justice.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Focus Areas
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our work spans four critical sectors where technology and human rights intersect
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {focusAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 ${area.color}`}>
                        <area.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                          {area.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Departments
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our four strategic pillars that operationalize the OTC Framework
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-blue transition-all duration-300 text-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <dept.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                      {dept.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Programmes
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Targeted initiatives addressing specific challenges and opportunities in our focus areas
                </p>
              </div>

              <div className="space-y-8">
                {programmes.map((programme, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300"
                  >
                    <h3 className="text-2xl font-playfair font-semibold text-gradient-blue mb-4">
                      {programme.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {programme.description}
                    </p>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Objectives:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {programme.objectives.map((objective, objIndex) => (
                          <div key={objIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Brain, Heart, Users, Shield, Gavel, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programmes = [
  {
    id: 1,
    title: "Tech & SRHR Governance (TSG)",
    icon: Heart,
    description: "The Tech & SRHR Governance (TSG) programme examines the complex governance challenges at the intersection of technology, digitalization, and sexual and reproductive health and rights (SRHR) in Africa. It explores both the opportunities and risks that emerging technologies bring to the SRHR landscape ranging from improved access to health information and services, to threats such as privacy violations, data misuse, and exclusion of vulnerable groups.",
    objectives: [
      "Research & Development aimed at generating evidence on how technology impacts SRHR policies, access, and accountability.",
      "Advocacy & Movement Building to influence policy reforms and building coalitions to promote rights-based digital governance in SRHR.",
      "Training & Skillset Development to equip stakeholders with knowledge and skills to navigate the digital-SRHR interface responsibly.",
      "Innovation aimed at supporting the design and deployment of inclusive, ethical, and rights-respecting digital solutions for SRHR."
    ],
    goal: "Through TSG, we aim to ensure that digital transformation in Africa strengthens, rather than undermines, sexual and reproductive health and rights advancing dignity, equity, and justice for all."
  },
  {
    id: 2,
    title: "AfricanIntelligenceNow (AiNow)",
    icon: Brain,
    description: "AiNow explores the rapid evolution of Artificial Intelligence in Africa, focusing on its application in the critical areas of health, agriculture, finance and development. We are dedicated to ensuring that the development and deployment of AI not only respects the fundamental rights of African people but also aligns with their social values and norms. Our program examines how AI can be based on or can effectively understand and interact with African intelligence and data. The \"Now\" in our name underscores the urgency of acting in the present to shape a future where AI serves as a force for good.",
    goal: "To promote AI solutions that are rights-respecting, inclusive, and responsive to Africa's realities.",
    objectives: [
      "Examine the opportunities and risks of AI for African societies.",
      "Support research on AI built on African data and contexts.",
      "Advocate for AI that can effectively understand, serve, and interact with African citizens."
    ],
    outcomes: "Increased awareness and capacity on AI and rights; stronger regional dialogue on AI ethics; practical models for rights-based AI.",
    activities: "Policy briefs, research reports, expert dialogues, and community engagement platforms."
  },
  {
    id: 3,
    title: "BigTech Africa (BiTA)",
    icon: Shield,
    description: "BiTA examines the role and impact of big tech, small and medium tech companies, and governments operating across health, agriculture, finance, and development sectors. We explore how their operations intersect with fundamental rights such as the right to health, privacy, expression, property, a decent environment and development.",
    goal: "To hold technology & innovation actors accountable while promoting innovation that respects rights and justice.",
    objectives: [
      "Analyse how tech business models affect rights in Africa.",
      "Strengthen regulatory responses to the risks of digital monopolies.",
      "Build public awareness on the implications of tech practices for human rights."
    ],
    outcomes: "Improved accountability of tech companies; stronger legal and policy frameworks; informed citizens able to demand rights-based digital governance.",
    activities: "Research studies, public dialogues, strategic litigation, and multi-stakeholder advocacy platforms.",
    specialNote: {
      title: "Ssekamwa Frank & 3 Others v Google LLC",
      description: "This strategic interest litigation led to a landmark decision that"
    }
  },
  {
    id: 4,
    title: "EmpowerThem (EMT)",
    icon: Users,
    description: "EmpowerThem focuses on the intersection of technology and vulnerable groups including children, youth women and marginalized communities in the areas of health, finance, agriculture, and development.",
    goal: "To ensure that digital transformation empowers, rather than excludes, Africa's most vulnerable populations.",
    objectives: [
      "Build digital literacy and rights awareness among young people and vulnerable communities.",
      "Strengthen access to safe and inclusive technologies.",
      "Amplify voices of underrepresented groups in shaping digital futures."
    ],
    outcomes: "Empowered communities with greater agency in digital spaces; reduced inequalities in tech access; stronger protections for vulnerable groups.",
    activities: "Training programmes, digital rights toolkits, mentorship, advocacy campaigns, and community-driven innovation projects."
  }
];

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                Our Programmes
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Strategic initiatives that address critical challenges at the intersection of technology and human rights across Africa, 
                ensuring that digital transformation serves justice, equity, and dignity for all.
              </p>
            </div>
          </div>
        </section>

        {/* Programmes Overview */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {programmes.map((programme, index) => (
                  <div key={programme.id} className="space-y-8">
                    {/* Programme Header */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300">
                      <div className="flex items-start space-x-6 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <programme.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-3">
                            {programme.title}
                          </h2>
                        </div>
                      </div>
                      
                      <p className="text-body text-muted-foreground leading-relaxed mb-6">
                        {programme.description}
                      </p>

                      {/* Programme Goal */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-golden mb-3">Goal:</h3>
                        <p className="text-body text-muted-foreground leading-relaxed">
                          {programme.goal}
                        </p>
                      </div>

                      {/* Strategic Objectives */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-golden mb-4">
                          {programme.id === 1 ? "Strategic Objectives:" : "Objectives:"}
                        </h3>
                        <ul className="space-y-3">
                          {programme.objectives.map((objective, objIndex) => (
                            <li key={objIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-body text-muted-foreground leading-relaxed">
                                {objective}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expected Outcomes (for programmes that have them) */}
                      {programme.outcomes && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-golden mb-3">Expected Outcomes:</h3>
                          <p className="text-body text-muted-foreground leading-relaxed">
                            {programme.outcomes}
                          </p>
                        </div>
                      )}

                      {/* Activities (for programmes that have them) */}
                      {programme.activities && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-golden mb-3">Outputs & Activities:</h3>
                          <p className="text-body text-muted-foreground leading-relaxed">
                            {programme.activities}
                          </p>
                        </div>
                      )}

                      {/* Special Note for BiTA */}
                      {programme.specialNote && (
                        <div className="bg-golden/10 border border-golden/20 rounded-xl p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Gavel className="w-5 h-5 text-golden" />
                            <h4 className="font-semibold text-golden">{programme.specialNote.title}</h4>
                          </div>
                          <p className="text-body text-muted-foreground leading-relaxed">
                            {programme.specialNote.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Cross-Cutting Impact Areas
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our programmes work synergistically across key sectors to maximize impact and ensure comprehensive coverage
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Heart, name: "Health", description: "Digital health rights and SRHR" },
                  { icon: Users, name: "Agriculture", description: "Tech-enabled food security" },
                  { icon: Shield, name: "Finance", description: "Ethical fintech solutions" },
                  { icon: Target, name: "Development", description: "Rights-based innovation" }
                ].map((area, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Get Involved in Our Programmes
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Whether you're a researcher, advocate, practitioner, or community member, there are many ways to 
                contribute to and benefit from our programme initiatives.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg" className="group">
                  Partner With Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

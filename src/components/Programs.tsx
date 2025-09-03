import { Brain, Users, Building, Link, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Brain,
    title: "AfricanIntelligenceNow (AINow)",
    subtitle: "AI Development & Ethics in Africa",
    description: "AINow explores various developments of Artificial Intelligence in Africa across health, agriculture, finance, and development sectors. We focus on enhancing the development and deployment of AI that respects African people's rights, social values, and norms.",
    objectives: [
      "Ensure AI systems understand and respect African contexts",
      "Promote ethical AI development based on African intelligence and data",
      "Create frameworks for responsible AI deployment",
      "Build capacity for African AI researchers and developers"
    ],
    focus: "AI Ethics, Data Sovereignty, African-centered AI",
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    icon: Users,
    title: "EmpowerThem (EMP)",
    subtitle: "Tech for Vulnerable Communities",
    description: "Focuses on the intersection of technology and young people, children, women, and vulnerable communities. EMP explores how technology can empower these groups in health, finance, agriculture, and development while protecting their rights.",
    objectives: [
      "Bridge the digital divide for vulnerable populations",
      "Ensure inclusive technology design and deployment",
      "Protect rights of children and vulnerable groups in digital spaces",
      "Promote digital literacy and skills development"
    ],
    focus: "Digital Inclusion, Rights Protection, Capacity Building",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30"
  },
  {
    icon: Building,
    title: "BigTechAfrica (BiTA)",
    subtitle: "Big Tech Accountability",
    description: "Explores how big tech, small, and medium tech companies, as well as governments operating in health, agriculture, finance, and related areas affect rights to health, privacy, property, decent environment, and development across Africa.",
    objectives: [
      "Monitor and assess big tech operations in Africa",
      "Advocate for responsible business practices",
      "Ensure compliance with human rights standards",
      "Promote corporate accountability and transparency"
    ],
    focus: "Corporate Accountability, Rights Protection, Policy Advocacy",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    icon: Link,
    title: "One Tech Approach (OTA)",
    subtitle: "Interoperable Technology Systems",
    description: "Connects technologies and builds systems that easily communicate with each other. OTA ensures that tech systems and people can speak to each other, promoting technological oneness and mutual benefit for all Africans.",
    objectives: [
      "Develop interoperable technology standards",
      "Promote seamless integration across platforms",
      "Foster collaboration between tech ecosystems",
      "Create unified approaches to technology challenges"
    ],
    focus: "Interoperability, Integration, Collaboration",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  }
];

export function Programs() {
  return (
    <section id="programmes" className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Programmes of Work
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto text-justify sm:text-center">
              Through these strategic programmes, we address critical aspects of technology development and deployment 
              across Africa, ensuring that innovation serves all Africans while respecting human rights and promoting 
              sustainable development.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
            {programs.map((program, index) => (
              <div 
                key={program.title}
                className={`group bg-card border ${program.borderColor} rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-500 card-hover`}
              >
                {/* Header */}
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-1">
                      {program.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {program.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* Focus Area */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Focus Areas:</h4>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                    {program.focus}
                  </span>
                </div>

                {/* Objectives */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Objectives:</h4>
                  <div className="space-y-2">
                    {program.objectives.map((objective, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More */}
                <Button variant="ghost-golden" className="w-full group/btn">
                  Learn More About {program.title.split('(')[0].trim()}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
            <div className="text-center mb-8">
              <h3 className="heading-card text-gradient-blue mb-4">
                Our Core Values
              </h3>
              <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                These values guide all our programmes and ensure that our work contributes to a more 
                equitable and sustainable digital future for Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Ubuntu",
                  description: "Tech for all Africans – mutual and collective benefit from technology"
                },
                {
                  title: "Afrocentrism",
                  description: "African-led tech initiatives solving Africa's challenges and creating opportunities"
                },
                {
                  title: "Regionalism",
                  description: "Fostering cooperation and integration across African nations"
                }
              ].map((value, index) => (
                <div key={value.title} className="text-center">
                  <h4 className="font-playfair font-semibold text-gradient-blue mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

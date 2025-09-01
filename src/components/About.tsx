import { Target, Eye, Heart, Users, Briefcase, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Justice",
    description: "Unwavering commitment to fairness, equity, and the rule of law in the digital age, ensuring technology serves all people equally."
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Pioneering creative solutions that bridge the gap between emerging technologies and legal frameworks for sustainable progress."
  },
  {
    icon: Heart,
    title: "Dignity",
    description: "Respecting and protecting human dignity in all digital interactions, ensuring technology enhances rather than diminishes human worth."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Building partnerships and fostering teamwork across sectors to achieve collective impact in Africa's digital transformation."
  },
  {
    icon: Briefcase,
    title: "Excellence",
    description: "Delivering exceptional quality in every service, striving for the highest standards in legal expertise and technological innovation."
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    description: "Maintaining openness, accountability, and clear communication in all our operations and stakeholder relationships."
  }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-card">
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-blue transition-all duration-300 group-hover:scale-110">
                  <value.icon className="w-8 h-8 text-primary" />
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

          {/* How We Operate */}
          <div className="mt-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-12 border border-primary/20">
            <div className="text-center mb-8">
              <h3 className="heading-card text-gradient-blue mb-4">The OTC Framework</h3>
              <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                Our unique One Tech Connect methodology integrates legal expertise, 
                regulatory knowledge, and technological understanding to deliver comprehensive solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { step: "01", title: "Assess", desc: "Comprehensive tech legal analysis" },
                { step: "02", title: "Strategize", desc: "Tailored regulatory roadmaps" },
                { step: "03", title: "Implement", desc: "Expert legal guidance & support" },
                { step: "04", title: "Optimize", desc: "Continuous compliance monitoring" }
              ].map((item, index) => (
                <div key={item.step} className="text-center group">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

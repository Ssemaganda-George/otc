import { Target, Eye, Heart, Users, Briefcase, Lightbulb, Globe } from "lucide-react";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Who We Are
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              We are Africa's premier technology law firm, bridging the gap between innovation and regulation 
              to create an enabling environment for digital transformation across the continent.
            </p>
          </div>

          {/* Mission, Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Mission</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                To advance technology, innovation, and digitalization in Africa through integrated 
                legal, policy, and advocacy solutions that promote human rights, social justice, 
                and inclusive development.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="heading-card text-gradient-blue">Our Vision</h3>
              </div>
              <p className="text-body text-muted-foreground leading-relaxed">
                To be the leading catalyst for Africa's digital transformation, creating a continent 
                where technology empowers communities, protects rights, and drives sustainable 
                development for all.
              </p>
            </div>
          </div>

          {/* About Description */}
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="heading-card text-gradient-blue mb-8">Our Story</h3>
            <div className="space-y-6 text-body text-muted-foreground leading-relaxed text-justify sm:text-left">
              <p>
                OneTechConnect emerged from a deep understanding that Africa's digital transformation 
                requires more than just technological innovation—it demands a comprehensive approach 
                that integrates legal frameworks, policy development, and human rights advocacy.
              </p>
              <p>
                Founded by a team of passionate legal experts, technologists, and policy makers, 
                we recognized the critical gap between rapid technological advancement and the 
                regulatory frameworks needed to govern them responsibly.
              </p>
              <p>
                Today, we stand as Africa's premier technology law organization, working across 
                sectors to ensure that digital transformation serves all Africans while protecting 
                their fundamental rights and promoting inclusive development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

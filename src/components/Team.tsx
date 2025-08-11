import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Ssekamwa Frank",
    position: "Founder & CEO",
    bio: "Visionary leader with 15+ years in technology law and African digital policy. Pioneer in tech-legal integration across sub-Saharan Africa.",
    image: "/placeholder.svg",
    expertise: ["Tech Law", "Digital Policy", "IP Protection"],
    social: {
      linkedin: "#",
      email: "frank@sakonc.com",
      twitter: "#"
    }
  },
  {
    name: "Kalivayo Blair",
    position: "Chief Legal Officer",
    bio: "Expert in regulatory compliance and fintech law. Leading authority on cryptocurrency regulation and digital banking frameworks in Africa.",
    image: "/placeholder.svg",
    expertise: ["Fintech Law", "Compliance", "Regulatory Affairs"],
    social: {
      linkedin: "#",
      email: "blair@sakonc.com",
      twitter: "#"
    }
  },
  {
    name: "Dr. Kakooza Anthony",
    position: "Head of Research & Innovation",
    bio: "Research leader with a PhD in Digital Governance. Driving breakthrough research in AI ethics, data protection, and tech policy frameworks.",
    image: "/placeholder.svg",
    expertise: ["AI Ethics", "Data Protection", "Research"],
    social: {
      linkedin: "#",
      email: "anthony@sakonc.com",
      twitter: "#"
    }
  }
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-golden mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of legal experts, technologists, and policy makers brings together decades 
              of experience in shaping Africa's digital future.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-golden transition-all duration-500 card-hover"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Profile Image */}
                <div className="relative h-80 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">{member.position}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <MailIcon className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="heading-card text-gradient-golden mb-4">
                Join Our Mission
              </h3>
              <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for passionate individuals who share our vision 
                of advancing Africa's tech-legal landscape.
              </p>
              <Button variant="golden">
                View Open Positions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
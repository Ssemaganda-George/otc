import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Ssekamwa Frank",
    position: "Chief Executive Officer",
    bio: "Frank is our founding Chief Executive Officer and a Tech lawyer and innovator with training in both law and ICT. He holds a Bachelor of Laws from Makerere University, Post Diploma in Legal Practice from Makerere University, and is currently a Master of Laws Finalist at Makerere University. Frank has undergone professional training on tax administration, organization management, application development, and machine learning.",
    image: "/placeholder.svg",
    expertise: ["Tech Law", "Digital Policy", "IP Protection", "Machine Learning"],
    social: {
      linkedin: "#",
      email: "frank@onetechconnect.org",
      twitter: "#"
    }
  },
  {
    name: "Kalivayo Blair",
    position: "Co-Founder",
    bio: "Blair is our co-founder and a Tech lawyer passionate about law and ICT. He holds a Bachelor of Laws from Makerere University and Post-Graduate Diploma in Legal Practice. Over the years, Blair has been part of various tech-related projects and trainings, focusing on the intersection of technology and legal frameworks.",
    image: "/placeholder.svg",
    expertise: ["Tech Law", "Legal Practice", "Tech Projects", "Training"],
    social: {
      linkedin: "#",
      email: "blair@onetechconnect.org",
      twitter: "#"
    }
  },
  // {
  //   name: "Dr. Kakooza Anthony",
  //   position: "Board of Trustees",
  //   bio: "Dr. Kakooza Anthony serves on our Board of Trustees, bringing extensive experience in governance, strategic oversight, and organizational development. His expertise helps guide OTC's strategic direction and ensures alignment with our mission and values.",
  //   image: "/placeholder.svg",
  //   expertise: ["Governance", "Strategic Planning", "Organizational Development", "Board Leadership"],
  //   social: {
  //     linkedin: "#",
  //     email: "anthony@onetechconnect.org",
  //     twitter: "#"
  //   }
  // },
  
  {
    name: "Nakitende Sauda",
    position: "Head Research and Grants",
    bio: "Nakitende Sauda leads our research initiatives and grant acquisition efforts. With extensive experience in research methodology, project management, and funding strategies, she drives OTC's evidence-based approach to tech law and policy development across Africa.",
    image: "/placeholder.svg",
    expertise: ["Research Methods", "Grant Writing", "Policy Research", "Project Management"],
    social: {
      linkedin: "#",
      email: "sauda@onetechconnect.org",
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
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Team
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Meet the innovative minds behind One Tech Connect. Our diverse team of legal experts, 
              technologists, and policy makers brings together decades of experience in shaping Africa's digital future.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-blue transition-all duration-500 card-hover"
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
              <h3 className="heading-card text-gradient-blue mb-4">
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

import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Ssekamwa Frank",
    position: "Executive Director",
    bio: "Frank leads OTC as Chief Executive Director, bringing together expertise at the intersection of law, technology, and global health. He holds a Bachelor of Laws from Makerere University, a Postgraduate Diploma in Legal Practice from the Law Development Centre and a Master of Laws (LL.M.) specializing in Digital Health Rights in Low- and Middle-Income Countries. In addition to his academic qualifications, Frank has undertaken professional training in administrative science, climate change, digital health, reproductive health, and project management. His career spans diverse roles with the High Court of Uganda, leading law firms and Afya na Haki Institute equipping him with a unique blend of experience in research, strategic litigation, capacity building, and project leadership. Frank is a Tech Lawyer and Innovator passionate about advancing digital rights and justice in Africa. He is an active member of both the East African Law Society and the Uganda Law Society.",
    image: "/placeholder.svg",
    expertise: ["Digital Health Rights", "Tech Law", "Strategic Litigation", "Project Leadership"],
    social: {
      linkedin: "#",
      email: "frank@onetechconnect.org",
      twitter: "#"
    }
  },
  {
    name: "Kalivayo Blair",
    position: "Director of Operations",
    bio: "Blair is the founding Director of Operations, a distinguished corporate lawyer with a profound passion for the intersection of law and ICT. Blair holds a Bachelor of Laws from Makerere University and a Post-Graduate Diploma in Legal Practice, supplemented by several relevant professional training certifications. His expertise is extensive, covering banking, corporate governance, insolvency practice, Mergers and Acquisitions (M&A), Intellectual Property (IP), Technology, Media, and Telecommunications (TMT). Over the years, Blair has been instrumental in the success of numerous start-ups across Uganda, East, and West Africa. His career includes serving with some of Uganda's leading law firms, providing him with a wealth of practical experience. He is a respected member of both the Uganda Law Society and the East African Law Society.",
    image: "/placeholder.svg",
    expertise: ["Corporate Law", "M&A", "Intellectual Property", "TMT Law"],
    social: {
      linkedin: "#",
      email: "blair@onetechconnect.org",
      twitter: "https://x.com/blairekalivayo"
    }
  },
  {
    name: "Nakitende Sauda",
    position: "Director of Programs",
    bio: "Sauda is the Director of Programs at OTC, driven by a passion for ensuring that technological transformation advances the well-being and rights of women, children, and underserved communities across Africa. Sauda holds a Bachelor of Laws (Hons) and a first-class Diploma in Legal Practice. She is currently a master's candidate, where her research explores the criminalization of cyber laws and its impact on the right to freedom of expression in the digital era. With her expertise in research, teaching, project planning, management, monitoring, and reporting, Sauda is instrumental in leading our initiatives. She is a registered member of both the East African Law Society and the Uganda Law Society.",
    image: "/placeholder.svg",
    expertise: ["Research Management", "Program Development", "Cyber Law", "Women's Rights"],
    social: {
      linkedin: "#",
      email: "sauda@onetechconnect.org",
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
    name: "Abomugisha Dorothy",
    position: "Head Finance",
    bio: "Dorothy leads OTC's financial operations, ensuring fiscal responsibility and strategic financial planning that supports our mission of advancing digital transformation across Africa. Her expertise in financial management and accounting helps maintain transparency and accountability in all our operations.",
    image: "/placeholder.svg",
    expertise: ["Financial Management", "Strategic Planning", "Accounting", "Budget Management"],
    social: {
      linkedin: "#",
      email: "dorothy@onetechconnect.org",
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

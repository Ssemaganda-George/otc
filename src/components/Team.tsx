import { useState } from "react";
import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Ssekamwa Frank",
    pronouns: "(He/Him)",
    position: "Executive Director",
    bio: "Frank leads OTC as Chief Executive Director, bringing together expertise at the intersection of law, technology, and global health. He holds a Bachelor of Laws from Makerere University, a Postgraduate Diploma in Legal Practice from the Law Development Centre and a Master of Laws (LL.M.) specializing in Digital Health Rights in Low- and Middle-Income Countries. In addition to his academic qualifications, Frank has undertaken professional training in administrative science, climate change, digital health, reproductive health, and project management. His career spans diverse roles with the High Court of Uganda, leading law firms and Afya na Haki Institute equipping him with a unique blend of experience in research, strategic litigation, capacity building, and project leadership. Frank is a Tech Lawyer and Innovator passionate about advancing digital rights and justice in Africa. He is an active member of both the East African Law Society and the Uganda Law Society.",
    image: "/images/Frank.jpg",
    expertise: ["Digital Health Rights", "Tech Law", "Strategic Litigation", "Project Leadership"],
    social: {
      linkedin: "https://www.linkedin.com/in/ssekamwa-frank-451b6920b/",
      email: "frank@onetechconnect.org",
      twitter: "https://x.com/ssekamwafrank"
    }
  },
  {
    name: "Nakitende Sauda",
    pronouns: "",
    position: "Head of Research and Development (R&D)",
    bio: "Sauda is the Head of Research and Development at OTC, driven by a passion for ensuring that technological transformation advances the well-being and rights of women, children, and underserved communities across Africa. Sauda holds a Bachelor of Laws (Hons) and a first-class Diploma in Legal Practice. She is currently a master's candidate, where her research explores the criminalization of cyber laws and its impact on the right to freedom of expression in the digital era. With her expertise in research, teaching, project planning, management, monitoring, and reporting, Sauda is instrumental in leading our initiatives. She is a registered member of both the East African Law Society and the Uganda Law Society.",
    image: "/images/Sauda.jpg",
    expertise: ["Research Management", "Program Development", "Cyber Law", "Women's Rights"],
    social: {
      linkedin: "#",
      email: "sauda@onetechconnect.org",
      twitter: "#"
    }
  },
  {
    name: "Kalivayo Blair",
    pronouns: "(He/Him)",
    position: "Director of Operations",
    bio: "Blair is the founding Director of Operations, a distinguished corporate lawyer with a profound passion for the intersection of law and ICT. Blair holds a Bachelor of Laws from Makerere University and a Post-Graduate Diploma in Legal Practice, supplemented by several relevant professional training certifications. His expertise is extensive, covering banking, corporate governance, insolvency practice, Mergers and Acquisitions (M&A), Intellectual Property (IP), Technology, Media, and Telecommunications (TMT). Over the years, Blair has been instrumental in the success of numerous start-ups across Uganda, East, and West Africa. His career includes serving with some of Uganda's leading law firms, providing him with a wealth of practical experience. He is a respected member of both the Uganda Law Society and the East African Law Society.",
    image: "/images/Blair.jpg",
    expertise: ["Corporate Law", "M&A", "Intellectual Property", "TMT Law"],
    social: {
      linkedin: "https://www.linkedin.com/in/blair-kalivayo-748007198/",
      email: "blair@onetechconnect.org",
      twitter: "https://x.com/blairekalivayo"
    }
  },
  {
    name: "Abomugisha Dorothy",
    pronouns: "",
    position: "Head Finance",
    bio: "Dorothy leads OTC's financial operations, ensuring fiscal responsibility and strategic financial planning that supports our mission of advancing digital transformation across Africa. Her expertise in financial management and accounting helps maintain transparency and accountability in all our operations.",
    image: "/images/Dorothy.jpg",
    expertise: ["Financial Management", "Strategic Planning", "Accounting", "Budget Management"],
    social: {
      linkedin: "#",
      email: "dorothy@onetechconnect.org",
      twitter: "#"
    }
  },
  {
    name: "Catherine Matama",
    pronouns: "",
    position: "Programme Officer, Research & Community Engagement",
    bio: "Catherine is the Programme Officer for Research and Community Engagement at OTC. She supports the development and coordination of programmes that bridge research, innovation,and advocacy to ensure that digital transformation reflects the voices and needs of communities at the grassroots.Dorothy leads OTC's financial operations, ensuring fiscal responsibility and strategic financial planning that supports our mission of advancing digital transformation across Africa. Her expertise in financial management and accounting helps maintain transparency and accountability in all our operations. She holds a Bachelor’s Degree in Environmental Health Science (Second Class Upper Division)from Makerere University and has professional experience in public research, environmental health and regulatory compliance. Catherine has previously worked as a Researcher, Health and Hygiene Inspector contributing to the enforcement of health, safety and environmental standards for Uganda’s first oil pipeline project. Catherine is passionate about inclusive research, innovation, environmental sustainability and ensuring that digital transformation benefits communities at the last mile.",
    image: "/images/Catherine.jpg",
    expertise: ["Inclusive Research", "Innovation", "Environmental Sustainability", "Digital Transformation"],
    social: {
      linkedin: "#",
      email: "dorothy@onetechconnect.org",
      twitter: "#"
    }
  }
];

export function Team() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className={`mx-auto transition-all duration-500 ${expanded !== null ? 'max-w-7xl' : 'max-w-6xl'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Team
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Meet the innovative minds behind OneTechConnect.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-blue transition-all duration-500 card-hover
                  ${expanded === index ? "ring-2 ring-primary/30" : ""}
                  opacity-0 translate-y-8 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "forwards" }}
              >
                {/* Profile Image */}
                <div className="relative h-80 bg-gradient-to-br from-secondary/80 to-secondary/60 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-1">
                      {member.name} {member.pronouns && <span className="text-muted-foreground font-normal text-sm">{member.pronouns}</span>}
                    </h3>
                    <p className="text-primary font-medium">{member.position}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Only show bio and expertise if expanded */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden
                      ${expanded === index ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}
                    `}
                  >
                    {expanded === index && (
                      <>
                        <p className="text-body text-muted-foreground mb-6 leading-relaxed transition-opacity duration-500">
                          {member.bio}
                        </p>
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
                      </>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Button 
                      asChild
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <a href={`mailto:${member.social.email}`}>
                        <MailIcon className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="ghost-golden" 
                      size="icon"
                      className="w-8 h-8"
                    >
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>

                  {/* More Details Button */}
                  <Button
                    variant="outline"
                    className="w-full shadow-md transition-all duration-200 hover:shadow-lg hover:bg-primary/10 active:scale-95 focus:ring-2 focus:ring-primary focus:outline-none"
                    onClick={() => setExpanded(expanded === index ? null : index)}
                  >
                    {expanded === index ? "Hide Details" : "View Profile"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-secondary/60 rounded-2xl p-8 border border-border">
              <h3 className="heading-card text-gradient-blue mb-4">
                Join Our Mission
              </h3>
              <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for passionate individuals who share our vision 
                of advancing digital Justice in Africa.
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

// Add to your global CSS (e.g., src/index.css or tailwind.css):
/*
@keyframes fade-in {
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
}
*/
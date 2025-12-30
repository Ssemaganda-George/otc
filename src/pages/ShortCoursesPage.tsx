import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { GraduationCap, Brain, Shield, BookOpen, Users, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingCourses = [
  {
    id: 1,
    title: "AI and Health Rights in Africa",
    description: "Comprehensive exploration of artificial intelligence applications in healthcare while ensuring fundamental human rights protection across African contexts.",
    duration: "6 weeks",
    format: "Self-paced",
    level: "Intermediate",
    icon: Brain,
    features: [
      "AI ethics in healthcare",
      "Rights-based AI development",
      "Case studies from African contexts",
      "Regulatory compliance frameworks"
    ]
  },
  {
    id: 2,
    title: "Data Privacy and Protection in Africa",
    description: "In-depth analysis of data protection laws, privacy rights, and compliance requirements across African jurisdictions.",
    duration: "8 weeks",
    format: "Self-paced",
    level: "Beginner to Advanced",
    icon: Shield,
    features: [
      "African data protection laws",
      "GDPR compliance in African context",
      "Privacy by design principles",
      "Cross-border data transfers"
    ]
  }
];

const targetAudience = [
  {
    icon: Users,
    title: "Lawyers",
    description: "Legal professionals specializing in technology and human rights law"
  },
  {
    icon: BookOpen,
    title: "Policymakers",
    description: "Government officials and policy developers in tech regulation"
  },
  {
    icon: Brain,
    title: "Health Professionals",
    description: "Healthcare workers navigating digital transformation"
  },
  {
    icon: GraduationCap,
    title: "Innovators",
    description: "Tech entrepreneurs and innovation leaders"
  },
  {
    icon: Shield,
    title: "Activists",
    description: "Human rights advocates and digital rights defenders"
  }
];

export default function ShortCoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-display text-gradient-blue mb-8">
                Short Courses
                <span className="block text-lg text-golden font-normal mt-2">(Coming Soon)</span>
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                As part of our capacity-building work, OTC will offer self-paced short courses to equip stakeholders 
                with practical knowledge on pressing issues at the intersection of technology and rights. These courses 
                will draw from cutting-edge research, case law, and published works to build critical skills.
              </p>
            </div>
          </div>
        </section>

        {/* Course Features */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Why Choose Our Courses
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our courses are designed with African contexts in mind, featuring practical applications and real-world case studies
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  {
                    icon: Clock,
                    title: "Self-Paced Learning",
                    description: "Learn at your own pace with flexible scheduling"
                  },
                  {
                    icon: BookOpen,
                    title: "Research-Based",
                    description: "Content drawn from cutting-edge research and case law"
                  },
                  {
                    icon: Users,
                    title: "African Focus",
                    description: "Specifically designed for African contexts and challenges"
                  },
                  {
                    icon: Award,
                    title: "Expert-Led",
                    description: "Courses developed by leading practitioners and researchers"
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-card border border-border p-6 shadow-card hover:shadow-blue transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Inaugural Courses */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Inaugural Courses
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Starting with two essential courses that address critical gaps in technology and rights education
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {upcomingCourses.map((course, index) => (
                  <div key={course.id} className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mr-6">
                        <course.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </span>
                          <span>•</span>
                          <span>{course.format}</span>
                          <span>•</span>
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-body text-muted-foreground leading-relaxed mb-6">
                      {course.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Course Highlights:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="ghost-golden" size="sm" disabled className="w-full">
                      Coming Soon
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Who Should Take These Courses
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our courses are designed for professionals working at the intersection of technology and human rights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {targetAudience.map((audience, index) => (
                  <div key={index} className="bg-card border border-border p-6 shadow-card hover:shadow-blue transition-all duration-300 text-center">
                    <div className="w-12 h-12 bg-golden/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <audience.icon className="w-6 h-6 text-golden" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notify Me Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-section text-gradient-blue mb-6">
                Be the First to Know
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Get notified when our courses launch and receive early access to enrollment. 
                Join our waitlist to stay updated on course availability and special offers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="golden" size="lg" className="group">
                  Join Waitlist
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

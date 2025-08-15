import { Mail, Phone, MapPin, Send, ArrowRight, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function HomeContact() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Get In Touch
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto text-justify sm:text-center">
              Ready to advance your tech innovation with expert legal guidance? 
              Contact us today to discuss how we can support your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="heading-card text-gradient-blue mb-6">
                  Let's Connect
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-8 text-justify sm:text-left">
                  Whether you're a tech entrepreneur, legal professional, or organization 
                  looking to make a positive impact, we're here to help you navigate 
                  Africa's digital transformation.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Location</h4>
                    <p className="text-muted-foreground">Kingdom Kampala Building, Uganda</p>
                    <p className="text-sm text-muted-foreground">Serving all of Africa</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">+256-778410315</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EAT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">info@onetechconnect.org</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Twitter className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Twitter</h4>
                    <p className="text-muted-foreground">@OneTechConnect</p>
                    <p className="text-sm text-muted-foreground">Follow us for updates</p>
                  </div>
                </div>
              </div>

              {/* Quick Services */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <h4 className="font-playfair font-semibold text-gradient-blue mb-4">
                  How We Can Help
                </h4>
                <div className="space-y-3">
                  {[
                    "Legal compliance consultation",
                    "Tech startup legal guidance", 
                    "Regulatory framework navigation",
                    "Intellectual property protection",
                    "Partnership opportunities"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-sm text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <h3 className="heading-card text-gradient-blue mb-6">
                Send Us a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input placeholder="Enter your first name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input placeholder="Enter your last name" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input type="email" placeholder="Enter your email address" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <Input placeholder="Enter your organization name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    How can we help? *
                  </label>
                  <Textarea 
                    placeholder="Tell us about your project, questions, or how you'd like to collaborate..."
                    rows={4}
                    required
                  />
                </div>

                <Button variant="golden" size="lg" className="w-full group">
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need more detailed information?
                </p>
                <Link to="/contact">
                  <Button variant="ghost-golden" className="group">
                    Visit Full Contact Page
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

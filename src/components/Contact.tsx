import { MapPin, Phone, Mail, Send, ArrowRight, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Partner With Us
            </h2>
            <p className="text-body text-muted-foreground max-w-4xl mx-auto">
              Ready to advance Africa's tech-legal landscape? Join us in creating sustainable, 
              rights-respecting technology solutions that empower innovation across the continent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="heading-card text-gradient-blue mb-6">
                  Let's Connect
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-8">
                  Whether you're a tech entrepreneur, legal professional, researcher, or organization 
                  looking to make a positive impact, we'd love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Location</h4>
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
                    <p className="text-sm text-muted-foreground">Available during business hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">info@onetechconnect.org</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
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

              {/* Partnership Opportunities */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <h4 className="font-playfair font-semibold text-gradient-blue mb-4">
                  Partnership Opportunities
                </h4>
                <div className="space-y-3">
                  {[
                    "Legal service partnerships",
                    "Research collaborations", 
                    "Training and capacity building",
                    "Policy advocacy initiatives",
                    "Innovation funding and support"
                  ].map((opportunity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-sm text-muted-foreground">{opportunity}</span>
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
                      First Name
                    </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="Enter your email address" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <Input placeholder="Enter your organization name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input placeholder="What's this about?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your project, questions, or how you'd like to collaborate..."
                    rows={5}
                  />
                </div>

                <Button variant="golden" size="lg" className="w-full group">
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="heading-card text-gradient-blue mb-4">
                Stay Updated
              </h3>
              <p className="text-body text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest insights on tech law, policy updates, 
                and innovation opportunities across Africa.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button variant="golden" className="group">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

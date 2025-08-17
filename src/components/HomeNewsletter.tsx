import { Mail, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HomeNewsletter() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Newsletter Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="w-10 h-10 text-background" />
            </div>
            
            {/* Header */}
            <h2 className="heading-section text-gradient-blue mb-6">
              Stay Connected
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto text-justify sm:text-center leading-relaxed">
              Get the latest insights on tech law, innovation updates, and legal 
              developments across Africa delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Value Proposition */}
            <div className="space-y-6">
              <h3 className="heading-card text-gradient-blue">
                What You'll Receive
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Weekly Tech Law Updates",
                    description: "Latest legal developments affecting African tech"
                  },
                  {
                    title: "Innovation Spotlights", 
                    description: "Success stories and emerging opportunities"
                  },
                  {
                    title: "Regulatory Insights",
                    description: "Expert analysis on compliance and policy changes"
                  },
                  {
                    title: "Exclusive Resources",
                    description: "Templates, guides, and frameworks for entrepreneurs"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>📈 500+ subscribers</span>
                  <span>📧 Weekly delivery</span>
                  <span>🔒 No spam, ever</span>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <h3 className="heading-card text-gradient-blue mb-6 text-center">
                Join Our Community
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="h-12"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name (Optional)
                  </label>
                  <Input 
                    placeholder="Enter your first name"
                    className="h-12"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                    Your Interest (Optional)
                  </label>
                  <select 
                    id="interest"
                    name="interest"
                    className="w-full h-12 px-3 py-2 bg-background border border-input rounded-md text-foreground"
                    title="Select your primary interest"
                  >
                    <option value="">Select your primary interest</option>
                    <option value="legal">Legal Compliance</option>
                    <option value="startup">Tech Entrepreneurship</option>
                    <option value="innovation">Innovation & Policy</option>
                    <option value="investment">Investment & Funding</option>
                    <option value="general">General Updates</option>
                  </select>
                </div>

                <Button variant="golden" size="lg" className="w-full group">
                  Subscribe Now
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By subscribing, you agree to receive emails from OneTechConnect. 
                  You can unsubscribe at any time. We respect your privacy and will 
                  never share your information.
                </p>
              </form>
            </div>
          </div>

          {/* Social Proof & CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h4 className="font-playfair font-semibold text-gradient-blue mb-4">
                Join Tech Leaders Across Africa
              </h4>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-justify sm:text-center">
                Connect with entrepreneurs, lawyers, policymakers, and innovators 
                who are shaping the future of technology in Africa.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Tech Entrepreneurs
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Legal Professionals
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Policy Makers
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Investors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

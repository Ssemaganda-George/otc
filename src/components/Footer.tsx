import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Team", href: "#team" },
  { name: "Areas of Work", href: "#areas" },
  { name: "Programmes", href: "#programmes" },
  { name: "Contact", href: "#contact" }
];

const services = [
  { name: "Hackathon Program", href: "#services" },
  { name: "Legal Support", href: "#services" },
  { name: "Research & Training", href: "#services" },
  { name: "Strategic Advocacy", href: "#services" }
];

const programmes = [
  { name: "AfricanIntelligenceNow (AINow)", href: "#programmes" },
  { name: "EmpowerThem (EMP)", href: "#programmes" },
  { name: "BigTechAfrica (BiTA)", href: "#programmes" },
  { name: "One Tech Approach (OTA)", href: "#programmes" }
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
  { name: "Legal Disclaimer", href: "#" }
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <img 
                  src="/Logo.png" 
                  alt="OneTechConnect Logo" 
                  className="h-8 w-auto"
                />
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Advancing tech, social and legal services to empower African innovation through 
                rights-respecting technology solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Kampala, Uganda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">+256 XXX XXX XXX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">info@onetechconnect.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-playfair font-semibold text-gradient-golden mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-playfair font-semibold text-gradient-golden mb-6">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h4 className="font-playfair font-semibold text-gradient-golden mb-4">
                  Programmes
                </h4>
                <ul className="space-y-2">
                  {programmes.map((programme) => (
                    <li key={programme.name}>
                      <a 
                        href={programme.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xs"
                      >
                        {programme.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources & Newsletter */}
            <div>
              <h3 className="font-playfair font-semibold text-gradient-golden mb-6">
                Stay Connected
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                Get the latest updates on African tech law and innovation.
              </p>

              <div className="space-y-4 mb-6">
                <Button variant="ghost-golden" size="sm" className="w-full justify-start group">
                  <span>Subscribe to Newsletter</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost-golden" size="sm" className="w-full justify-start group">
                  <span>Follow on LinkedIn</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost-golden" size="sm" className="w-full justify-start group">
                  <span>Join Our Community</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Core Values */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold text-primary text-sm mb-2">Our Values</h4>
                <div className="flex flex-wrap gap-2">
                  {["Innovation", "Interoperability", "Equity", "Human Rights"].map((value) => (
                    <span key={value} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 OneTechConnect. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {legalLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground italic max-w-3xl mx-auto">
              "Working towards a Digitized Africa where respect for human rights and access to justice is for everyone."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

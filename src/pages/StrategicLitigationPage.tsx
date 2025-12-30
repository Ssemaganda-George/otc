import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Scale, ExternalLink, Calendar, MapPin, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const litigationCases = [
  {
    no: 1,
    caseName: "Ssekamwa Frank & 3 Others v Google LLC",
    issues: "Privacy violation & non-compliance, access to justice, distress, cross border transfer & Data Sovereignty",
    country: "Uganda",
    yearFiled: "November 2024",
    status: "Successful decision issued by the PDPO",
    statusType: "success"
  },
  {
    no: 2,
    caseName: "Google LLC v Ssekamwa Frank & 3 Others",
    issues: "Time jurisdiction & Extraterritorial application of Uganda's data law",
    country: "Uganda",
    yearFiled: "August 2025",
    status: "Appeal by Google LLC before the Minister for ICT&NG",
    statusType: "pending"
  },
  {
    no: 3,
    caseName: "OneTechConnect (OTC) & 3 Others v Google LLC",
    issues: "Privacy Ruling Enforcement, DPIAs and Administrative fines",
    country: "Uganda",
    yearFiled: "Pending",
    status: "Hearing before the PDPO",
    statusType: "active"
  }
];

export default function StrategicLitigationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                Strategic Litigation
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                We offer strategic legal services, including case conceptualization, strategic interest litigation, 
                and expert legal strategies. We also provide professional opinions on tax compliance and other 
                legal matters related to tech and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Our Legal Services
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive legal support for technology and innovation across Africa
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: Scale,
                    title: "Case Conceptualization",
                    description: "Strategic development and planning of legal cases with comprehensive analysis"
                  },
                  {
                    icon: FileText,
                    title: "Strategic Interest Litigation",
                    description: "High-impact litigation that advances legal precedents and protects rights"
                  },
                  {
                    icon: CheckCircle,
                    title: "Expert Legal Strategies",
                    description: "Professional opinions on tax compliance and tech-related legal matters"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Litigation Database */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-section text-gradient-blue mb-6">
                  Litigation Database
                </h2>
                <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                  Our track record of strategic litigation cases advancing digital rights and technology law in Africa
                </p>
              </div>

              <div className="bg-card border border-border overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary/5 border-b border-border">
                      <tr>
                        <th className="text-left p-4 font-semibold text-foreground">No.</th>
                        <th className="text-left p-4 font-semibold text-foreground">Case Name</th>
                        <th className="text-left p-4 font-semibold text-foreground">Issues</th>
                        <th className="text-left p-4 font-semibold text-foreground">Country</th>
                        <th className="text-left p-4 font-semibold text-foreground">Year of Filing</th>
                        <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {litigationCases.map((case_item, index) => (
                        <tr key={index} className="border-b border-border hover:bg-secondary/10 transition-colors">
                          <td className="p-4">
                            <span className="font-medium text-primary">{case_item.no}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium text-foreground">{case_item.caseName}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-muted-foreground text-sm leading-relaxed">{case_item.issues}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">{case_item.country}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">{case_item.yearFiled}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              case_item.statusType === 'success' ? 'bg-green-100 text-green-800' :
                              case_item.statusType === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {case_item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button variant="golden" size="lg" className="group">
                  Explore Full Database
                  <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

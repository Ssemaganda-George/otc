import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Phone, Mail, Building } from "lucide-react";

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-golden to-golden/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                Support Our Mission
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Your donation helps us champion digital rights and innovation across Africa
              </p>
            </div>
          </div>
        </section>

        {/* Main Donation Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-xl">
                <CardHeader className="text-center bg-blue-50">
                  <CardTitle className="text-3xl text-blue-900 mb-2">Make a Donation</CardTitle>
                  <CardDescription className="text-lg">Every contribution makes a difference</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount (UGX)</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {[50000, 100000, 250000, 500000].map((amount) => (
                          <button key={amount} className="py-4 px-4 border-2 border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all font-semibold text-blue-900">
                            UGX {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Amount (UGX)</label>
                      <Input type="number" placeholder="100000" className="text-lg py-6" min="10000" />
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Information (Optional)</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <Input placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <Input type="email" placeholder="your.email@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <Input type="tel" placeholder="+256 700 000 000" />
                        </div>
                      </div>
                    </div>
                    <Button variant="golden" size="lg" className="w-full text-lg py-6">Proceed to Payment</Button>
                    <p className="text-xs text-gray-500 text-center">You will be redirected to complete your payment securely</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      {/* Payment Information */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-8 text-center">How to Donate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">Mobile Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Send your contribution via Mobile Money</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-900">MTN & Airtel Money</p>
                    <p className="text-gray-700">Available upon request</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">Bank Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Direct bank transfer</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-900">Bank Details</p>
                    <p className="text-gray-700">Contact us for account information</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-golden" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">For assistance or questions</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-900">Get in Touch</p>
                    <p className="text-gray-700">info@onetechconnect.org</p>
                    <p className="text-gray-700">+256-778410315</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-playfair font-bold text-gradient-blue mb-6">Your Impact</h2>
            <p className="text-body text-muted-foreground leading-relaxed mb-8">Your donation supports our work in strategic litigation, innovation programs, digital rights advocacy, and capacity building across Africa. Together, we're creating a more just and innovative digital future.</p>
            <div className="bg-card border border-border p-6 shadow-card">
              <p className="text-body text-muted-foreground">All donations are used to directly fund our programs and initiatives. We maintain full transparency and provide regular impact reports to our supporters.</p>
            </div>
          </div>
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonatePage;

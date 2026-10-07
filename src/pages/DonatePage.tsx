import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Phone, Mail, Building } from "lucide-react";

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />

      <SiteHeader />

      <Navigation />
      
      <main className="pt-6">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-8">
                Support Our Mission
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Your donation helps us champion digital rights and innovation across Africa
              </p>
            </div>
          </div>
        </section>

        {/* Main Donation Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Card className="border border-gray-200 rounded-2xl shadow-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">Make a Donation</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">Every contribution makes a difference</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-base font-medium text-foreground mb-3">Select Amount (UGX)</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {[50000, 100000, 250000, 500000].map((amount) => (
                          <button key={amount} className="py-4 px-4 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all font-semibold text-foreground">
                            UGX {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-foreground mb-2">Or Enter Custom Amount (UGX)</label>
                      <Input type="number" placeholder="100000" className="text-lg py-6" min="10000" />
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Information (Optional)</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-base font-medium text-foreground mb-2">Name</label>
                          <Input placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-foreground mb-2">Email</label>
                          <Input type="email" placeholder="your.email@example.com" />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-foreground mb-2">Phone Number</label>
                          <Input type="tel" placeholder="+256 700 000 000" />
                        </div>
                      </div>
                    </div>
                     <Button variant="golden" size="lg" className="w-full px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide">Proceed to Payment</Button>
                     <p className="text-base text-muted-foreground text-center">You will be redirected to complete your payment securely</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      {/* Payment Information */}
       <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-8 text-center">How to Donate</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                 <CardHeader>
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                     <Phone className="w-6 h-6 text-primary" />
                   </div>
                   <CardTitle className="text-2xl text-foreground">Mobile Money</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-xl mb-3">Send your contribution via Mobile Money</p>
                   <div className="space-y-2 text-xl">
                     <p className="font-semibold text-foreground">MTN & Airtel Money</p>
                     <p className="text-muted-foreground">Available upon request</p>
                   </div>
                 </CardContent>
               </Card>
               <Card className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                 <CardHeader>
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                     <Building className="w-6 h-6 text-primary" />
                   </div>
                   <CardTitle className="text-2xl text-foreground">Bank Transfer</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-xl mb-3">Direct bank transfer</p>
                   <div className="space-y-2 text-xl">
                     <p className="font-semibold text-foreground">Bank Details</p>
                     <p className="text-muted-foreground">Contact us for account information</p>
                   </div>
                 </CardContent>
               </Card>
               <Card className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                 <CardHeader>
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                     <Mail className="w-6 h-6 text-primary" />
                   </div>
                   <CardTitle className="text-2xl text-foreground">Contact Us</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground text-xl mb-3">For assistance or questions</p>
                   <div className="space-y-2 text-xl">
                     <p className="font-semibold text-foreground">Get in Touch</p>
                     <p className="text-muted-foreground">info@onetechconnect.org</p>
                     <p className="text-muted-foreground">+256-778410315</p>
                   </div>
                 </CardContent>
               </Card>
             </div>
           </div>
         </div>
       </section>

       {/* Impact Statement */}
         <section className="py-24 bg-white">
           <div className="max-w-7xl mx-auto px-6 lg:px-8">
             <div className="max-w-3xl mx-auto text-center">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">Your Impact</h2>
               <p className="text-xl text-muted-foreground leading-relaxed mb-8">Your donation supports our work in strategic litigation, innovation programs, digital rights advocacy, and capacity building across Africa. Together, we're creating a more just and innovative digital future.</p>
               <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                 <p className="text-xl text-muted-foreground">All donations are used to directly fund our programs and initiatives. We maintain full transparency and provide regular impact reports to our supporters.</p>
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

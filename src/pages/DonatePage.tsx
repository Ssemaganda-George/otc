import { Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Sparkles, Check } from "lucide-react";

const DonatePage = () => {
  const donationTiers = [
    {
      amount: 1000,
      name: "Supporter",
      icon: Heart,
      benefits: [
        "Monthly newsletter updates",
        "Recognition on our website",
        "Digital certificate of appreciation",
      ],
    },
    {
      amount: 5000,
      name: "Advocate",
      icon: Shield,
      benefits: [
        "All Supporter benefits",
        "Invitation to annual impact webinar",
        "Quarterly impact reports",
        "Early access to publications",
      ],
      popular: true,
    },
    {
      amount: 10000,
      name: "Champion",
      icon: Sparkles,
      benefits: [
        "All Advocate benefits",
        "Recognition in annual report",
        "Invitation to exclusive events",
        "Direct updates from leadership",
        "Opportunity to sponsor specific initiatives",
      ],
    },
  ];

  const impactAreas = [
    {
      title: "Strategic Litigation",
      description: "Support landmark cases that set precedents for digital rights across Africa",
      icon: Shield,
    },
    {
      title: "Innovation Hub",
      description: "Fund hackathons, innovation challenges, and tech solutions for social good",
      icon: Sparkles,
    },
    {
      title: "Digital Justice Training",
      description: "Empower communities with knowledge about their digital rights and freedoms",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Empower Africa's Digital Future
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your contribution drives meaningful change in digital rights, innovation, and justice across Africa
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="golden" 
              size="lg"
              className="text-lg px-8 py-6"
              asChild
            >
              <a href="#donate-now">Donate Now</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-blue-50"
              asChild
            >
              <a href="#impact">See Our Impact</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">500+</div>
              <div className="text-gray-600">Cases Supported</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-golden mb-2">10,000+</div>
              <div className="text-gray-600">People Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">15</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Money Goes */}
      <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
            Where Your Money Goes
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Every donation directly funds our mission to advance digital rights and innovation across Africa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="border-2 hover:border-golden transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-700" />
                    </div>
                    <CardTitle className="text-xl text-blue-900">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {area.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section id="donate-now" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
            Choose Your Impact Level
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Select a donation tier or contribute a custom amount
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {donationTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative border-2 transition-all hover:shadow-xl ${
                    tier.popular 
                      ? 'border-golden shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-golden text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-700" />
                    </div>
                    <CardTitle className="text-2xl text-blue-900">{tier.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold text-blue-700">
                        KES {tier.amount.toLocaleString()}
                      </span>
                      <span className="text-gray-500"> /month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={tier.popular ? "golden" : "outline"}
                      className="w-full"
                      size="lg"
                    >
                      Select {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Amount */}
          <Card className="max-w-2xl mx-auto border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Custom Amount</CardTitle>
              <CardDescription>
                Choose your own contribution amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Amount (KES)
                    </label>
                    <input
                      type="number"
                      placeholder="5000"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      min="100"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="golden" size="lg" className="px-8">
                      Donate
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  All donations are tax-deductible. You'll receive a receipt via email.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">
            Secure Payment Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">M-Pesa</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">Bank Transfer</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">Card</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">PayPal</div>
            </div>
          </div>
          <p className="text-gray-600">
            All transactions are encrypted and secure. We never store your payment information.
          </p>
        </div>
      </section>

      {/* Corporate & Institutional Giving */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-3xl text-blue-900">
                Corporate & Institutional Giving
              </CardTitle>
              <CardDescription className="text-lg">
                Partner with us to create lasting impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We offer customized partnership opportunities for organizations looking to support digital rights 
                and innovation in Africa. Our corporate partnerships include:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Sponsorship of specific programs or initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Employee engagement and matching gift programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Co-branded initiatives and thought leadership opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom impact reporting and recognition</span>
                </li>
              </ul>
              <div className="pt-4">
                <Button variant="golden" size="lg" asChild>
                  <Link to="/contact">Contact Us for Partnerships</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my donation tax-deductible?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, all donations to SAK OTC Launchpad are tax-deductible to the extent allowed by law. 
                  You will receive a receipt for your records.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How will my donation be used?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your donation directly funds our programs in strategic litigation, innovation support, and 
                  digital rights education. We maintain full transparency and provide regular impact reports.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I make a one-time donation?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! While we appreciate recurring donations, one-time contributions are equally valuable 
                  and welcome. Simply use the custom amount option above.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I cancel my recurring donation?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can cancel your recurring donation at any time by contacting us or through your donor 
                  portal. We'll process your request immediately with no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of supporters empowering Africa's digital future
          </p>
          <Button 
            variant="golden" 
            size="lg"
            className="text-lg px-8 py-6"
            asChild
          >
            <a href="#donate-now">Donate Now</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonatePage;

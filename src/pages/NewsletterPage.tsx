import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Check, Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await fetch("https://formspree.io/f/mdkwwayn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter. Check your email for confirmation.",
        });
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      title: "Latest Updates",
      description: "Stay informed about groundbreaking tech law developments across Africa",
      icon: Newspaper,
    },
    {
      title: "Exclusive Insights",
      description: "Get expert analysis on policy changes and their impact on innovation",
      icon: Mail,
    },
    {
      title: "Early Access",
      description: "Be the first to know about our programs, events, and opportunities",
      icon: Check,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Stay connected with the latest in African tech law, digital rights, and innovation
          </p>
        </div>
      </section>

      {/* Main Subscription Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-blue-900 mb-2">
                Join Our Community
              </CardTitle>
              <CardDescription className="text-lg">
                Get monthly updates delivered straight to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="text-lg py-6"
                    required
                  />
                </div>
                <Button 
                  variant="golden" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to receive our newsletter. You can unsubscribe at any time. 
                  We respect your privacy and will never share your email.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
            What You'll Receive
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our newsletter brings you curated content on tech law, digital rights, and innovation across Africa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:border-golden transition-colors text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-700" />
                    </div>
                    <CardTitle className="text-xl text-blue-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Newsletter Highlights
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Case Updates & Legal Analysis",
                description: "Detailed breakdowns of landmark cases like our Google v Uganda case, with expert legal commentary"
              },
              {
                title: "Policy & Regulatory Changes",
                description: "Track data protection laws, tech regulations, and policy developments across African nations"
              },
              {
                title: "Innovation Hub Updates",
                description: "Learn about hackathons, innovation challenges, and funding opportunities for African tech entrepreneurs"
              },
              {
                title: "Digital Rights Advocacy",
                description: "Understand how digital rights impact health, finance, agriculture, and development sectors"
              },
              {
                title: "Program Announcements",
                description: "Be the first to know about our training programs, workshops, and partnership opportunities"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-golden rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequency & Privacy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  We send our newsletter monthly, ensuring you stay informed without overwhelming your inbox. 
                  Special editions may be sent for urgent updates or major announcements.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Your Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  We respect your privacy and will never sell, rent, or share your email address. 
                  You can unsubscribe at any time with a single click.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Ready to Stay Informed?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Join hundreds of professionals, activists, and innovators tracking Africa's digital future
          </p>
          <Button 
            variant="golden" 
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Subscribe Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsletterPage;

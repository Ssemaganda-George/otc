import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/newsletter";

const NewsletterPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await subscribeToNewsletter(email, "newsletter-page");
      if (result.ok) {
        toast({
          title: "Successfully subscribed!",
          description: result.already
            ? "This email is already subscribed to our newsletter."
            : "Thank you for subscribing to our newsletter. Check your email for confirmation.",
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
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-8">
                Subscribe to Our Newsletter
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Stay informed about the latest in African tech law, digital rights, and innovation
              </p>
            </div>
          </div>
        </section>

        {/* Main Subscription Form */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <Card className="border border-gray-200 rounded-2xl shadow-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    Join Our Community
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Get monthly updates delivered straight to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-base font-medium text-foreground mb-2">
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
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By subscribing, you agree to receive our newsletter. You can unsubscribe at any time. 
                      We respect your privacy and will never share your email.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Simple Info Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">
                What You'll Receive
              </h2>
              <p className="text-body text-muted-foreground leading-relaxed mb-8">
                Our monthly newsletter brings you curated updates on tech law, digital rights, policy changes, 
                innovation programs, and opportunities across Africa. Stay connected with groundbreaking developments 
                and be the first to know about our programs and events.
              </p>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <p className="text-body text-muted-foreground">
                  We send our newsletter monthly, ensuring you stay informed without overwhelming your inbox. 
                  We respect your privacy and will never sell or share your email address.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsletterPage;

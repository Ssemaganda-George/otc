import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />

      <main className="pt-6">
        <AOSWrapper animation="fade-up">
          <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                <Scale className="w-7 h-7" />
              </div>
              <p className="uppercase tracking-[0.25em] text-primary font-bold text-sm mb-4">Terms of Service</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: October 2026
              </p>
            </div>
          </section>
        </AOSWrapper>

        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10 text-muted-foreground leading-relaxed text-lg">
              <p>
                Welcome to <strong className="text-foreground">OneTechConnect (OTC)</strong>. These Terms of
                Service govern your use of our website and services. By accessing or using our website, you
                agree to comply with and be bound by these terms. If you do not agree, please refrain from
                using our website.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Use of Our Website</h2>
                <p>
                  You agree to use our website only for lawful purposes and in a manner that does not infringe
                  the rights of, restrict, or inhibit anyone else's use. You may not use our website to
                  transmit harmful, defamatory, or illegal content, or to engage in any activity that
                  interferes with the website's functionality.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Intellectual Property</h2>
                <p>
                  All content on our website — including text, images, logos, videos, and design — is the
                  property of OTC or its licensors and is protected by copyright and other intellectual
                  property laws. You may not reproduce, distribute, or create derivative works without our
                  prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Donations</h2>
                <p>
                  Donations made through our website are processed securely through trusted payment
                  processors. OTC is not responsible for issues arising from payment processing errors.
                  Donations are generally non-refundable except where required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites that are not owned or controlled by
                  OTC. We have no control over, and assume no responsibility for, the content, privacy
                  practices, or terms of such third-party sites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, OTC shall not be liable for any indirect,
                  incidental, or consequential damages arising from your use of, or inability to use, our
                  website or services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of Uganda,
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Changes to These Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the website
                  after changes constitutes acceptance of the updated terms. The "Last updated" date
                  above indicates the most recent revision.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us through our
                  <Link to="/contact" className="text-primary font-semibold hover:underline"> contact page</Link>.
                </p>
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>

      <Footer />
    </div>
  );
}

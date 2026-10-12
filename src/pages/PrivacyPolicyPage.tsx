import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
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
                <ShieldCheck className="w-7 h-7" />
              </div>
              <p className="uppercase tracking-[0.25em] text-primary font-bold text-sm mb-4">Privacy Policy</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
                Your Privacy Matters
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
                At <strong className="text-foreground">OneTechConnect (OTC)</strong>, we are committed to
                protecting your privacy and safeguarding your personal data. This Privacy Policy explains how
                we collect, use, store, and protect your information when you visit our website and use our
                services.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Information We Collect</h2>
                <p className="mb-4">
                  We may collect the following information when you interact with our website:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-foreground">Personal information</strong> — name, email address, and phone number when you subscribe to our newsletter, contact us, or donate.</li>
                  <li><strong className="text-foreground">Usage data</strong> — pages visited, time spent on pages, and interaction with content.</li>
                  <li><strong className="text-foreground">Device information</strong> — browser type, operating system, and IP address for analytics and security.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">How We Use Your Information</h2>
                <p>
                  We use your information to operate and improve our website, process donations, respond to
                  your inquiries, send you news and updates (only if you have opted in), and comply with
                  legal obligations. We never sell your personal data to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Data Storage & Security</h2>
                <p>
                  Your data is stored securely and protected with industry-standard measures. We retain your
                  personal information only as long as necessary to fulfil the purposes outlined in this
                  policy or as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Your Rights</h2>
                <p className="mb-4">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Withdraw consent at any time</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at the details provided on our
                  <Link to="/contact" className="text-primary font-semibold hover:underline"> contact page</Link>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Third-Party Services</h2>
                <p>
                  We may use trusted third-party services (such as analytics and payment processors) that
                  process data on our behalf. These services are contractually obligated to protect your
                  data and use it only for the purposes we specify.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this
                  page with an updated "Last updated" date. We encourage you to review this policy
                  periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or our data practices, please
                  reach out to us through our <Link to="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
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

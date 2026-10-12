import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export default function CookiesPolicyPage() {
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
                <Cookie className="w-7 h-7" />
              </div>
              <p className="uppercase tracking-[0.25em] text-primary font-bold text-sm mb-4">Cookie Policy</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
                How We Use Cookies
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
                This Cookie Policy explains how <strong className="text-foreground">OneTechConnect (OTC)</strong>
                uses cookies and similar technologies on our website. Cookies are small text files stored on
                your device that help us improve your browsing experience.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Types of Cookies We Use</h2>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-foreground">Essential cookies</strong> — required for the website to function, such as remembering your cookie preferences and maintaining secure sessions.</li>
                  <li><strong className="text-foreground">Analytics cookies</strong> — help us understand how visitors interact with our website so we can improve it.</li>
                  <li><strong className="text-foreground">Preference cookies</strong> — remember your choices (such as language or region) for a more personalised experience.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">How to Manage Cookies</h2>
                <p className="mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to refuse,
                  delete, or block cookies. However, disabling certain cookies may affect your experience on
                  our website.
                </p>
                <p>
                  When you first visit our website, a cookie consent banner appears in the bottom-left
                  corner. By clicking <strong className="text-foreground">"Accept"</strong>, you agree to our
                  use of cookies as described in this policy. Your preference is remembered so the banner
                  does not reappear on future visits.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Third-Party Cookies</h2>
                <p>
                  Some pages may embed content or use services (such as analytics) that set their own
                  cookies. These are governed by the respective providers' privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. Any changes will be posted on this
                  page with an updated "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-poppins mb-4">Contact Us</h2>
                <p>
                  If you have questions about our use of cookies, please contact us through our
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

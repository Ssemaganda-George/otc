import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-6">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

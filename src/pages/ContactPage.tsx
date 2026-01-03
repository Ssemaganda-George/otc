import { Navigation } from "@/components/ui/navigation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />
      <main className="pt-6">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

import { Navigation } from "@/components/ui/navigation";
import { ServicesComponent } from "@/components/ServicesComponent";
import { Footer } from "@/components/Footer";

const OurServicesPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <ServicesComponent />
      </main>
      <Footer />
    </div>
  );
};

export default OurServicesPage;

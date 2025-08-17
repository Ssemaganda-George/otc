import { Navigation } from "@/components/ui/navigation";
import { Services } from "@/components/Services";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <Services />
        <AreasOfWork />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

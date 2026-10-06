import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Services } from "@/components/Services";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

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

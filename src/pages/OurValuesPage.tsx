import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { OurValues } from "@/components/OurValues";
import { Footer } from "@/components/Footer";

const OurValuesPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <OurValues />
      </main>
      <Footer />
    </div>
  );
};

export default OurValuesPage;

import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { OTCFramework } from "@/components/OTCFrameworkComponent";
import { Footer } from "@/components/Footer";

const OTCFrameworkPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <OTCFramework />
      </main>
      <Footer />
    </div>
  );
};

export default OTCFrameworkPage;

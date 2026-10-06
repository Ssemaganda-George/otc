import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { OurApproach } from "@/components/OurApproach";
import { Footer } from "@/components/Footer";

const OurApproachPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <OurApproach />
      </main>
      <Footer />
    </div>
  );
};

export default OurApproachPage;

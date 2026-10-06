import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { StrategicPillars } from "@/components/StrategicPillars";
import { Footer } from "@/components/Footer";

const StrategicPillarsPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <StrategicPillars />
      </main>
      <Footer />
    </div>
  );
};

export default StrategicPillarsPage;

import { Navigation } from "@/components/ui/navigation";
import { OTCFramework } from "@/components/OTCFrameworkComponent";
import { Footer } from "@/components/Footer";

const OTCFrameworkPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <OTCFramework />
      </main>
      <Footer />
    </div>
  );
};

export default OTCFrameworkPage;

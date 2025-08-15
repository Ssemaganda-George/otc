import { Navigation } from "@/components/ui/navigation";
import { About } from "@/components/About";
import { OTCFramework } from "@/components/OTCFramework";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <About />
        <OTCFramework />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

import { Navigation } from "@/components/ui/navigation";
import { About } from "@/components/About";
<<<<<<< HEAD
import { OTCFramework } from "@/components/OTCFramework";
=======
import { Team } from "@/components/Team";
>>>>>>> chris
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <About />
<<<<<<< HEAD
        <OTCFramework />
=======
        <Team />
>>>>>>> chris
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

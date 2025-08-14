import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/Hero";
import { CorePrinciples } from "@/components/CorePrinciples";
import { About } from "@/components/About";
import { AreasOfWork } from "@/components/AreasOfWork";
import { Services } from "@/components/Services";
import { Programs } from "@/components/Programs";
import { OTCFramework } from "@/components/OTCFramework";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main>
        <Hero />
        <CorePrinciples />
        <About />
        <AreasOfWork />
        <Services />
        <Programs />
        <OTCFramework />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

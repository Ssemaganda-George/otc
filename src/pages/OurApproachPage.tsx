import { Navigation } from "@/components/ui/navigation";
import { OurApproach } from "@/components/OurApproach";
import { Footer } from "@/components/Footer";

const OurApproachPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <OurApproach />
      </main>
      <Footer />
    </div>
  );
};

export default OurApproachPage;

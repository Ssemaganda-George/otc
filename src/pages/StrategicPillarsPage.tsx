import { Navigation } from "@/components/ui/navigation";
import { StrategicPillars } from "@/components/StrategicPillars";
import { Footer } from "@/components/Footer";

const StrategicPillarsPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <StrategicPillars />
      </main>
      <Footer />
    </div>
  );
};

export default StrategicPillarsPage;

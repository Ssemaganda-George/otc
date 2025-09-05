import { Navigation } from "@/components/ui/navigation";
import { FocusAreas } from "@/components/FocusAreas";
import { Footer } from "@/components/Footer";

const FocusAreasPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <FocusAreas />
      </main>
      <Footer />
    </div>
  );
};

export default FocusAreasPage;

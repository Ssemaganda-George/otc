import { Navigation } from "@/components/ui/navigation";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Footer } from "@/components/Footer";

const WhoWeArePage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <WhoWeAre />
      </main>
      <Footer />
    </div>
  );
};

export default WhoWeArePage;

import { Navigation } from "@/components/ui/navigation";
import { OurValues } from "@/components/OurValues";
import { Footer } from "@/components/Footer";

const OurValuesPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <OurValues />
      </main>
      <Footer />
    </div>
  );
};

export default OurValuesPage;

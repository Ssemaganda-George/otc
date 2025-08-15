import { Navigation } from "@/components/ui/navigation";
import { Programs } from "@/components/Programs";
import { Footer } from "@/components/Footer";

const ProgramsPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <Programs />
      </main>
      <Footer />
    </div>
  );
};

export default ProgramsPage;

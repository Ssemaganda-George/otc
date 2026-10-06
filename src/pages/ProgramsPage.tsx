import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Programs } from "@/components/Programs";
import { Footer } from "@/components/Footer";

const ProgramsPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <Programs />
      </main>
      <Footer />
    </div>
  );
};

export default ProgramsPage;

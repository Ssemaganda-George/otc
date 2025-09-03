import { Navigation } from "@/components/ui/navigation";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <About />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

import { Navigation } from "@/components/ui/navigation";
import { About } from "@/components/About";
import { BoardMembers } from "@/components/BoardMembers";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />
      <main className="pt-6">
        <About />
        <BoardMembers />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

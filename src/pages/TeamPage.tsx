import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { BoardMembers } from "@/components/BoardMembers";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-6">
        <BoardMembers />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

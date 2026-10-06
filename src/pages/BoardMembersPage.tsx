import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { BoardMembers } from "@/components/BoardMembers";
import { Footer } from "@/components/Footer";

const BoardMembersPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      <TopBar />

      <SiteHeader />

      <Navigation />
      <main className="pt-20">
        <BoardMembers />
      </main>
      <Footer />
    </div>
  );
};

export default BoardMembersPage;

import { Navigation } from "@/components/ui/navigation";
import { BoardMembers } from "@/components/BoardMembers";
import { Footer } from "@/components/Footer";

const BoardMembersPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <BoardMembers />
      </main>
      <Footer />
    </div>
  );
};

export default BoardMembersPage;

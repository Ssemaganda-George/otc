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
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Meet the Team</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">The people behind OneTechConnect.</p>
              </div>
            </div>
          </section>
        </AOSWrapper>
        <BoardMembers />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

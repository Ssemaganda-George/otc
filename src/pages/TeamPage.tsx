import { Navigation } from "@/components/ui/navigation";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />
      <main className="pt-6">
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

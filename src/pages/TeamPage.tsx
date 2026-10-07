import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { BoardMembers } from "@/components/BoardMembers";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />
      <main className="pt-6">
        <Team />
        <BoardMembers />

        {/* Join Our Mission CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-primary/5 to-golden/5 rounded-none p-10 border border-primary/10 shadow-xl">
                <h3 className="heading-card text-primary mb-4 text-center">
                  Join Our Innovative Mission
                </h3>
                <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-center">
                  We're always looking for passionate individuals who share our vision of advancing digital justice in Africa through innovative technology and legal solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="golden" size="lg" className="px-8 py-3">
                    View Open Positions
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 border-primary/20 hover:bg-primary/5">
                    Learn More About Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

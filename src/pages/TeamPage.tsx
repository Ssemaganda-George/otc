import { Link } from "react-router-dom";
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
        <Team />
        <BoardMembers />

        {/* Join Our Mission CTA - Solid gold band */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Join Our Innovative Mission
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                We're always looking for passionate individuals who share our vision of advancing digital justice in Africa through innovative technology and legal solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center bg-white text-primary px-10 py-4 text-xl font-bold uppercase tracking-wide rounded-full hover:bg-golden-light transition-all duration-300 hover:scale-105 shadow-lg">
                  View Open Positions
                </Link>
                <Link to="/about/who-we-are" className="inline-flex items-center border-2 border-white text-white px-10 py-4 text-xl font-bold uppercase tracking-wide rounded-full hover:bg-white hover:text-primary transition-all duration-300">
                  Learn More About Us
                </Link>
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

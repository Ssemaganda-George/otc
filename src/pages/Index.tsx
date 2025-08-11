import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Team } from "@/components/Team";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Team />
      </main>
    </div>
  );
};

export default Index;

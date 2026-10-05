import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";

export default function DigitalEventsPage() {
  return (
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />
      <main className="pt-6">
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="uppercase tracking-widest text-primary font-bold text-sm mb-4">OTC Media Hub</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">Digital & Events</h1>
              <div className="inline-block bg-foreground text-white px-6 py-3 font-bold uppercase tracking-wide">
                Coming Soon
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>
      <Footer />
    </div>
  );
}

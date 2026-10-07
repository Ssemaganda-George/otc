import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const ELibraryPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <TopBar />

      <SiteHeader />

      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6">
              E-Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Digital library of resources, publications, and research materials
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">
                Digital Library Collection
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access our comprehensive digital library featuring publications, research papers, case studies, and educational materials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Publications */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Publications</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Books, reports, and policy documents
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Browse
                </button>
              </div>

              {/* Research */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Research</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Academic papers and research findings
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Explore
                </button>
              </div>

              {/* Case Studies */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Case Studies</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Real-world examples and impact stories
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  View Cases
                </button>
              </div>

              {/* Multimedia */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Multimedia</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Videos, podcasts, and presentations
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Watch & Listen
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ELibraryPage;
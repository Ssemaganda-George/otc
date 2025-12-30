import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";

const ELibraryPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              E-Library
            </h1>
            <p className="text-xl md:text-2xl font-inter max-w-3xl mx-auto">
              Digital library of resources, publications, and research materials
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins text-foreground mb-4">
                Digital Library Collection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access our comprehensive digital library featuring publications, research papers, case studies, and educational materials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Publications */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Publications</h3>
                <p className="text-gray-600 mb-4">
                  Books, reports, and policy documents
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  Browse
                </button>
              </div>

              {/* Research */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Research</h3>
                <p className="text-gray-600 mb-4">
                  Academic papers and research findings
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  Explore
                </button>
              </div>

              {/* Case Studies */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Case Studies</h3>
                <p className="text-gray-600 mb-4">
                  Real-world examples and impact stories
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  View Cases
                </button>
              </div>

              {/* Multimedia */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Multimedia</h3>
                <p className="text-gray-600 mb-4">
                  Videos, podcasts, and presentations
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
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
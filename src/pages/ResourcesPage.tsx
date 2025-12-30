import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Resources
            </h1>
            <p className="text-xl md:text-2xl font-inter max-w-3xl mx-auto">
              Access our comprehensive collection of digital justice resources and materials
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins text-foreground mb-4">
                Digital Justice Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of tools, guides, and materials to support digital rights and justice initiatives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Toolkits */}
              <div className="bg-white p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Toolkits</h3>
                <p className="text-gray-600 mb-4">
                  Practical guides and toolkits for digital rights advocacy and implementation.
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  Browse Toolkits
                </button>
              </div>

              {/* Research Papers */}
              <div className="bg-white p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Research Papers</h3>
                <p className="text-gray-600 mb-4">
                  Academic and policy research on digital justice, privacy, and human rights.
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  View Papers
                </button>
              </div>

              {/* Training Materials */}
              <div className="bg-white p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Training Materials</h3>
                <p className="text-gray-600 mb-4">
                  Educational resources and training modules for capacity building.
                </p>
                <button className="bg-primary text-white px-6 py-2 font-semibold hover:bg-primary-dark transition-colors">
                  Access Training
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

export default ResourcesPage;
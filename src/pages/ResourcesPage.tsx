import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const ResourcesPage = () => {
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
              Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our comprehensive collection of digital justice resources and materials
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">
                Digital Justice Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of tools, guides, and materials to support digital rights and justice initiatives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Toolkits */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Toolkits</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Practical guides and toolkits for digital rights advocacy and implementation.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Browse Toolkits
                </button>
              </div>

              {/* Research Papers */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Research Papers</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Academic and policy research on digital justice, privacy, and human rights.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  View Papers
                </button>
              </div>

              {/* Training Materials */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-4">Training Materials</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Educational resources and training modules for capacity building.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
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
import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const GetInvolvedPage = () => {
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
              Get Involved
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us in advancing digital justice and transformation across Africa
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-6">
                Ways to Get Involved
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                There are many ways you can contribute to our mission and help us create positive change.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Volunteer */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Volunteer</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Join our team of volunteers and contribute your skills and time to our various programs and initiatives.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Learn More
                </button>
              </div>

              {/* Donate */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Donate</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Support our work financially to help us reach more communities and create lasting impact.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Donate Now
                </button>
              </div>

              {/* Partner */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-4">Partner With Us</h3>
                <p className="text-muted-foreground text-xl mb-6">
                  Collaborate with us on projects, research, or initiatives that align with our mission.
                </p>
                <button className="bg-primary text-white px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors">
                  Contact Us
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

export default GetInvolvedPage;
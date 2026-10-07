import { Navigation } from "@/components/ui/navigation";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const PhilosophyPage = () => {
  return (
    <div className="min-h-screen bg-white custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <TopBar />

      <SiteHeader />

      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-foreground">
              Our Philosophy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide our approach to digital transformation and justice
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground mb-4">
                Guiding Principles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Our philosophy is rooted in African values, human rights, and ethical technology development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ubuntu Philosophy */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-primary mb-4">Ubuntu Philosophy</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  "I am because we are" - Our work is guided by the African philosophy of Ubuntu, emphasizing community, interconnectedness, and collective well-being.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We believe that digital transformation should benefit all members of society, not just a privileged few.
                </p>
              </div>

              {/* Human Rights Centered */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-primary mb-4">Human Rights Centered</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Digital rights are human rights. We advocate for privacy, freedom of expression, and access to information as fundamental rights in the digital age.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  All our initiatives prioritize the protection and advancement of human rights in digital spaces.
                </p>
              </div>

              {/* Ethical Technology */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-primary mb-4">Ethical Technology</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  We promote the development and use of technology that is ethical, inclusive, and beneficial to society.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our approach rejects harmful technologies and advocates for solutions that enhance human dignity and social justice.
                </p>
              </div>

              {/* African Leadership */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold font-poppins text-primary mb-4">African Leadership</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Africa must lead its own digital transformation. We support African innovators, entrepreneurs, and policymakers in shaping the continent's digital future.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our work empowers African voices and ensures that digital solutions are designed with African contexts and needs in mind.
                </p>
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

export default PhilosophyPage;
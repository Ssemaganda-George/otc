import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";

const ResearchExpertsPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Research Experts
            </h1>
            <p className="text-xl md:text-2xl font-inter max-w-3xl mx-auto">
              Meet our team of researchers and experts driving innovation in digital justice
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins text-foreground mb-4">
                Our Research Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our research experts bring diverse backgrounds in technology, law, policy, and social sciences to address complex digital justice challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Expert 1 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Dr. Jane Doe</h3>
                <p className="text-primary font-semibold mb-3">Digital Rights Researcher</p>
                <p className="text-gray-600 text-sm">
                  Specializes in privacy law and digital rights advocacy with over 10 years of experience in African policy development.
                </p>
              </div>

              {/* Expert 2 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MK</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Prof. Michael Kim</h3>
                <p className="text-primary font-semibold mb-3">AI Ethics Specialist</p>
                <p className="text-gray-600 text-sm">
                  Leading researcher in artificial intelligence ethics, focusing on bias mitigation and responsible AI development in African contexts.
                </p>
              </div>

              {/* Expert 3 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">SA</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Dr. Sarah Adebayo</h3>
                <p className="text-primary font-semibold mb-3">Data Protection Expert</p>
                <p className="text-gray-600 text-sm">
                  Expert in data protection regulations and privacy frameworks, with extensive experience in policy development and compliance.
                </p>
              </div>

              {/* Expert 4 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">TO</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Dr. Thomas Okafor</h3>
                <p className="text-primary font-semibold mb-3">Cybersecurity Researcher</p>
                <p className="text-gray-600 text-sm">
                  Specializes in cybersecurity threats and digital infrastructure protection, with a focus on developing African cybersecurity frameworks.
                </p>
              </div>

              {/* Expert 5 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">LN</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Dr. Linda Njoroge</h3>
                <p className="text-primary font-semibold mb-3">Digital Inclusion Specialist</p>
                <p className="text-gray-600 text-sm">
                  Researcher focused on digital inclusion and accessibility, working to ensure technology benefits all segments of society.
                </p>
              </div>

              {/* Expert 6 */}
              <div className="bg-white p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">RM</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2">Prof. Robert Mthembu</h3>
                <p className="text-primary font-semibold mb-3">Policy & Governance Expert</p>
                <p className="text-gray-600 text-sm">
                  Leading expert in technology policy and governance, advising governments on digital transformation strategies.
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

export default ResearchExpertsPage;
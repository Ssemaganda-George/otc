import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";

const VisionMissionPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Fixed Navigation Bar */}
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Vision, Mission & Objectives
            </h1>
            <p className="text-xl md:text-2xl font-inter max-w-3xl mx-auto">
              Our guiding principles and goals for advancing digital justice in Africa
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-1 gap-12">
              {/* Vision */}
              <div className="bg-white p-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold font-poppins text-primary mb-6">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be the leading African organization driving digital transformation that respects fundamental human rights and promotes social justice across the continent.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold font-poppins text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  OneTechConnect (OTC) advances digital transformation in health, sexual reproductive health, finance, agriculture, and development while ensuring respect for fundamental human rights and social justice across Africa.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We work to bridge the digital divide, promote ethical technology use, and advocate for policies that protect digital rights and ensure equitable access to technology for all Africans.
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-white p-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold font-poppins text-primary mb-6">Our Objectives</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-lg text-gray-700">Promote digital literacy and capacity building across African communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-lg text-gray-700">Advocate for policies that protect digital rights and privacy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-lg text-gray-700">Develop innovative solutions for healthcare, finance, and agricultural challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-lg text-gray-700">Foster partnerships between technology providers, governments, and civil society</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-lg text-gray-700">Ensure ethical and inclusive digital transformation processes</span>
                  </li>
                </ul>
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

export default VisionMissionPage;
import { Target, Eye } from "lucide-react";
import AOSWrapper from "@/components/AOSWrapper";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-32 bg-secondary/40" aria-labelledby="who-we-are-title">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <AOSWrapper animation="fade-up">
            <div className="text-center mb-20">
              <h2 id="who-we-are-title" className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins text-foreground mb-8 leading-tight">
                Who We Are
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-justify sm:text-center leading-relaxed font-inter">
                OTC is a youth-led African innovation organisation harnessing talent, technology, creativity and
                knowledge to build solutions in Health, SRHR and Sustainable Development.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto text-justify sm:text-center leading-relaxed font-inter mt-6">
                We turn African ideas into scalable solutions through research, innovation, technical and financial
                support, business protection and media amplification.
              </p>
            </div>
          </AOSWrapper>

          {/* Mission, Vision Grid */}
          <AOSWrapper animation="fade-up" delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              {/* Mission */}
              <div className="bg-card border border-border p-12 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mr-6">
                    <Target className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">Our Mission</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-inter">
                  To harness African talent, knowledge, technology and creativity to develop, protect, finance and
                  scale innovative solutions in Health, SRHR and Sustainable Development.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card border border-border p-12 shadow-card hover:shadow-blue transition-all duration-300 card-hover">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mr-6">
                    <Eye className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">Our Vision</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-inter">
                  An Africa where young people, ideas and technology drive locally owned solutions that transform
                  communities and shape the future.
                </p>
              </div>
            </div>
          </AOSWrapper>
        </div>
      </div>
    </section>
  );
}

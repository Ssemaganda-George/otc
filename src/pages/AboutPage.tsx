import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Quote, Heart, Users, Plus, Minus, Twitter, Linkedin, Facebook, Instagram, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface HomeSection {
  id: string;
  section_type: string;
  title: string;
  content: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.2, ease: "easeOut" as const }
} as const;

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamRes, sectionsRes] = await Promise.all([
        supabase.from('team_members').select('*').order('display_order'),
        supabase.from('home_sections').select('id, section_type, title, content').in('section_type', ['vision', 'mission']).eq('is_active', true)
      ]);
      if (teamRes.data) setTeamMembers(teamRes.data);
      if (sectionsRes.data) setSections(sectionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSectionContent = (sectionType: string) => {
    return sections.find(section => section.section_type === sectionType);
  };

  const sliderImages = [
    { src: "/images/DJP_5027.jpg", alt: "OTC Team" },
    { src: "/images/DJP_5020.jpg", alt: "OTC Innovation" },
    { src: "/images/DFA-2.jpg", alt: "OTC Impact" }
  ];

  const accordionItems = [
    { title: "Passion", description: "We are passionate about breathing life into Africa's stories. We only succeed when the communities we serve succeed, so we work diligently to positively impact the brands we believe in." },
    { title: "Integrity", description: "We believe in always doing the right thing. Honesty and transparency are non-negotiable in all our interactions both internally and with clients." },
    { title: "Innovation", description: "We value creative thinking and encourage fresh ideas. We don't hesitate in taking calculated risks if it means delivering cutting-edge solutions to our clients." },
    { title: "Collaboration", description: "We believe that collaboration fosters the best results. We support and learn from each other and recognize that everyone has a unique contribution to make." }
  ];

  const processSteps = [
    { number: "1", title: "We Find Your Why", description: "We execute a detailed and collaborative briefing to understand your needs, goals, and objectives." },
    { number: "2", title: "We Gather Insights", description: "We build strategic foundations on a bedrock of research-driven insights." },
    { number: "3", title: "We Create", description: "We dive into a creative process to develop concepts that respond to your needs." },
    { number: "4", title: "We Execute", description: "We transform creative ideas into experiences that capture emotions and connect with your audience." },
    { number: "5", title: "We Scale", description: "We execute for maximum visibility and impact across all platforms." }
  ];

  const awards = [
    { title: "PR Association of Uganda (PRAU)", description: "Best Event/Experiential Campaign Award for the 2024 Ikon Awards." },
    { title: "2025 Silverback Awards", description: "Data & Insights Driven Category for Reach A Hand Uganda's 'Omanyi Okuwuga' Drowning Prevention Campaign" }
  ];

  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      <TopBar />
      <SiteHeader />
      <Navigation />

      <main>
        {/* Hero - Big ABOUT US heading with description below */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
          {/* Decorative solid color shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-light rounded-full opacity-70" aria-hidden="true" />
          <div className="absolute bottom-10 -left-24 w-72 h-72 bg-golden-light rounded-full opacity-70" aria-hidden="true" />
          <div className="w-full px-6 lg:px-12 pt-20 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm md:text-base mb-6">Who We Are</p>
              <h1 className="font-black uppercase leading-[0.85] tracking-tight text-primary mb-8 text-[clamp(4rem,18vw,18rem)]">
                About Us
              </h1>
              <div className="w-32 h-2 bg-accent rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl ml-auto"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-[1.6] text-right">
                OTC is a youth-led African innovation organisation harnessing talent, technology, creativity and knowledge to build solutions in Health, SRHR and Sustainable Development. We turn African ideas into scalable solutions through research, innovation, technical and financial support, business protection and media amplification.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Image Cards - Auto-scrolling marquee right to left */}
        <section className="relative">
          <div className="relative -mt-8">
            {/* Arched top border */}
            <svg className="w-full h-16 text-golden-light" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" />
            </svg>
            <div className="bg-golden-light py-12 overflow-hidden">
              <div className="flex w-max animate-marquee">
                {[...sliderImages, ...sliderImages].map((img, index) => (
                  <motion.div
                    key={`${img.src}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-[38vw] min-w-[260px] flex-shrink-0 px-3"
                  >
                    <div className="relative overflow-hidden shadow-md h-[400px] md:h-[500px] rounded-2xl group">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors duration-500 flex items-end">
                        <span className="text-white font-bold uppercase tracking-wide text-lg px-5 pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section - Sky blue band with golden quote mark */}
        <section className="py-24 bg-accent-light">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              {...fadeInUp}
              className="mb-10"
            >
              <Quote className="w-20 h-20 text-primary mx-auto" />
            </motion.div>
            <motion.p
              {...fadeInUp}
              className="text-3xl md:text-4xl lg:text-[40px] font-bold text-foreground leading-relaxed"
            >
              OTC is a Youth-led African Not for Profit Organization that advances digital justice in health, sexual reproductive health, finance, agriculture and development, while ensuring respect for fundamental human rights and social justice for every individual and community in Africa.
            </motion.p>
            <motion.p
              {...fadeInUp}
              className="text-lg md:text-xl text-muted-foreground leading-[1.6] mt-10 max-w-4xl mx-auto"
            >
              Our approach goes beyond traditional marketing; we leverage evidence-based Social Behaviour Change Communication (SBCC) and cutting-edge creativity to inspire lasting shifts in mindset. We view our clients as collaborative partners, working hand in hand to co-create future-ready campaigns that advocate for social progress, promote healthy behaviours, and drive sustainable growth.
            </motion.p>
          </div>
        </section>

        {/* Values Section - 2 column split with accordion */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image layered over geometric shape */}
              <motion.div
                {...fadeInUp}
                className="relative"
              >
                {/* Geometric background shape */}
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
                <div className="relative group">
                  <img
                    src="/images/DJP_5167.jpg"
                    alt="What drives us"
                    className="w-full h-[500px] object-cover rounded-2xl shadow-xl scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay shape */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl rotate-12 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </motion.div>

              {/* Right: Narrative + accordion list */}
              <motion.div
                {...fadeInUp}
              >
                <h2 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-foreground mb-6">
                  What drives us
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-[1.6] mb-10">
                  We specialise in crafting impactful, 360-degree marketing and advocacy solutions designed to drive real-world change for NGOs, forward-thinking corporations, and public institutions.
                </p>

                {/* Accordion list */}
                <div className="space-y-0">
                  {accordionItems.map((item, index) => (
                    <div key={item.title} className="border-b border-gray-200">
                      <button
                        onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                        className="w-full flex items-center justify-between py-6 text-left group"
                      >
                          <div className="flex items-center gap-5">
                            <span className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-black flex-shrink-0 transition-all duration-300 ${openAccordion === index ? 'bg-primary text-white' : 'bg-accent-light text-accent group-hover:bg-primary group-hover:text-white'}`}>
                              {index + 1}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {openAccordion === index ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openAccordion === index ? "auto" : 0,
                          opacity: openAccordion === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                          <p className="text-lg md:text-xl text-muted-foreground leading-[1.6] pb-6 pr-12">
                            {item.description}
                          </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision/Mission - 2 column equal split with oversized headers */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Vision */}
              <motion.div
                {...fadeInUp}
                className="bg-accent-light p-10 rounded-2xl border border-accent-light hover:shadow-blue hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-5xl md:text-[72px] font-black text-primary leading-[1.0] mb-8">
                  {(getSectionContent('vision')?.title || 'Vision').replace(/^OUR\s+/i, '')}
                </h3>
                <p className="text-lg text-muted-foreground leading-[1.6]">
                  {getSectionContent('vision')?.content || 'An Africa where young people, ideas and technology drive locally owned solutions that transform communities and shape the future.'}
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                {...fadeInUp}
                className="bg-golden-light p-10 rounded-2xl border border-golden-light hover:shadow-golden hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-5xl md:text-[72px] font-black text-primary leading-[1.0] mb-8">
                  {(getSectionContent('mission')?.title || 'Mission').replace(/^OUR\s+/i, '')}
                </h3>
                <p className="text-lg text-muted-foreground leading-[1.6]">
                  {getSectionContent('mission')?.content || 'To harness African talent, knowledge, technology and creativity to develop, protect, finance and scale innovative solutions in Health, SRHR and Sustainable Development.'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section - 3 column grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Meet the team
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-[1.6]">
                The innovative minds behind OneTechConnect - a diverse team of legal experts, technologists, and visionaries committed to advancing digital justice across Africa.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {teamMembers.slice(0, 6).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    {/* 1:1 ratio image block */}
                    <div className="relative aspect-square overflow-hidden rounded-xl mb-6 bg-golden-light/40 shadow-sm group-hover:shadow-golden transition-shadow duration-300">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-7xl font-bold text-primary/30">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Bold name and job title stacked below */}
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-accent font-semibold">{member.position}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Process Section - Clean 5-step grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Our Processes
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-[1.6]">
                A proven approach to delivering transformative solutions.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting dashed line */}
              <div className="hidden md:block absolute top-8 left-[12%] right-[12%] border-t-2 border-dashed border-primary/30" aria-hidden="true" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className={`w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 relative z-10 ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}>
                      <span className="text-2xl font-black">{step.number}</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{step.title}</h4>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognitions */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Awards & Recognitions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-[1.6]">
                Recognised for excellence in innovation and impact.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-golden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${index % 2 === 0 ? 'bg-golden-light' : 'bg-accent-light'}`}>
              <Award className={`w-6 h-6 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{award.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{award.description}</p>
          </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Solid gold band with big pill-shaped button */}
        <section className="py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 text-white">
                Let's talk.
              </h2>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 text-white">
                Let's make impact.
              </h2>
              {/* Big pill-shaped button */}
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-primary px-20 py-8 text-2xl md:text-3xl font-bold uppercase tracking-wide rounded-full hover:bg-golden-light transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get in touch
                <ArrowRight className="ml-3 w-7 h-7" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

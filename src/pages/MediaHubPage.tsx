import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Music,
  Disc,
  Film,
  Palette,
  Globe,
  Network,
  Play,
  Clock,
  Clapperboard,
  Images,
  Sparkles,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";
import { supabase } from "@/lib/supabase";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Music, Disc, Film, Palette, Globe, Network, Play, Sparkles, Clapperboard, Images,
};

/* ---------------- Fallback content (shown until DB content exists) ---------------- */

const FALLBACK_PAGE = {
  hero_eyebrow: "OTC Media Hub",
  hero_title: "Creating. Telling. Entertaining. Inspiring.",
  hero_intro:
    "OTC Media is the creative and storytelling ecosystem of OTC. It develops talent and produces music, film, art, drama, digital content and stories that entertain, inform, connect audiences and amplify African creativity.",
  hero_image: "/images/DFA-2.jpg",
  why_we_exist:
    "Ideas, talent and innovation need strong stories and creative platforms to travel. OTC Media creates space for African voices, develops creative work and helps creators build audiences, protect value and pursue commercial opportunity.",
  connection_text:
    "OTC Media amplifies research and innovation across the ecosystem, supports creators with Academy training, protects their work through the Legal & Business Protection Centre, connects promising creative ventures to the Fund and tells the stories of OTC products and impact.",
  cta_title: "Ready to tell your story?",
  cta_subtitle:
    "Whether it's music, film, art, drama or digital content — let's create something that moves people.",
};

const FALLBACK_GALLERY = [
  { image_url: "/images/DJP_5020.jpg", alt_text: "OTC Media creative production" },
  { image_url: "/images/DJP_5027.jpg", alt_text: "OTC Media live event coverage" },
  { image_url: "/images/DJP_5167.jpg", alt_text: "OTC Media studio session" },
  { image_url: "/images/DFA-25-Speakers-X-D01-09.jpg", alt_text: "OTC Media speakers on stage" },
  { image_url: "/images/DFA-25-highlight-sessions-01.jpg", alt_text: "OTC Media highlight session" },
  { image_url: "/images/publication1.jpg", alt_text: "OTC Media publication feature" },
];

const FALLBACK_VIDEOS = [
  { title: "Data Justice Stories", thumbnail_url: "/images/Catherine.jpg", category: "Documentary", duration: "3:45", href: "/media/film-and-art" },
  { title: "Creator Spotlight", thumbnail_url: "/images/Frank.jpg", category: "Interview", duration: "5:12", href: "/media/digital-and-events" },
  { title: "Campaign Behind the Scenes", thumbnail_url: "/images/Rita.jpg", category: "Campaign", duration: "2:30", href: "/media/campaign-development" },
  { title: "African Creative Voices", thumbnail_url: "/images/Blair.png", category: "Series", duration: "4:20", href: "/media/film-and-art" },
  { title: "Studio Sessions", thumbnail_url: "/images/Dorothy.jpg", category: "Music", duration: "6:05", href: "/media/digital-and-events" },
  { title: "Film in Production", thumbnail_url: "/images/Sauda.jpg", category: "Film", duration: "8:14", href: "/media/film-and-art" },
];

const FALLBACK_WHAT_WE_DO = [
  { icon_name: "Music", description: "Produce music, audio, podcasts, video and digital content through OTC Studios." },
  { icon_name: "Disc", description: "Develop artists, music and creative partnerships through OTC Records." },
  { icon_name: "Film", description: "Produce films, documentaries, series and short-form audiovisual work through OTC Films." },
  { icon_name: "Palette", description: "Support theatre, drama, visual arts, performance and cultural expression." },
  { icon_name: "Globe", description: "Create social, web and campaign content through OTC Digital." },
  { icon_name: "Network", description: "Connect creators to business, legal, distribution and commercialisation support." },
];

const FALLBACK_FOCUS_AREAS = [
  "Music and audio production",
  "Film and documentary",
  "Podcasts and interviews",
  "Digital content and series",
  "Theatre, drama and visual arts",
  "Artist and creator development",
  "Creative partnerships and campaigns",
  "Distribution, audience growth and commercialization",
];

const FALLBACK_HOW_WE_WORK = ["CREATE", "PRODUCE", "CONNECT", "BUILD AUDIENCE", "COMMERCIALISE", "SCALE"];

const FALLBACK_EXPLORE_BARS = [
  { name: "Campaign Development", href: "/media/campaign-development", image_url: "/images/DJP_5027.jpg", description: "Creative campaigns that use art and digital media to drive awareness, engagement and real impact across Africa." },
  { name: "Film & Art", href: "/media/film-and-art", image_url: "/images/DFA-25-Speakers-X-D01-09.jpg", description: "Films, documentaries, theatre and visual art that tell African stories and amplify creative expression." },
  { name: "Digital & Events", href: "/media/digital-and-events", image_url: "/images/DFA-25-highlight-sessions-01.jpg", description: "Interactive digital experiences, virtual events and online campaigns that connect audiences across the continent." },
];

export default function MediaHubPage() {
  const [pageContent, setPageContent] = useState(FALLBACK_PAGE);
  const [gallery, setGallery] = useState(FALLBACK_GALLERY);
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [whatWeDo, setWhatWeDo] = useState(FALLBACK_WHAT_WE_DO);
  const [focusAreas, setFocusAreas] = useState(FALLBACK_FOCUS_AREAS);
  const [howWeWork, setHowWeWork] = useState(FALLBACK_HOW_WE_WORK);
  const [exploreBars, setExploreBars] = useState(FALLBACK_EXPLORE_BARS);

  useEffect(() => {
    const fetchAll = async () => {
      // Page-level content
      try {
        const { data: pc } = await supabase.from("media_page_content").select("*").limit(1);
        if (pc && pc[0]) {
          setPageContent({
            hero_eyebrow: pc[0].hero_eyebrow || FALLBACK_PAGE.hero_eyebrow,
            hero_title: pc[0].hero_title || FALLBACK_PAGE.hero_title,
            hero_intro: pc[0].hero_intro || FALLBACK_PAGE.hero_intro,
            hero_image: pc[0].hero_image || FALLBACK_PAGE.hero_image,
            why_we_exist: pc[0].why_we_exist || FALLBACK_PAGE.why_we_exist,
            connection_text: pc[0].connection_text || FALLBACK_PAGE.connection_text,
            cta_title: pc[0].cta_title || FALLBACK_PAGE.cta_title,
            cta_subtitle: pc[0].cta_subtitle || FALLBACK_PAGE.cta_subtitle,
          });
        }
      } catch (e) {
        console.error("Error fetching media page content:", e);
      }

      // Gallery
      try {
        const { data: g } = await supabase
          .from("media_gallery_images")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (g && g.length > 0) setGallery(g);
      } catch (e) {
        console.error("Error fetching gallery:", e);
      }

      // Videos
      try {
        const { data: v } = await supabase
          .from("media_videos")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (v && v.length > 0) setVideos(v);
      } catch (e) {
        console.error("Error fetching videos:", e);
      }

      // What we do
      try {
        const { data: w } = await supabase
          .from("media_what_we_do")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (w && w.length > 0) setWhatWeDo(w);
      } catch (e) {
        console.error("Error fetching what we do:", e);
      }

      // Areas of focus
      try {
        const { data: f } = await supabase
          .from("media_areas_of_focus")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (f && f.length > 0) setFocusAreas(f.map((x) => x.label));
      } catch (e) {
        console.error("Error fetching focus areas:", e);
      }

      // How we work
      try {
        const { data: h } = await supabase
          .from("media_how_we_work")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (h && h.length > 0) setHowWeWork(h.map((x) => x.step));
      } catch (e) {
        console.error("Error fetching how we work:", e);
      }

      // Explore bars
      try {
        const { data: b } = await supabase
          .from("media_explore_bars")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (b && b.length > 0) setExploreBars(b);
      } catch (e) {
        console.error("Error fetching explore bars:", e);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-white custom-scrollbar font-poppins">
      <TopBar />
      <SiteHeader />
      <Navigation />

      <main>
        {/* Hero — media visible immediately */}
        <AOSWrapper animation="fade-up">
          <section className="relative h-[70vh] min-h-[520px] max-h-[820px] overflow-hidden">
            <img
              src={pageContent.hero_image}
              alt="OTC Media creative production"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <p className="uppercase tracking-[0.35em] text-golden font-bold text-sm mb-6">
                {pageContent.hero_eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-poppins mb-6 leading-tight">
                {pageContent.hero_title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
                {pageContent.hero_intro}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/media/film-and-art"
                  className="inline-flex items-center bg-white text-primary px-8 py-4 text-base font-bold uppercase tracking-wide rounded-full hover:bg-golden-light hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Explore Media <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 text-base font-bold uppercase tracking-wide rounded-full hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Create With OTC
                </Link>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Our Work */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Images className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins">
                  Our Work
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                Behind every story is a moment. Explore the visuals from our productions, events,
                campaigns and creative sessions across the OTC Media ecosystem.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {gallery.map((img, i) => (
                  <div
                    key={img.image_url + i}
                    className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-golden transition-all duration-500 ${
                      i % 3 === 1 ? "md:mt-10" : ""
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt_text || "OTC Media"}
                      className="w-full h-56 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm font-semibold">{img.alt_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Records */}
        <AOSWrapper animation="fade-up" delay={150}>
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clapperboard className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins">
                  Records
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                Films, documentaries, interviews and series that bring African stories to life —
                watch the latest from OTC Films, OTC Studios and OTC Digital.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {videos.map((video) => (
                  <Link
                    key={video.title}
                    to={(video as any).href || "/media/film-and-art"}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-golden hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-golden-light transition-all duration-300 shadow-lg">
                          <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                        {video.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        Watch now
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* What We Do */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">What We Do</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins">
                  The Creative Engine of OTC
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatWeDo.map((item) => {
                  const Icon = ICON_MAP[item.icon_name] || Music;
                  return (
                    <div
                      key={item.description}
                      className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-golden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="mx-auto mb-6 text-primary">
                        <Icon className="w-16 h-16" strokeWidth={2.5} />
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Areas of Focus */}
        <AOSWrapper animation="fade-up" delay={250}>
          <section className="py-20 bg-accent-light">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">Areas of Focus</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins">
                  Where Creativity Meets Purpose
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center bg-white border border-primary/20 text-foreground font-semibold px-5 py-2.5 rounded-full text-sm md:text-base hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* How We Work */}
        <AOSWrapper animation="fade-up" delay={300}>
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
              <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">Our Process</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins mb-10">
                How We Work
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 text-base md:text-lg font-bold uppercase tracking-wide text-foreground">
                {howWeWork.map((step, i) => (
                  <span key={step} className="flex items-center gap-3">
                    {step}
                    {i < howWeWork.length - 1 && <ArrowRight className="w-4 h-4 text-primary" />}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Explore OTC Media — bigger cards with images and action buttons */}
        <AOSWrapper animation="fade-up" delay={350}>
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-accent font-bold text-sm mb-4">Explore</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-poppins">
                  Dive Deeper Into OTC Media
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-5 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {exploreBars.map((bar) => (
                  <Link
                    key={bar.href}
                    to={bar.href}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-golden hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={bar.image_url || "/images/DJP_5027.jpg"}
                        alt={bar.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                        {bar.name}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                        {bar.description || ""}
                      </p>
                      <span className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-full group-hover:bg-golden group-hover:text-primary transition-colors duration-300 w-fit">
                        Explore {bar.name}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Why We Exist + Connection */}
        <AOSWrapper animation="fade-up" delay={400}>
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-6">
                Why OTC Media Exists
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {pageContent.why_we_exist}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-6">
                How This Product Connects to OTC
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {pageContent.connection_text}
              </p>
            </div>
          </section>
        </AOSWrapper>

        {/* CTA */}
        <AOSWrapper animation="fade-up" delay={450}>
          <section className="py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-4">
                {pageContent.cta_title}
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                {pageContent.cta_subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-primary px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-golden-light hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Create With OTC <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/media/campaign-development"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 text-lg font-bold uppercase tracking-wide rounded-full hover:bg-white hover:text-primary transition-all duration-300"
                >
                  See Our Campaigns
                </Link>
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>

      <Footer />
    </div>
  );
}

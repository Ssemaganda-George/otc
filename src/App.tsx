import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import OTCFrameworkPage from "./pages/OTCFrameworkPage";
import OurValuesPage from "./pages/OurValuesPage";
import WhatWeDoPage from "./pages/WhatWeDoPage";
import OurApproachPage from "./pages/OurApproachPage";
import FocusAreasPage from "./pages/FocusAreasPage";
import OurProductsPage from "./pages/OurProductsPage";
import ProductsOverviewPage from "./pages/ProductsOverviewPage";
import OurServicesPage from "./pages/OurServicesPage";
import NewsUpdatesPage from "./pages/NewsUpdatesPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import StrategicLitigationPage from "./pages/StrategicLitigationPage";
import InnovationsPage from "./pages/InnovationsPage";
import ConsultancyPage from "./pages/ConsultancyPage";
import ShortCoursesPage from "./pages/ShortCoursesPage";
import CenterForDigitalJusticePage from "./pages/CenterForDigitalJusticePage";
import DonatePage from "./pages/DonatePage";
import NewsletterPage from "./pages/NewsletterPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import ResearchExpertsPage from "./pages/ResearchExpertsPage";
import TSGPage from "./pages/programmes/TSGPage";
import AiNowPage from "./pages/programmes/AiNowPage";
import BiTAPage from "./pages/programmes/BiTAPage";
import EMTPage from "./pages/programmes/EMTPage";
import ResearchPublicationsPage from "./pages/ResearchPublicationsPage";
import RepositoryPage from "./pages/RepositoryPage";

import { PageTransition } from "@/components/PageTransition";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ManagePages from "./pages/admin/ManagePages";
import ManageTeam from "./pages/admin/ManageTeam";
import ManagePrograms from "./pages/admin/ManagePrograms";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageHeroSlides from "./pages/admin/ManageHeroSlides";
import ManageResearchExperts from "./pages/admin/ManageResearchExperts";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageResources from "./pages/admin/ManageResources";
import ManageContactInfo from "./pages/admin/ManageContactInfo";
import ManageFooter from "./pages/admin/ManageFooter";
import ManageNewsUpdates from "./pages/admin/ManageNewsUpdates";
import ManageResearchPublications from "./pages/admin/ManageResearchPublications";
import ManageHomeSections from "./pages/admin/ManageHomeSections";
import ManageAboutUs from "./pages/admin/ManageAboutUs";
import ManageWhatWeDo from "./pages/admin/ManageWhatWeDo";
import ManageOurImpact from "./pages/admin/ManageOurImpact";
import ManageCorePillars from "./pages/admin/ManageCorePillars";
import ManageRepositories from "./pages/admin/ManageRepositories";

import AdminLayout from "./components/AdminLayout";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/about/who-we-are" element={<PageTransition><WhoWeArePage /></PageTransition>} />
          <Route path="/about/vision-mission" element={<PageTransition><VisionMissionPage /></PageTransition>} />
          <Route path="/about/philosophy" element={<PageTransition><PhilosophyPage /></PageTransition>} />
          <Route path="/about/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/about/research-experts" element={<PageTransition><ResearchExpertsPage /></PageTransition>} />
          <Route path="/about/otc-framework" element={<PageTransition><OTCFrameworkPage /></PageTransition>} />
          <Route path="/about/values" element={<PageTransition><OurValuesPage /></PageTransition>} />
          <Route path="/what-we-do" element={<PageTransition><WhatWeDoPage /></PageTransition>} />
          <Route path="/what-we-do/approach" element={<PageTransition><OurApproachPage /></PageTransition>} />
          <Route path="/what-we-do/focus-areas" element={<PageTransition><FocusAreasPage /></PageTransition>} />
          <Route path="/what-we-do/programmes" element={<PageTransition><ProgrammesPage /></PageTransition>} />

          <Route path="/programmes/tsg" element={<PageTransition><TSGPage /></PageTransition>} />
          <Route path="/programmes/ainow" element={<PageTransition><AiNowPage /></PageTransition>} />
          <Route path="/programmes/bita" element={<PageTransition><BiTAPage /></PageTransition>} />
          <Route path="/programmes/emt" element={<PageTransition><EMTPage /></PageTransition>} />

          <Route path="/our-products" element={<PageTransition><OurProductsPage /></PageTransition>} />
          <Route path="/our-products/overview" element={<PageTransition><ProductsOverviewPage /></PageTransition>} />
          <Route path="/our-products/services" element={<PageTransition><OurServicesPage /></PageTransition>} />

          <Route path="/products/strategic-litigation" element={<PageTransition><StrategicLitigationPage /></PageTransition>} />
          <Route path="/products/innovations" element={<PageTransition><InnovationsPage /></PageTransition>} />
          <Route path="/products/center-for-digital-justice" element={<PageTransition><CenterForDigitalJusticePage /></PageTransition>} />
          <Route path="/products/consultancy" element={<PageTransition><ConsultancyPage /></PageTransition>} />
          <Route path="/products/short-courses" element={<PageTransition><ShortCoursesPage /></PageTransition>} />

          <Route path="/news" element={<PageTransition><NewsUpdatesPage /></PageTransition>} />
          <Route path="/news/research-publications" element={<PageTransition><ResearchPublicationsPage /></PageTransition>} />
          <Route path="/news/repository" element={<PageTransition><RepositoryPage /></PageTransition>} />

          <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/donate" element={<PageTransition><DonatePage /></PageTransition>} />
          <Route path="/newsletter" element={<PageTransition><NewsletterPage /></PageTransition>} />

          {/* 🔐 ADMIN LOGIN — MUST COME FIRST */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔐 ADMIN AREA */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages" element={<ManagePages />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="research-experts" element={<ManageResearchExperts />} />
            <Route path="programs" element={<ManagePrograms />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="hero-slides" element={<ManageHeroSlides />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="resources" element={<ManageResources />} />
            <Route path="contact-info" element={<ManageContactInfo />} />
            <Route path="footer" element={<ManageFooter />} />
            <Route path="news-updates" element={<ManageNewsUpdates />} />
            <Route path="research-publications" element={<ManageResearchPublications />} />
            <Route path="home-sections" element={<ManageHomeSections />} />
            <Route path="about-us" element={<ManageAboutUs />} />
            <Route path="what-we-do" element={<ManageWhatWeDo />} />
            <Route path="our-impact" element={<ManageOurImpact />} />
            <Route path="core-pillars" element={<ManageCorePillars />} />
            <Route path="repositories" element={<ManageRepositories />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

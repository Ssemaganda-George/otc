import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import OTCFrameworkPage from "./pages/OTCFrameworkPage";
import OurValuesPage from "./pages/OurValuesPage";
import OurApproachPage from "./pages/OurApproachPage";
import BoardMembersPage from "./pages/BoardMembersPage";
import NewsUpdatesPage from "./pages/NewsUpdatesPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import InnovationHubPage from "./pages/InnovationHubPage";
import AcademyPage from "./pages/AcademyPage";
import ResearchCentrePage from "./pages/ResearchCentrePage";
import FundPage from "./pages/FundPage";
import LegalBusinessSupportPage from "./pages/LegalBusinessSupportPage";
import MediaHubPage from "./pages/MediaHubPage";
import CampaignDevelopmentPage from "./pages/media/CampaignDevelopmentPage";
import FilmArtPage from "./pages/media/FilmArtPage";
import DigitalEventsPage from "./pages/media/DigitalEventsPage";
import DonatePage from "./pages/DonatePage";
import NewsletterPage from "./pages/NewsletterPage";
import VisionMissionPage from "./pages/VisionMissionPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import ResearchExpertsPage from "./pages/ResearchExpertsPage";
import ResearchPublicationsPage from "./pages/ResearchPublicationsPage";
import RepositoryPage from "./pages/RepositoryPage";

import { PageTransition } from "@/components/PageTransition";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ManageTeam from "./pages/admin/ManageTeam";
import ManageBoardMembers from "./pages/admin/ManageBoardMembers";
import ManageHeroSlides from "./pages/admin/ManageHeroSlides";
import ManageResearchExperts from "./pages/admin/ManageResearchExperts";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageResources from "./pages/admin/ManageResources";
import ManageNewsUpdates from "./pages/admin/ManageNewsUpdates";
import ManageResearchPublications from "./pages/admin/ManageResearchPublications";
import ManageAboutUs from "./pages/admin/ManageAboutUs";
import ManageCoreValues from "./pages/admin/ManageCoreValues";
import ManageOurImpact from "./pages/admin/ManageOurImpact";
import ManageHomeSections from "./pages/admin/ManageHomeSections";
import ManagePartners from "./pages/admin/ManagePartners";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageInnovations from "./pages/admin/ManageInnovations";
import ManageOurApproach from "./pages/admin/ManageOurApproach";
import ManageWelcomeToOtc from "./pages/admin/ManageWelcomeToOtc";
import ManageRepositories from "./pages/admin/ManageRepositories";
import VisitorAnalyticsPage from "./pages/admin/VisitorAnalyticsPage";
import DownloadsAnalyticsPage from "./pages/admin/DownloadsAnalyticsPage";
import ManageMessages from "./pages/admin/ManageMessages";
import ManageNewsletter from "./pages/admin/ManageNewsletter";

import AdminLayout from "./components/AdminLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

function AdminGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <ErrorBoundary>
      <AdminLayout />
    </ErrorBoundary>
  );
}

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnalyticsTracker />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/about/values" element={<Navigate to="/about" replace />} />
          <Route path="/about/who-we-are" element={<PageTransition><WhoWeArePage /></PageTransition>} />
          <Route path="/about/vision-mission" element={<PageTransition><VisionMissionPage /></PageTransition>} />
          <Route path="/about/philosophy" element={<PageTransition><PhilosophyPage /></PageTransition>} />
          <Route path="/about/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/about/research-experts" element={<PageTransition><ResearchExpertsPage /></PageTransition>} />
          <Route path="/about/otc-framework" element={<PageTransition><OTCFrameworkPage /></PageTransition>} />
          <Route path="/about/approach" element={<PageTransition><OurApproachPage /></PageTransition>} />
          <Route path="/about/board-members" element={<PageTransition><BoardMembersPage /></PageTransition>} />

          <Route path="/innovation-hub" element={<PageTransition><InnovationHubPage /></PageTransition>} />
          <Route path="/academy" element={<PageTransition><AcademyPage /></PageTransition>} />
          <Route path="/academy/research-centre" element={<PageTransition><ResearchCentrePage /></PageTransition>} />
          <Route path="/fund" element={<PageTransition><FundPage /></PageTransition>} />
          <Route path="/legal-business-support" element={<PageTransition><LegalBusinessSupportPage /></PageTransition>} />
          <Route path="/media" element={<PageTransition><MediaHubPage /></PageTransition>} />
          <Route path="/media/campaign-development" element={<PageTransition><CampaignDevelopmentPage /></PageTransition>} />
          <Route path="/media/film-and-art" element={<PageTransition><FilmArtPage /></PageTransition>} />
          <Route path="/media/digital-and-events" element={<PageTransition><DigitalEventsPage /></PageTransition>} />

          <Route path="/news" element={<PageTransition><NewsUpdatesPage /></PageTransition>} />
          <Route path="/news/research-publications" element={<PageTransition><ResearchPublicationsPage /></PageTransition>} />
          <Route path="/news/repository" element={<PageTransition><RepositoryPage /></PageTransition>} />

          <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/donate" element={<PageTransition><DonatePage /></PageTransition>} />
          <Route path="/newsletter" element={<PageTransition><NewsletterPage /></PageTransition>} />

          {/* 🔐 ADMIN AREA — shows the login form at /admin when signed out */}
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminDashboard />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="board-members" element={<ManageBoardMembers />} />
            <Route path="research-experts" element={<ManageResearchExperts />} />
            <Route path="hero-slides" element={<ManageHeroSlides />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="resources" element={<ManageResources />} />
            <Route path="news-updates" element={<ManageNewsUpdates />} />
            <Route path="research-publications" element={<ManageResearchPublications />} />
             <Route path="about-us" element={<ManageAboutUs />} />
             <Route path="core-values" element={<ManageCoreValues />} />
             <Route path="our-impact" element={<ManageOurImpact />} />
             <Route path="home-sections" element={<ManageHomeSections />} />
             <Route path="partners" element={<ManagePartners />} />
               <Route path="products" element={<ManageProducts />} />
               <Route path="innovations" element={<ManageInnovations />} />
               <Route path="our-approach" element={<ManageOurApproach />} />
               <Route path="welcome-to-otc" element={<ManageWelcomeToOtc />} />
            <Route path="repositories" element={<ManageRepositories />} />
             <Route path="messages" element={<ManageMessages />} />
             <Route path="newsletter" element={<ManageNewsletter />} />
            <Route path="analytics/visitors/demographics" element={<VisitorAnalyticsPage />} />
            <Route path="analytics/downloads" element={<DownloadsAnalyticsPage />} />
          </Route>

          {/* Legacy admin login URL redirects to /admin */}
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

          {/* FALLBACK */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <App />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
}

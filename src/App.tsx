import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import OTCFrameworkPage from "./pages/OTCFrameworkPage";
import OurValuesPage from "./pages/OurValuesPage";
import WhatWeDoPage from "./pages/WhatWeDoPage";
import OurApproachPage from "./pages/OurApproachPage";
import FocusAreasPage from "./pages/FocusAreasPage";
import StrategicPillarsPage from "./pages/StrategicPillarsPage";
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
import TSGPage from "./pages/programmes/TSGPage";
import AiNowPage from "./pages/programmes/AiNowPage";
import BiTAPage from "./pages/programmes/BiTAPage";
import EMTPage from "./pages/programmes/EMTPage";
import { PageTransition } from "@/components/PageTransition";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/about/who-we-are" element={<PageTransition><WhoWeArePage /></PageTransition>} />
        <Route path="/about/otc-framework" element={<PageTransition><OTCFrameworkPage /></PageTransition>} />
        <Route path="/about/team" element={<PageTransition><TeamPage /></PageTransition>} />
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
        <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/donate" element={<PageTransition><DonatePage /></PageTransition>} />
        <Route path="/newsletter" element={<PageTransition><NewsletterPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import ProgrammesPage from "./pages/ProgrammesPage";
import TSGPage from "./pages/programmes/TSGPage";
import AiNowPage from "./pages/programmes/AiNowPage";
import BiTAPage from "./pages/programmes/BiTAPage";
import EMTPage from "./pages/programmes/EMTPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* About Us Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/who-we-are" element={<WhoWeArePage />} />
          <Route path="/about/otc-framework" element={<OTCFrameworkPage />} />
          <Route path="/about/team" element={<TeamPage />} />
          <Route path="/about/values" element={<OurValuesPage />} />
          
          {/* What We Do Routes */}
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/what-we-do/approach" element={<OurApproachPage />} />
          <Route path="/what-we-do/focus-areas" element={<FocusAreasPage />} />
          <Route path="/what-we-do/programmes" element={<ProgrammesPage />} />
          
          {/* Programmes Routes */}
          <Route path="/programmes/tsg" element={<TSGPage />} />
          <Route path="/programmes/ainow" element={<AiNowPage />} />
          <Route path="/programmes/bita" element={<BiTAPage />} />
          <Route path="/programmes/emt" element={<EMTPage />} />
          
          {/* Our Products Routes */}
          <Route path="/our-products" element={<OurProductsPage />} />
          <Route path="/our-products/overview" element={<ProductsOverviewPage />} />
          <Route path="/our-products/services" element={<OurServicesPage />} />
          <Route path="/products/strategic-litigation" element={<StrategicLitigationPage />} />
          <Route path="/products/innovations" element={<InnovationsPage />} />
          <Route path="/products/consultancy" element={<ConsultancyPage />} />
          <Route path="/products/short-courses" element={<ShortCoursesPage />} />
          
          {/* Other Routes */}
          <Route path="/news" element={<NewsUpdatesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
<<<<<<< HEAD
import ServicesPage from "./pages/ServicesPage";
import ProgramsPage from "./pages/ProgramsPage";
=======
import WhatWeDoPage from "./pages/WhatWeDoPage";
import OurProductsPage from "./pages/OurProductsPage";
import NewsUpdatesPage from "./pages/NewsUpdatesPage";
>>>>>>> chris
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

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
          <Route path="/about" element={<AboutPage />} />
<<<<<<< HEAD
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
=======
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/our-products" element={<OurProductsPage />} />
          <Route path="/news" element={<NewsUpdatesPage />} />
>>>>>>> chris
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

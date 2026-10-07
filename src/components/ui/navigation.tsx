import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";

// Sub-menu structure matches the "Recommended primary navigation" table in the OTC rebrand doc:
// only About Us, OTC Academy and Legal & Business Support Centre have dropdowns there.
const ourProducts = [
  { name: "Innovation Hub", href: "/innovation-hub" },
  { name: "Academy", href: "/academy" },
  { name: "Legal and Business Support", href: "/legal-business-support" },
  { name: "OTC Fund", href: "/fund" },
  { name: "OTC Media", href: "/media" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent, sectionName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection(sectionName);
    }
  };

  // Improved font size and weight for better readability (NERPS-inspired)
  const navLinkClass = "font-poppins font-semibold text-base xl:text-lg text-foreground hover:text-primary transition-all duration-300 ease-in-out whitespace-nowrap relative group";
  const navLinkWithSeparator = "font-poppins font-semibold text-base xl:text-lg text-foreground hover:text-primary transition-all duration-300 ease-in-out whitespace-nowrap border-l border-gray-300 pl-3 xl:pl-4";

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
          : 'bg-white'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-5">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo spacer */}
          <div className="hidden lg:block flex-1">
            <div className="ml-2 flex items-baseline space-x-0 xl:space-x-0">
              <Link to="/" className={navLinkClass}>Home</Link>

              {/* About Us */}
              <div className="relative group">
                <button className={`${navLinkWithSeparator} flex items-center`}>
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-3 w-[220px] min-w-[220px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t-2 border-t-primary border border-gray-200 rounded-lg">
                  <div className="py-2">
                    <Link to="/about/values" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">Our Values</Link>
                    <Link to="/about/team" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">Our Team</Link>

                    {/* Our Products — nested flyout */}
                    <div className="relative group/products">
                      <button className="w-full flex items-center justify-between px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">
                        Our Products
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute left-full top-0 w-[240px] min-w-[240px] bg-white shadow-xl opacity-0 invisible group-hover/products:opacity-100 group-hover/products:visible transition-all duration-300 ease-in-out border-t-2 border-t-primary border border-gray-200 rounded-lg">
                        <div className="py-2">
                          {ourProducts.map((product) => (
                            <Link key={product.href} to={product.href} className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link to="/innovation-hub" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out">Our Innovations</Link>
                  </div>
                </div>
              </div>

              <Link to="/innovation-hub" className={navLinkWithSeparator}>OTC Innovation Hub</Link>

              {/* OTC Academy */}
              <div className="relative group">
                <button className={`${navLinkWithSeparator} flex items-center`}>
                  OTC Academy
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-3 w-[180px] min-w-[180px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t-2 border-t-primary border border-gray-200 rounded-lg">
                  <div className="py-2">
                    <Link to="/academy/research-centre" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">Research</Link>
                    <Link to="/academy" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out">Training</Link>
                  </div>
                </div>
              </div>

              <Link to="/fund" className={navLinkWithSeparator}>OTC Fund</Link>
              <Link to="/media" className={navLinkWithSeparator}>OTC Media</Link>

              {/* Legal & Business Support Centre */}
              <div className="relative group">
                <button className={`${navLinkWithSeparator} flex items-center`}>
                  Legal & Business
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 mt-3 w-[200px] min-w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t-2 border-t-primary border border-gray-200 rounded-lg">
                  <div className="py-2">
                    <Link to="/legal-business-support" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">Legal</Link>
                    <Link to="/legal-business-support" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out">Business Support</Link>
                  </div>
                </div>
              </div>

              {/* News & Stories (kept as a dropdown — existing pages need to stay reachable) */}
              <div className="relative group">
                <button className={`${navLinkWithSeparator} flex items-center`}>
                  News & Stories
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 mt-3 w-[220px] min-w-[220px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t-2 border-t-primary border border-gray-200 rounded-lg">
                  <div className="py-2">
                    <Link to="/news" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">News</Link>
                    <Link to="/news/research-publications" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b border-gray-100">Research Publications</Link>
                    <Link to="/news/repository" className="block px-5 py-3 text-sm font-poppins font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-in-out">Repository</Link>
                  </div>
                </div>
              </div>

              <Link to="/contact" className={navLinkWithSeparator}>Get in Touch</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-foreground hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-md transition-all duration-300 ease-in-out"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <>
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`fixed top-[70px] left-0 right-1/4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg z-50 lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto scroll-smooth transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="p-4">
            {/* Home Link */}
            <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>

            {/* About Us Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('about')}
                onKeyDown={(e) => handleKeyDown(e, 'about')}
                aria-expanded={openSections.about}
                aria-controls="about-submenu"
              >
                About Us
                {openSections.about ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="about-submenu"
                className={`mobile-nav-content ${openSections.about ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections.about}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/about/values" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Values</Link>
                  <Link to="/about/team" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Team</Link>

                  {/* Our Products nested accordion */}
                  <button
                    className="mobile-nav-submenu-link w-full flex items-center justify-between"
                    onClick={() => toggleSection('about-products')}
                    onKeyDown={(e) => handleKeyDown(e, 'about-products')}
                    aria-expanded={openSections['about-products']}
                  >
                    Our Products
                    {openSections['about-products'] ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                  <div className={`mobile-nav-content ${openSections['about-products'] ? 'open' : ''}`} role="menu">
                    <div className="pl-4">
                      {ourProducts.map((product) => (
                        <Link key={product.href} to={product.href} className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link to="/innovation-hub" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Innovations</Link>
                </div>
              </div>
            </div>

            {/* OTC Innovation Hub Link */}
            <Link to="/innovation-hub" className="mobile-nav-link" onClick={() => setIsOpen(false)}>OTC Innovation Hub</Link>

            {/* OTC Academy Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('academy')}
                onKeyDown={(e) => handleKeyDown(e, 'academy')}
                aria-expanded={openSections.academy}
                aria-controls="academy-submenu"
              >
                OTC Academy
                {openSections.academy ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="academy-submenu"
                className={`mobile-nav-content ${openSections.academy ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections.academy}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/academy/research-centre" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Research</Link>
                  <Link to="/academy" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Training</Link>
                </div>
              </div>
            </div>

            {/* OTC Fund Link */}
            <Link to="/fund" className="mobile-nav-link" onClick={() => setIsOpen(false)}>OTC Fund</Link>

            {/* OTC Media Link */}
            <Link to="/media" className="mobile-nav-link" onClick={() => setIsOpen(false)}>OTC Media</Link>

            {/* Legal & Business Support Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('legal')}
                onKeyDown={(e) => handleKeyDown(e, 'legal')}
                aria-expanded={openSections.legal}
                aria-controls="legal-submenu"
              >
                Legal & Business Support
                {openSections.legal ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="legal-submenu"
                className={`mobile-nav-content ${openSections.legal ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections.legal}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/legal-business-support" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Legal</Link>
                  <Link to="/legal-business-support" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Business Support</Link>
                </div>
              </div>
            </div>

            {/* News & Stories Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('news')}
                onKeyDown={(e) => handleKeyDown(e, 'news')}
                aria-expanded={openSections.news}
                aria-controls="news-submenu"
              >
                News & Stories
                {openSections.news ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="news-submenu"
                className={`mobile-nav-content ${openSections.news ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections.news}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/news" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">News</Link>
                  <Link to="/news/research-publications" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Research Publications</Link>
                  <Link to="/news/repository" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Repository</Link>
                </div>
              </div>
            </div>

            {/* Get in Touch Link */}
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Get in Touch</Link>

            {/* Donate Button */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button asChild variant="golden" size="sm" className="w-full">
                <Link to="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    </nav>
  );
}

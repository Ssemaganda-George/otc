import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";

const navItems = [
	{ name: "Home", href: "/" },
	{
		name: "About Us",
		href: "/about",
		dropdown: [
			{ name: "Who We Are", href: "/about/who-we-are" },
			{ name: "Vision/Mission/Objectives", href: "/about/vision-mission" },
			{ name: "Our Philosophy", href: "/about/philosophy" },
			{ name: "Our Team", href: "/about/team" },
			{ name: "Research Experts", href: "/about/research-experts" },
		],
	},
	{
		name: "What We Do",
		href: "/what-we-do",
		dropdown: [
			{ name: "Overview", href: "/what-we-do" },
			{ name: "Our Approach", href: "/what-we-do/approach" },
			{ name: "Focus Areas", href: "/what-we-do/focus-areas" },
			{ name: "Programmes", href: "/what-we-do/programmes" },
		],
	},
	{
		name: "Our Products",
		href: "/our-products",
		dropdown: [
			{ name: "Overview", href: "/our-products" },
			{ name: "Strategic Litigation", href: "/products/strategic-litigation" },
			{ name: "Innovation Hub", href: "/products/innovations" },
			{
				name: "Center for Digital Justice",
				href: "/products/center-for-digital-justice",
			},
			{ name: "Consultancy Services", href: "/products/consultancy" },
		],
	},
	{ 	
		name: "News & Updates", 
		href: "/news",
		dropdown: [
			{ name: "News", href: "/news" },
			{ name: "Research Publications", href: "/news/research-publications" },
			{ name: "Repository", href: "/news/repository" },
		],
	},
	{ name: "Contact Us", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

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

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50' 
          : 'bg-background'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[90px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="OneTechConnect Home">
            <img 
              src="/OTC_logo.png" 
              alt="OneTechConnect Logo" 
              className="h-16 w-auto transition-all duration-500 ease-in-out hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out"
              >
                Home
              </Link>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out flex items-center">
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[320px] min-w-[320px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out border-t-4 border-t-primary border border-gray-200">
                  <div className="py-3">
                    <Link to="/about/who-we-are" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out border-b border-gray-100">Who We Are</Link>
                    <Link to="/about/vision-mission" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out border-b border-gray-100">Vision/Mission/Objectives</Link>
                    <Link to="/about/philosophy" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out border-b border-gray-100">Our Philosophy</Link>
                    <Link to="/about/team" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out border-b border-gray-100">Our Team</Link>
                    <Link to="/about/research-experts" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Research Experts</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out flex items-center">
                  What We Do
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[280px] min-w-[280px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out border-t-4 border-t-primary border border-gray-200">
                  <div className="py-3">
                    <Link to="/what-we-do" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Overview</Link>
                    <Link to="/what-we-do/approach" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Our Approach</Link>
                    <Link to="/what-we-do/focus-areas" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Focus Areas</Link>
                    <Link to="/what-we-do/programmes" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Programmes</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out flex items-center">
                  Our Products
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[320px] min-w-[320px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out border-t-4 border-t-primary border border-gray-200">
                  <div className="py-3">
                    <Link to="/our-products" className="block px-5 py-3 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Overview</Link>
                    <Link to="/products/strategic-litigation" className="block px-5 py-3 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Strategic Litigation</Link>
                    <Link to="/products/innovations" className="block px-5 py-3 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Innovation Hub</Link>
                    <Link to="/products/center-for-digital-justice" className="block px-5 py-3 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Center for Digital Justice</Link>
                    <Link to="/products/consultancy" className="block px-5 py-3 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Consultancy Services</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out flex items-center">
                  News & Updates
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[280px] min-w-[280px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out border-t-4 border-t-primary border border-gray-200">
                  <div className="py-3">
                    <Link to="/news" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">News</Link>
                    <Link to="/news/research-publications" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Research Publications</Link>
                    <Link to="/news/repository" className="block px-5 py-4 text-base font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors duration-400 ease-in-out">Repository</Link>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-500 ease-in-out"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="golden" size="sm">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-foreground hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-md transition-all duration-400 ease-in-out"
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
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-700 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`fixed top-[90px] left-0 right-1/4 bg-background/95 backdrop-blur-md border border-border/50 shadow-lg z-50 md:hidden max-h-[calc(100vh-110px)] overflow-y-auto scroll-smooth transition-all duration-700 ease-in-out ${
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
                  <Link to="/about/who-we-are" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Who We Are</Link>
                  <Link to="/about/vision-mission" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Vision/Mission/Objectives</Link>
                  <Link to="/about/philosophy" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Philosophy</Link>
                  <Link to="/about/team" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Team</Link>
                  <Link to="/about/research-experts" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Research Experts</Link>
                </div>
              </div>
            </div>

            {/* What We Do Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('what-we-do')}
                onKeyDown={(e) => handleKeyDown(e, 'what-we-do')}
                aria-expanded={openSections['what-we-do']}
                aria-controls="what-we-do-submenu"
              >
                What We Do
                {openSections['what-we-do'] ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="what-we-do-submenu"
                className={`mobile-nav-content ${openSections['what-we-do'] ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections['what-we-do']}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/what-we-do" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Overview</Link>
                  <Link to="/what-we-do/approach" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Our Approach</Link>
                  <Link to="/what-we-do/focus-areas" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Focus Areas</Link>
                  <Link to="/what-we-do/programmes" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Programmes</Link>
                </div>
              </div>
            </div>

            {/* Our Products Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('products')}
                onKeyDown={(e) => handleKeyDown(e, 'products')}
                aria-expanded={openSections.products}
                aria-controls="products-submenu"
              >
                Our Products
                {openSections.products ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              <div
                id="products-submenu"
                className={`mobile-nav-content ${openSections.products ? 'open' : ''}`}
                role="menu"
                aria-hidden={!openSections.products}
              >
                <div className="mobile-nav-submenu">
                  <Link to="/our-products" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Overview</Link>
                  <Link to="/products/strategic-litigation" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Strategic Litigation</Link>
                  <Link to="/products/innovations" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Innovation Hub</Link>
                  <Link to="/products/center-for-digital-justice" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Center for Digital Justice</Link>
                  <Link to="/products/consultancy" className="mobile-nav-submenu-link" onClick={() => setIsOpen(false)} role="menuitem">Consultancy Services</Link>
                </div>
              </div>
            </div>

            {/* News & Updates Section */}
            <div className="mobile-nav-section">
              <button
                className="mobile-nav-header w-full text-left"
                onClick={() => toggleSection('news')}
                onKeyDown={(e) => handleKeyDown(e, 'news')}
                aria-expanded={openSections.news}
                aria-controls="news-submenu"
              >
                News & Updates
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

            {/* Contact Us Link */}
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact Us</Link>

            {/* Donate Button */}
            <div className="pt-4 mt-4 border-t border-border/50">
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
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
              className="h-16 w-auto transition-all duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[280px] min-w-[280px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-t-primary border border-gray-200">
                  <div className="py-2">
                    <Link to="/about/who-we-are" className="block px-4 py-3 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors border-b border-gray-100">Who We Are</Link>
                    <Link to="/about/vision-mission" className="block px-4 py-3 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors border-b border-gray-100">Vision/Mission/Objectives</Link>
                    <Link to="/about/philosophy" className="block px-4 py-3 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors border-b border-gray-100">Our Philosophy</Link>
                    <Link to="/about/team" className="block px-4 py-3 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors border-b border-gray-100">Our Team</Link>
                    <Link to="/about/research-experts" className="block px-4 py-3 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Research Experts</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                  What We Do
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[240px] min-w-[240px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-t-primary border border-gray-200">
                  <div className="py-1">
                    <Link to="/what-we-do" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Overview</Link>
                    <Link to="/what-we-do/approach" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Our Approach</Link>
                    <Link to="/what-we-do/focus-areas" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Focus Areas</Link>
                    <Link to="/what-we-do/programmes" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Programmes</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                  Our Products
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[240px] min-w-[240px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-t-primary border border-gray-200">
                  <div className="py-1">
                    <Link to="/our-products" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Overview</Link>
                    <Link to="/products/strategic-litigation" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Strategic Litigation</Link>
                    <Link to="/products/innovations" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Innovation Hub</Link>
                    <Link to="/products/center-for-digital-justice" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Center for Digital Justice</Link>
                    <Link to="/products/consultancy" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Consultancy Services</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                  News & Updates
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-[240px] min-w-[240px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-t-primary border border-gray-200">
                  <div className="py-1">
                    <Link to="/news" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">News</Link>
                    <Link to="/news/research-publications" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Research Publications</Link>
                    <Link to="/news/repository" className="block px-4 py-2 text-sm font-poppins font-bold text-foreground hover:text-primary hover:bg-gray-50 transition-colors">Repository</Link>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="font-poppins font-bold text-[16px] text-foreground hover:text-primary transition-colors duration-200"
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
              className="inline-flex items-center justify-center p-2 text-foreground hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <div className="space-y-1 pl-4">
              <Link to="/about/who-we-are" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Who We Are</Link>
              <Link to="/about/vision-mission" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Vision/Mission/Objectives</Link>
              <Link to="/about/philosophy" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Philosophy</Link>
              <Link to="/about/team" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Team</Link>
              <Link to="/about/research-experts" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Research Experts</Link>
            </div>
            <div className="space-y-1 pl-4">
              <Link to="/what-we-do" className="mobile-nav-link" onClick={() => setIsOpen(false)}>What We Do</Link>
              <Link to="/what-we-do/approach" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Approach</Link>
              <Link to="/what-we-do/focus-areas" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Focus Areas</Link>
              <Link to="/what-we-do/programmes" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Programmes</Link>
            </div>
            <div className="space-y-1 pl-4">
              <Link to="/our-products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Our Products</Link>
              <Link to="/products/strategic-litigation" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Strategic Litigation</Link>
              <Link to="/products/innovations" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Innovation Hub</Link>
              <Link to="/products/center-for-digital-justice" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Center for Digital Justice</Link>
              <Link to="/products/consultancy" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Consultancy Services</Link>
            </div>
            <div className="space-y-1 pl-4">
              <Link to="/news" className="mobile-nav-link" onClick={() => setIsOpen(false)}>News & Updates</Link>
              <Link to="/news/research-publications" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Research Publications</Link>
              <Link to="/news/repository" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Repository</Link>
            </div>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <div className="pt-4">
              <Button asChild variant="golden" size="sm" className="w-full">
                <Link to="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
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
      { name: "OTC Framework", href: "/about/otc-framework" },
      { name: "Our Team", href: "/about/team" },
      { name: "Our Values", href: "/about/values" }
    ]
  },
  {
    name: "What We Do",
    href: "/what-we-do",
    dropdown: [
      { name: "Departments", href: "/what-we-do/approach" },
      { name: "Focus Areas", href: "/what-we-do/focus-areas" },
      { name: "Programmes", href: "/what-we-do/programmes" }
    ]
  },
  {
    name: "Our Products",
    href: "/our-products",
    dropdown: [
      { name: "Strategic Litigation", href: "/products/strategic-litigation" },
      { name: "Innovations", href: "/products/innovations" },
      { name: "Consultancy Services", href: "/products/consultancy" },
      { name: "Short Courses", href: "/products/short-courses" }
    ]
  },
  { name: "News & Updates", href: "/news" },
  { name: "Contact Us", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-secondary/98 backdrop-blur-md border-b border-border shadow-card" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Logo.png" 
              alt="OneTechConnect Logo" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "text-primary" 
                          : "text-foreground hover:text-primary"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg transition-all duration-200 ${
                        activeDropdown === item.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      isActive(item.href) 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact">
              <Button variant="golden" size="sm">
                Get Involved
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border bg-card/95 backdrop-blur-md rounded-lg mx-4 shadow-lg">
            <div className="flex flex-col space-y-2 pt-4 px-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center justify-between w-full font-medium py-2 transition-colors duration-200 ${
                          isActive(item.href) 
                            ? "text-primary" 
                            : "text-foreground hover:text-primary"
                        }`}
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-2 bg-secondary/30 rounded-lg p-3">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`font-medium py-2 transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "text-primary" 
                          : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/contact">
                <Button variant="golden" size="sm" className="self-start mt-4">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

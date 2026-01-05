import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu, X, Home, FileText, Users, BookOpen, Briefcase, Image, GraduationCap, Newspaper, File, Phone, Settings, Layout, Target, TrendingUp, Shield, Database, Heart, Mail, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleSignOut = () => {
    setShowSignOutDialog(true);
  };

  const confirmSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const sidebarItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    // About Us Section
    { name: "Manage About Us", path: "/admin/about-us", icon: Layout },
    { name: "Manage Core Values", path: "/admin/core-values", icon: Heart },
    { name: "Manage Core Pillars", path: "/admin/core-pillars", icon: Shield },
    // What We Do Section
    { name: "Manage What We Do", path: "/admin/what-we-do", icon: Target },
    { name: "Manage Programs", path: "/admin/programs", icon: BookOpen },
    { name: "Manage Our Impact", path: "/admin/our-impact", icon: TrendingUp },
    // Our Team Section
    { name: "Manage Team", path: "/admin/team", icon: Users },
    { name: "Manage Research Experts", path: "/admin/research-experts", icon: GraduationCap },
    // Our Products Section
    { name: "Manage Products", path: "/admin/products", icon: Briefcase },
    { name: "Manage Hero Slides", path: "/admin/hero-slides", icon: Image },
    // News & Updates Section
    { name: "Manage News Updates", path: "/admin/news-updates", icon: Newspaper },
    { name: "Manage Research Publications", path: "/admin/research-publications", icon: BookOpen },
    { name: "Manage Blogs", path: "/admin/blogs", icon: Newspaper },
    { name: "Manage Resources", path: "/admin/resources", icon: File },
    { name: "Manage Repositories", path: "/admin/repositories", icon: Database },
    // Communication
    { name: "Manage Messages", path: "/admin/messages", icon: Mail },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-lg border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 bg-primary flex-shrink-0">
          <img
            src="/OTC_logo.png"
            alt="SAC OTC Logo"
            className="h-8 w-11 mr-3 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h2 className="text-white font-bold text-lg transition-all duration-300 ease-in-out">Admin Panel</h2>
        </div>
        <nav className="flex-1 mt-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scroll-smooth">
          <div className="px-4 space-y-1 pb-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform ${
                    isActive
                      ? "bg-primary text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-102 hover:shadow-sm"
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                  }`} />
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {item.name}
                  </span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="flex-shrink-0 p-4 border-t">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-sm active:scale-98"
          >
            <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-primary flex-shrink-0">
              <img
                src="/OTC_logo.png"
                alt="SAC OTC Logo"
                className="h-8 w-11 mr-3"
              />
              <h2 className="text-white font-bold text-lg">Admin Panel</h2>
            </div>
            <nav className="flex-1 mt-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scroll-smooth">
              <div className="px-4 space-y-1 pb-4">
                {sidebarItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                      }`} />
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {item.name}
                      </span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="flex-shrink-0 p-4 border-t">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b lg:pl-0 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Open sidebar"
                    >
                      <Menu className="w-6 h-6 transition-transform duration-200" />
                    </button>
                  </SheetTrigger>
                </Sheet>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-300 ease-in-out truncate">
                    {sidebarItems.find(item => item.path === location.pathname)?.name || "Admin"}
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                  <p className="text-xs text-gray-500">v1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full">
          <div className="scroll-smooth p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out? You will need to log in again to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignOutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmSignOut}>
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

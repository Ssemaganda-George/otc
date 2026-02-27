import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu, X, Home, FileText, Users, BookOpen, Briefcase, Image, GraduationCap, Newspaper, File, Phone, Settings, Layout, Target, TrendingUp, Shield, Database, Heart, Mail, Download, ChevronRight, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminLayout() {
  const { signOut, user } = useAuth();
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

  const sidebarGroups = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", path: "/admin", icon: Home },
      ],
    },
    {
      title: "Content",
      items: [
        { name: "About & Pages", path: "/admin/about-us" },
        { name: "Core Values", path: "/admin/core-values" },
        { name: "Core Pillars", path: "/admin/core-pillars" },
        { name: "What We Do", path: "/admin/what-we-do" },
        { name: "Programs", path: "/admin/programs" },
        { name: "Our Impact", path: "/admin/our-impact" },
      ],
    },
    {
      title: "People",
      items: [
        { name: "Team", path: "/admin/team" },
        { name: "Research Experts", path: "/admin/research-experts" },
      ],
    },
    {
      title: "Products & Media",
      items: [
        { name: "Products", path: "/admin/products" },
        { name: "Hero Slides", path: "/admin/hero-slides" },
      ],
    },
    {
      title: "News & Library",
      items: [
        { name: "News Updates", path: "/admin/news-updates" },
        { name: "Research Publications", path: "/admin/research-publications" },
        { name: "Blogs", path: "/admin/blogs" },
        { name: "Resources", path: "/admin/resources" },
        { name: "Repositories", path: "/admin/repositories" },
      ],
    },
    {
      title: "Analytics & Communication",
      items: [
        { name: "Messages", path: "/admin/messages" },
        { name: "Visitor Analytics", path: "/admin/analytics/visitors/demographics" },
        { name: "Downloads Analytics", path: "/admin/analytics/downloads" },
      ],
    },
  ];

  // Persist collapsed state per group in localStorage
  const STORAGE_KEY = "adminSidebarCollapsedGroups";
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsedGroups));
    } catch (e) {
      // ignore
    }
  }, [collapsedGroups]);

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const flatSidebarItems = sidebarGroups.flatMap((g) => g.items);

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
          <div className="px-4 space-y-4 pb-4">
            {sidebarGroups.map((group) => {
              const isCollapsed = !!collapsedGroups[group.title];
              return (
                <div key={group.title}>
                  <button
                    onClick={() => toggleGroup(group.title)}
                    aria-expanded={!isCollapsed}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  >
                    <span className="text-left">{group.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
                  </button>
                  <div className={`space-y-1 ${isCollapsed ? 'hidden' : ''}`}>
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
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
                          <span className="w-5 h-5 mr-3 flex-none">
                            {item.icon ? (
                              <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                                isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                              }`} />
                            ) : null}
                          </span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            {item.name}
                          </span>
                          {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
        {/* Sign out moved to header user menu */}
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
              <div className="px-4 space-y-4 pb-4">
                {sidebarGroups.map((group) => (
                  <div key={group.title}>
                    <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {group.title}
                    </h4>
                    <div className="space-y-1">
                          {group.items.map((item) => {
                            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
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
                                <span className="w-5 h-5 mr-3 flex-none">
                                  {item.icon ? (
                                    <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                                      isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                                    }`} />
                                  ) : null}
                                </span>
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                  {item.name}
                                </span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                              </Link>
                            );
                          })}
                    </div>
                  </div>
                ))}
              </div>
            </nav>
            {/* Sign out moved to header user menu */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b lg:pl-0 transition-all duration-300 ease-in-out">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-3">
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
                    {flatSidebarItems.find((item) => item.path === location.pathname)?.name || "Admin"}
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                  <div className="hidden md:flex md:items-center md:space-x-3 text-right">
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                      <p className="text-xs text-gray-400">v1.0.0</p>
                    </div>

                    {/* Compact user menu */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-primary font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label="Open user menu"
                        >
                          <span className="sr-only">Open user menu</span>
                          <span className="uppercase">{(user?.user_metadata?.full_name || user?.email || "A").charAt(0)}</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-56 p-2">
                        <div className="px-3 py-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.user_metadata?.full_name || user?.email || 'Admin'}</p>
                          {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                        </div>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link to="/admin/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                          <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Sign Out</button>
                        </div>
                      </PopoverContent>
                    </Popover>
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
        <DialogContent className="max-w-sm p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Confirm Sign Out</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex items-center justify-end gap-2 w-full">
              <Button variant="outline" onClick={() => setShowSignOutDialog(false)} className="px-3 py-1.5 text-sm">
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmSignOut} className="px-3 py-1.5 text-sm">
                Sign Out
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

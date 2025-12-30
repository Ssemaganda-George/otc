import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Home, FileText, Users, BookOpen, Briefcase, Image, GraduationCap, Newspaper, File, Phone, Settings, Layout, Target, TrendingUp, Shield, Database } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const sidebarItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Manage Pages", path: "/admin/pages", icon: FileText },
    { name: "Manage Team", path: "/admin/team", icon: Users },
    { name: "Manage Research Experts", path: "/admin/research-experts", icon: GraduationCap },
    { name: "Manage Programs", path: "/admin/programs", icon: BookOpen },
    { name: "Manage Products", path: "/admin/products", icon: Briefcase },
    { name: "Manage Hero Slides", path: "/admin/hero-slides", icon: Image },
    { name: "Manage Blogs", path: "/admin/blogs", icon: Newspaper },
    { name: "Manage Resources", path: "/admin/resources", icon: File },
    { name: "Manage Contact Info", path: "/admin/contact-info", icon: Phone },
    { name: "Manage Footer", path: "/admin/footer", icon: Settings },
    { name: "Manage News Updates", path: "/admin/news-updates", icon: Newspaper },
    { name: "Manage Research Publications", path: "/admin/research-publications", icon: BookOpen },
    { name: "Manage Repositories", path: "/admin/repositories", icon: Database },
    { name: "Manage Home Sections", path: "/admin/home-sections", icon: Layout },
    { name: "Manage About Us", path: "/admin/about-us", icon: Layout },
    { name: "Manage What We Do", path: "/admin/what-we-do", icon: Target },
    { name: "Manage Our Impact", path: "/admin/our-impact", icon: TrendingUp },
    { name: "Manage Core Pillars", path: "/admin/core-pillars", icon: Shield },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-primary flex-shrink-0">
          <h2 className="text-white font-bold text-lg">Admin Panel</h2>
        </div>
        <nav className="flex-1 mt-8 overflow-y-auto">
          <div className="px-4 space-y-2 pb-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b lg:pl-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {sidebarItems.find(item => item.path === location.pathname)?.name || "Admin"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

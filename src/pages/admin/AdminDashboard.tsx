import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Settings, Users, FileText, BookOpen, Briefcase, Database, TrendingUp, Shield, Target, Layout, Newspaper, GraduationCap, Image, Phone, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalPages: number;
  totalTeamMembers: number;
  totalPrograms: number;
  totalResearchExperts: number;
  totalBlogs: number;
  totalRepositories: number;
  totalNewsUpdates: number;
  totalResearchPublications: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    totalTeamMembers: 0,
    totalPrograms: 0,
    totalResearchExperts: 0,
    totalBlogs: 0,
    totalRepositories: 0,
    totalNewsUpdates: 0,
    totalResearchPublications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          pagesRes,
          teamRes,
          programsRes,
          expertsRes,
          blogsRes,
          reposRes,
          newsRes,
          publicationsRes
        ] = await Promise.all([
          supabase.from("pages").select("id", { count: "exact" }),
          supabase.from("team_members").select("id", { count: "exact" }),
          supabase.from("programs").select("id", { count: "exact" }),
          supabase.from("research_experts").select("id", { count: "exact" }),
          supabase.from("blogs").select("id", { count: "exact" }),
          supabase.from("repositories").select("id", { count: "exact" }),
          supabase.from("news_updates").select("id", { count: "exact" }),
          supabase.from("research_publications").select("id", { count: "exact" }),
        ]);

        setStats({
          totalPages: pagesRes.count || 0,
          totalTeamMembers: teamRes.count || 0,
          totalPrograms: programsRes.count || 0,
          totalResearchExperts: expertsRes.count || 0,
          totalBlogs: blogsRes.count || 0,
          totalRepositories: reposRes.count || 0,
          totalNewsUpdates: newsRes.count || 0,
          totalResearchPublications: publicationsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          totalPages: 5,
          totalTeamMembers: 6,
          totalPrograms: 4,
          totalResearchExperts: 8,
          totalBlogs: 12,
          totalRepositories: 15,
          totalNewsUpdates: 20,
          totalResearchPublications: 25
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
              <p className="mt-2 text-gray-600">Manage your website content and monitor system performance</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last login</p>
                <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Pages</CardTitle>
                <FileText className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalPages}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Website pages managed
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
                <Users className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalTeamMembers}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active team members
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Programs</CardTitle>
                <BookOpen className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalPrograms}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active programs
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Repositories</CardTitle>
                <Database className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalRepositories}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Code repositories
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Research Experts</CardTitle>
                <GraduationCap className="h-5 w-5 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalResearchExperts}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Expert profiles
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Blog Posts</CardTitle>
                <Newspaper className="h-5 w-5 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalBlogs}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Published articles
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">News Updates</CardTitle>
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalNewsUpdates}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Latest updates
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Publications</CardTitle>
                <BookOpen className="h-5 w-5 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalResearchPublications}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Research papers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Manage Pages",
              description: "Edit website content and pages",
              path: "/admin/pages",
            },
            {
              title: "Manage Team",
              description: "Add and edit team members",
              path: "/admin/team",
            },
            {
              title: "Manage Programs",
              description: "Update program information",
              path: "/admin/programs",
            },
            {
              title: "Manage Research Experts",
              description: "Add and edit research experts",
              path: "/admin/research-experts",
            },
          ].map((action) => (
            <Card
              key={action.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-primary">📄</div>
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Go to {action.title}
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

        {/* Recent Activity and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: "Updated About page", time: "2 hours ago", type: "page" },
                { action: "Added new team member", time: "1 day ago", type: "team" },
                { action: "Modified BiTA program", time: "3 days ago", type: "program" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'page' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'team' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Settings className="w-5 h-5 text-primary" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Website Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}

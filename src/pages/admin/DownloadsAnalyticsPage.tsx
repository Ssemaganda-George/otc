import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart3, Download, ArrowLeft, Calendar, ChevronDown, FileText, TrendingDown, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DownloadStats {
  totalDownloads: number;
  downloadsByResource: Array<{
    repository_id: string;
    title: string;
    description: string;
    category: string;
    download_count: number;
    last_downloaded: string;
  }>;
  downloadsOverTime: Array<{
    month: string;
    downloads: number;
  }>;
  topResources: Array<{
    title: string;
    downloads: number;
    category: string;
  }>;
}

export default function DownloadsAnalyticsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMonths, setSelectedMonths] = useState<string[]>(() => {
    // Default to current month
    const now = new Date();
    return [`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`];
  });
  const [stats, setStats] = useState<DownloadStats>({
    totalDownloads: 0,
    downloadsByResource: [],
    downloadsOverTime: [],
    topResources: []
  });
  const [loading, setLoading] = useState(true);

  // Generate month options for the last 12 months
  const generateMonthOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }

    const fetchDownloadStats = async () => {
      try {
        setLoading(true);

        // Build date filter for selected months
        let dateFilter = '';
        if (selectedMonths.length > 0) {
          const monthConditions = selectedMonths.map(month => {
            const [year, monthNum] = month.split('-');
            return `EXTRACT(YEAR FROM rd.downloaded_at) = ${year} AND EXTRACT(MONTH FROM rd.downloaded_at) = ${monthNum}`;
          });
          dateFilter = `AND (${monthConditions.join(' OR ')})`;
        }

        // Get total downloads count
        const { count: totalDownloads } = await supabase
          .from('repository_downloads')
          .select('*', { count: 'exact', head: true })
          .gte('downloaded_at', selectedMonths.length > 0 ? `${selectedMonths[selectedMonths.length - 1].split('-')[0]}-${selectedMonths[selectedMonths.length - 1].split('-')[1]}-01` : '2024-01-01');

        // Get downloads by resource with repository details
        const { data: downloadsByResource } = await supabase
          .from('repository_downloads')
          .select(`
            repository_id,
            downloaded_at,
            repositories!inner (
              title,
              description,
              category
            )
          `)
          .gte('downloaded_at', selectedMonths.length > 0 ? `${selectedMonths[selectedMonths.length - 1].split('-')[0]}-${selectedMonths[selectedMonths.length - 1].split('-')[1]}-01` : '2024-01-01')
          .order('downloaded_at', { ascending: false });

        // Process downloads by resource
        const resourceStats: Record<string, {
          repository_id: string;
          title: string;
          description: string;
          category: string;
          download_count: number;
          last_downloaded: string;
        }> = {};

        downloadsByResource?.forEach((download: any) => {
          const repoId = download.repository_id;
          if (!resourceStats[repoId]) {
            resourceStats[repoId] = {
              repository_id: repoId,
              title: download.repositories.title,
              description: download.repositories.description,
              category: download.repositories.category,
              download_count: 0,
              last_downloaded: download.downloaded_at
            };
          }
          resourceStats[repoId].download_count++;
          if (new Date(download.downloaded_at) > new Date(resourceStats[repoId].last_downloaded)) {
            resourceStats[repoId].last_downloaded = download.downloaded_at;
          }
        });

        const downloadsByResourceArray = Object.values(resourceStats);

        // Get downloads over time (monthly)
        const { data: downloadsOverTimeData } = await supabase
          .from('repository_downloads')
          .select('downloaded_at')
          .gte('downloaded_at', '2024-01-01')
          .order('downloaded_at', { ascending: true });

        const monthlyDownloads = downloadsOverTimeData?.reduce((acc: any, download: any) => {
          const month = download.downloaded_at.substring(0, 7); // YYYY-MM format
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {}) || {};

        const downloadsOverTime = Object.entries(monthlyDownloads)
          .map(([month, downloads]) => ({ month, downloads: downloads as number }))
          .sort((a, b) => a.month.localeCompare(b.month));

        // Get top resources (by download count)
        const topResources = downloadsByResourceArray
          .sort((a: any, b: any) => b.download_count - a.download_count)
          .slice(0, 10)
          .map((resource: any) => ({
            title: resource.title,
            downloads: resource.download_count,
            category: resource.category
          }));

        setStats({
          totalDownloads: totalDownloads || 0,
          downloadsByResource: downloadsByResourceArray,
          downloadsOverTime,
          topResources
        });
      } catch (error) {
        console.error('Error fetching download stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadStats();
  }, [user, navigate, selectedMonths]);

  const handleMonthToggle = (monthValue: string) => {
    setSelectedMonths(prev =>
      prev.includes(monthValue)
        ? prev.filter(m => m !== monthValue)
        : [...prev, monthValue]
    );
  };

  const formatMonthLabel = (months: string[]) => {
    if (months.length === 0) return 'Select months';
    if (months.length === 1) {
      const [year, month] = months[0].split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
    return `${months.length} months selected`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Downloads Analytics</h1>
                <p className="text-gray-600">Track resource download activity and performance</p>
              </div>
            </div>

            {/* Month Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatMonthLabel(selectedMonths)}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="end">
                <div className="p-4">
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Select Months</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {monthOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={selectedMonths.includes(option.value)}
                          onCheckedChange={() => handleMonthToggle(option.value)}
                        />
                        <label
                          htmlFor={option.value}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Downloads</CardTitle>
              <Download className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : stats.totalDownloads.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Resource downloads tracked
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Resources</CardTitle>
              <FileText className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : stats.downloadsByResource.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Resources with downloads
              </p>
            </CardContent>
            </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Downloads/Resource</CardTitle>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? "..." : stats.downloadsByResource.length > 0
                  ? Math.round(stats.totalDownloads / stats.downloadsByResource.length)
                  : 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Average per resource
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Resources */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Top Downloaded Resources</span>
            </CardTitle>
            <CardDescription>
              Most popular resources by download count
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : stats.topResources.length > 0 ? (
              <div className="space-y-4">
                {stats.topResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-500">{resource.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{resource.downloads}</div>
                      <p className="text-xs text-gray-500">downloads</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No download data available for the selected period
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Resources Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>All Resources</span>
            </CardTitle>
            <CardDescription>
              Complete list of resources and their download statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : stats.downloadsByResource.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Resource Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Downloads</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Last Downloaded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.downloadsByResource.map((resource, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{resource.title}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {resource.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {resource.description || 'No description'}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-semibold text-gray-900">{resource.download_count}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600">
                            {new Date(resource.last_downloaded).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No resources found with download data
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
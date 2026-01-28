import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart3, Users, Globe, Monitor, Smartphone, Tablet, ArrowLeft, Eye, Clock, Calendar, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface VisitorStats {
  totalVisitors: number;
  totalPageViews: number;
  topPages: Array<{ page_path: string; views: number; title: string }>;
  deviceBreakdown: Array<{ device_type: string; count: number }>;
  browserBreakdown: Array<{ browser: string; count: number }>;
  countryBreakdown: Array<{ country: string; count: number }>;
  recentSessions: Array<{
    session_id: string;
    first_visit: string;
    last_visit: string;
    visit_count: number;
    total_page_views: number;
    country: string;
    city: string;
    device_type: string;
  }>;
}

export default function VisitorAnalyticsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMonths, setSelectedMonths] = useState<string[]>(() => {
    // Default to current month
    const now = new Date();
    return [`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`];
  });
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    totalPageViews: 0,
    topPages: [],
    deviceBreakdown: [],
    browserBreakdown: [],
    countryBreakdown: [],
    recentSessions: []
  });
  const [loading, setLoading] = useState(true);

  // Generate month options for the last 12 months
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const value = `${year}-${String(month).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    return { value, label };
  });

  useEffect(() => {
    fetchVisitorStats(selectedMonths);
  }, [selectedMonths]);

  const fetchVisitorStats = async (months: string[]) => {
    setLoading(true);
    try {
      // Calculate date range for all selected months
      const sortedMonths = months.sort();
      const firstMonth = sortedMonths[0];
      const lastMonth = sortedMonths[sortedMonths.length - 1];

      const [firstYear, firstMonthNum] = firstMonth.split('-').map(Number);
      const [lastYear, lastMonthNum] = lastMonth.split('-').map(Number);

      const startDate = new Date(firstYear, firstMonthNum - 1, 1); // First day of first month
      const endDate = new Date(lastYear, lastMonthNum, 1); // First day of month after last month

      // Get total visitors and page views for the selected months
      const { count: totalVisitors } = await supabase
        .from("visitor_sessions")
        .select("*", { count: "exact", head: true })
        .gte('first_visit', startDate.toISOString())
        .lt('first_visit', endDate.toISOString());

      const { count: totalPageViews, error: pageViewsError } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .not('page_path', 'ilike', '/admin%')
        .gte('viewed_at', startDate.toISOString())
        .lt('viewed_at', endDate.toISOString());

      console.log('📊 Total page views query result:', { totalPageViews, pageViewsError });
      if (pageViewsError) {
        console.error('❌ Page views query error:', pageViewsError);
      }

      // Debug: Check how many admin page views exist
      const { count: adminPageViews } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .ilike('page_path', '/admin%')
        .gte('viewed_at', startDate.toISOString())
        .lt('viewed_at', endDate.toISOString());

      console.log('🔍 Admin page views in date range:', adminPageViews);

        // Get top pages (exclude admin pages) for the selected month
        const { data: pageViewsData } = await supabase
          .from("page_views")
          .select("page_path, page_title")
          .not('page_path', 'ilike', '/admin%')
          .gte('viewed_at', startDate.toISOString())
          .lt('viewed_at', endDate.toISOString());

        const topPagesData = pageViewsData?.reduce((acc: any, view) => {
          const key = view.page_path;
          if (!acc[key]) {
            acc[key] = { path: key, title: view.page_title, count: 0 };
          }
          acc[key].count++;
          return acc;
        }, {});

        const topPages = Object.values(topPagesData || {})
          .sort((a: any, b: any) => b.count - a.count)
          .slice(0, 10)
          .map((item: any) => ({
            page_path: item.path,
            views: item.count,
            title: item.title || item.path
          }));

        // Get device breakdown for the selected month
        const { data: deviceData } = await supabase
          .from("visitor_sessions")
          .select("device_type")
          .gte('first_visit', startDate.toISOString())
          .lt('first_visit', endDate.toISOString());

        const deviceBreakdown = deviceData?.reduce((acc: any, session) => {
          const device = session.device_type || 'unknown';
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {}) || {};

        // Get browser breakdown for the selected month
        const { data: browserData } = await supabase
          .from("visitor_sessions")
          .select("browser")
          .gte('first_visit', startDate.toISOString())
          .lt('first_visit', endDate.toISOString());

        const browserBreakdown = browserData?.reduce((acc: any, session) => {
          const browser = session.browser || 'unknown';
          acc[browser] = (acc[browser] || 0) + 1;
          return acc;
        }, {}) || {};

        // Get country breakdown for the selected month
        console.log('🔍 Fetching country data for date range:', {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        });

        // TEMPORARY: Try fetching ALL country data first
        const { data: allCountryData, error: allError } = await supabase
          .from("visitor_sessions")
          .select("country, city, first_visit, session_id")
          .order('first_visit', { ascending: false })
          .limit(20);

        console.log('🔍 ALL country data in database (latest 20):', allCountryData);
        if (allError) {
          console.error('❌ All data query error:', allError);
        }

        const { data: countryData, error: countryError } = await supabase
          .from("visitor_sessions")
          .select("country")
          .gte('first_visit', startDate.toISOString())
          .lt('first_visit', endDate.toISOString());

        if (countryError) {
          console.error('❌ Country query error:', countryError);
        } else {
          console.log('📊 Raw country data from database:', countryData);
        }

        const countryBreakdown = countryData?.reduce((acc: any, session) => {
          const country = session.country || 'unknown';
          // TEMPORARY: Don't filter out 'unknown' for testing
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {}) || {};

        console.log('📈 Processed country breakdown (including unknown):', countryBreakdown);

        // Get recent sessions for the selected month
        const { data: recentSessions } = await supabase
          .from("visitor_sessions")
          .select("session_id, first_visit, last_visit, visit_count, total_page_views, country, city, device_type")
          .gte('first_visit', startDate.toISOString())
          .lt('first_visit', endDate.toISOString())
          .order("last_visit", { ascending: false })
          .limit(20);

        setStats({
          totalVisitors: totalVisitors || 0,
          totalPageViews: totalPageViews || 0,
          topPages: topPages,
          deviceBreakdown: Object.entries(deviceBreakdown).map(([device, count]) => ({
            device_type: device,
            count: count as number
          })),
          browserBreakdown: Object.entries(browserBreakdown).map(([browser, count]) => ({
            browser,
            count: count as number
          })),
          countryBreakdown: Object.entries(countryBreakdown).map(([country, count]) => ({
            country,
            count: count as number
          })),
          recentSessions: recentSessions || []
        });
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
      } finally {
        setLoading(false);
      }
    };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

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
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Visitor Analytics</h1>
                <p className="text-gray-600">Detailed visitor demographics and page insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-48 justify-between">
                      {selectedMonths.length === 0
                        ? "Select months"
                        : selectedMonths.length === 1
                        ? monthOptions.find(opt => opt.value === selectedMonths[0])?.label
                        : `${selectedMonths.length} months selected`}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0 bg-white border border-gray-200 shadow-lg" align="end">
                    <div className="p-2">
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm font-medium">Select Months</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const allSelected = selectedMonths.length === monthOptions.length;
                            if (allSelected) {
                              setSelectedMonths([]);
                            } else {
                              setSelectedMonths(monthOptions.map(opt => opt.value));
                            }
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          {selectedMonths.length === monthOptions.length ? "Clear All" : "All"}
                        </Button>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {monthOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50">
                            <Checkbox
                              id={option.value}
                              checked={selectedMonths.includes(option.value)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMonths([...selectedMonths, option.value]);
                                } else {
                                  setSelectedMonths(selectedMonths.filter(m => m !== option.value));
                                }
                              }}
                            />
                            <label
                              htmlFor={option.value}
                              className="text-sm cursor-pointer flex-1"
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.totalVisitors.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Unique sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.totalPageViews.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Total page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Pages/Session</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.totalVisitors > 0
                  ? (stats.totalPageViews / stats.totalVisitors).toFixed(1)
                  : "0"}
              </div>
              <p className="text-xs text-gray-500">Pages per visit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Top Country</CardTitle>
              <Globe className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.countryBreakdown[0]?.country || "N/A"}
              </div>
              <p className="text-xs text-gray-500">
                {stats.countryBreakdown[0]?.count || 0} visitors
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Top Pages</span>
              </CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : stats.topPages.length > 0 ? (
                  stats.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-gray-500">{page.page_path}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{page.views}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No page view data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Device and Browser Breakdown */}
          <div className="space-y-8">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  <span>Device Types</span>
                </CardTitle>
                <CardDescription>Visitor device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : stats.deviceBreakdown.length > 0 ? (
                    stats.deviceBreakdown.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(device.device_type)}
                          <span className="font-medium capitalize">{device.device_type}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{device.count}</p>
                          <p className="text-xs text-gray-500">
                            {stats.totalVisitors > 0 ? ((device.count / stats.totalVisitors) * 100).toFixed(1) : 0}%
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">No device data available</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Browser Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Browser Usage</span>
                </CardTitle>
                <CardDescription>Most popular browsers among visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : stats.browserBreakdown.length > 0 ? (
                    stats.browserBreakdown.map((browser, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                        <span className="font-medium">{browser.browser}</span>
                        <div className="text-right">
                          <p className="font-semibold">{browser.count}</p>
                          <p className="text-xs text-gray-500">
                            {stats.totalVisitors > 0 ? ((browser.count / stats.totalVisitors) * 100).toFixed(1) : 0}%
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">No browser data available</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Country Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Countries</span>
              </CardTitle>
              <CardDescription>Visitor locations by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : stats.countryBreakdown.length > 0 ? (
                  stats.countryBreakdown.slice(0, 10).map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                      <span className="font-medium">{country.country}</span>
                      <div className="text-right">
                        <p className="font-semibold">{country.count}</p>
                        <p className="text-xs text-gray-500">
                          {stats.totalVisitors > 0 ? ((country.count / stats.totalVisitors) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No country data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Sessions</span>
              </CardTitle>
              <CardDescription>Latest visitor activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : stats.recentSessions.length > 0 ? (
                  stats.recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getDeviceIcon(session.device_type)}
                          <span className="text-sm font-medium">
                            {session.country || 'Unknown'} {session.city ? `, ${session.city}` : ''}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {session.visit_count} visits • {session.total_page_views} pages
                        </p>
                        <p className="text-xs text-gray-400">
                          Last: {new Date(session.last_visit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No recent sessions</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
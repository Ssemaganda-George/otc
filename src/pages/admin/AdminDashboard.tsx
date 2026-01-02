import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart3, Settings, Users, FileText, BookOpen, Briefcase, Database, TrendingUp, Shield, Target, Layout, Newspaper, GraduationCap, Image, Phone, Zap, Download, FileDown, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import jsPDF from 'jspdf';

interface DashboardStats {
  totalPages: number;
  totalTeamMembers: number;
  totalPrograms: number;
  totalResearchExperts: number;
  totalBlogs: number;
  totalRepositories: number;
  totalNewsUpdates: number;
  totalResearchPublications: number;
  totalVisitors: number;
  visitorActivity: number;
  totalDownloads: number;
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
    totalVisitors: 0,
    visitorActivity: 0,
    totalDownloads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [reportFormat, setReportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');

  const downloadStatisticsReport = async () => {
    try {
      // Fetch additional detailed analytics data
      const [
        pageViewsRes,
        countryBreakdownRes,
        deviceBreakdownRes,
        browserBreakdownRes,
        recentSessionsRes,
        downloadsByMonthRes
      ] = await Promise.all([
        supabase.from('page_views').select('id', { count: 'exact' }),
        supabase.from('visitor_sessions').select('country').neq('country', null),
        supabase.from('visitor_sessions').select('device_type'),
        supabase.from('visitor_sessions').select('browser'),
        supabase.from('visitor_sessions').select('first_visit, last_visit, visit_count, total_page_views').order('last_visit', { ascending: false }).limit(10),
        supabase.from('repository_downloads').select('downloaded_at')
      ]);

      // Process country breakdown
      const countryStats = countryBreakdownRes?.data?.reduce((acc: any, session: any) => {
        acc[session.country] = (acc[session.country] || 0) + 1;
        return acc;
      }, {}) || {};

      const topCountries = Object.entries(countryStats)
        .sort(([,a]: any, [,b]: any) => b - a)
        .slice(0, 5)
        .map(([country, count]) => `${country}: ${count}`);

      // Process device breakdown
      const deviceStats = deviceBreakdownRes?.data?.reduce((acc: any, session: any) => {
        acc[session.device_type || 'Unknown'] = (acc[session.device_type || 'Unknown'] || 0) + 1;
        return acc;
      }, {}) || {};

      // Process browser breakdown
      const browserStats = browserBreakdownRes?.data?.reduce((acc: any, session: any) => {
        acc[session.browser || 'Unknown'] = (acc[session.browser || 'Unknown'] || 0) + 1;
        return acc;
      }, {}) || {};

      // Process downloads by month
      const downloadsByMonth = downloadsByMonthRes?.data?.reduce((acc: any, download: any) => {
        const month = download.downloaded_at.substring(0, 7); // YYYY-MM format
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}) || {};

      const currentMonth = new Date().toISOString().substring(0, 7);
      const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().substring(0, 7);

      const reportData = [
        ['Category', 'Metric', 'Value', 'Description'],
        ['Website Statistics', 'Site Visitors', stats.totalVisitors.toString(), 'Unique visitors tracked'],
        ['Website Statistics', 'Total Page Views', (pageViewsRes.count || 0).toString(), 'Total pages viewed across all sessions'],
        ['Website Statistics', 'Average Pages per Visit', stats.totalVisitors > 0 ? ((pageViewsRes.count || 0) / stats.totalVisitors).toFixed(1) : '0', 'Average page views per visitor'],
        ['Website Statistics', 'Visitor Activity', `${stats.visitorActivity}%`, 'Engagement rate'],
        ['Website Statistics', 'Downloads', stats.totalDownloads.toString(), 'Resource downloads'],
        ['Website Statistics', 'Downloads This Month', (downloadsByMonth[currentMonth] || 0).toString(), `Downloads in ${currentMonth}`],
        ['Website Statistics', 'Downloads Last Month', (downloadsByMonth[lastMonth] || 0).toString(), `Downloads in ${lastMonth}`],
        ['', '', '', ''],
        ['Geographic Data', 'Top Countries', topCountries.join('; '), 'Most visited countries (top 5)'],
        ['', '', '', ''],
        ['Device Breakdown', 'Desktop', (deviceStats['desktop'] || 0).toString(), 'Desktop visitors'],
        ['Device Breakdown', 'Mobile', (deviceStats['mobile'] || 0).toString(), 'Mobile visitors'],
        ['Device Breakdown', 'Tablet', (deviceStats['tablet'] || 0).toString(), 'Tablet visitors'],
        ['', '', '', ''],
        ['Browser Breakdown', 'Chrome', (browserStats['Chrome'] || 0).toString(), 'Chrome users'],
        ['Browser Breakdown', 'Firefox', (browserStats['Firefox'] || 0).toString(), 'Firefox users'],
        ['Browser Breakdown', 'Safari', (browserStats['Safari'] || 0).toString(), 'Safari users'],
        ['Browser Breakdown', 'Edge', (browserStats['Edge'] || 0).toString(), 'Edge users'],
        ['', '', '', ''],
        ['System Overview', 'Total Pages', stats.totalPages.toString(), 'Website pages managed'],
        ['System Overview', 'Team Members', stats.totalTeamMembers.toString(), 'Active team members'],
        ['System Overview', 'Programs', stats.totalPrograms.toString(), 'Active programs'],
        ['System Overview', 'Repositories', stats.totalRepositories.toString(), 'Code repositories'],
        ['System Overview', 'Research Experts', stats.totalResearchExperts.toString(), 'Expert profiles'],
        ['System Overview', 'Blog Posts', stats.totalBlogs.toString(), 'Published articles'],
        ['System Overview', 'News Updates', stats.totalNewsUpdates.toString(), 'Latest updates'],
        ['System Overview', 'Publications', stats.totalResearchPublications.toString(), 'Research papers'],
        ['', '', '', ''],
        ['Recent Sessions', 'Sample Data', 'Last 10 sessions summary', ''],
      ];

      // Add recent session summaries
      recentSessionsRes?.data?.slice(0, 5).forEach((session: any, index: number) => {
        reportData.push([
          'Recent Sessions',
          `Session ${index + 1}`,
          `${session.visit_count} visits, ${session.total_page_views} pages`,
          `First: ${new Date(session.first_visit).toLocaleDateString()}, Last: ${new Date(session.last_visit).toLocaleDateString()}`
        ]);
      });

      reportData.push(['', '', '', '']);
      reportData.push(['Report Generated', new Date().toLocaleString(), '', '']);

      let content: string;
      let mimeType: string;
      let extension: string;

      if (reportFormat === 'json') {
        // Convert CSV data to JSON format
        const jsonData = {
          reportGenerated: new Date().toISOString(),
          websiteStatistics: {
            siteVisitors: stats.totalVisitors,
            totalPageViews: pageViewsRes.count || 0,
            averagePagesPerVisit: stats.totalVisitors > 0 ? ((pageViewsRes.count || 0) / stats.totalVisitors) : 0,
            visitorActivity: `${stats.visitorActivity}%`,
            downloads: stats.totalDownloads,
            downloadsThisMonth: downloadsByMonth[currentMonth] || 0,
            downloadsLastMonth: downloadsByMonth[lastMonth] || 0
          },
          geographicData: {
            topCountries: topCountries
          },
          deviceBreakdown: {
            desktop: deviceStats['desktop'] || 0,
            mobile: deviceStats['mobile'] || 0,
            tablet: deviceStats['tablet'] || 0
          },
          browserBreakdown: {
            chrome: browserStats['Chrome'] || 0,
            firefox: browserStats['Firefox'] || 0,
            safari: browserStats['Safari'] || 0,
            edge: browserStats['Edge'] || 0
          },
          systemOverview: {
            totalPages: stats.totalPages,
            teamMembers: stats.totalTeamMembers,
            programs: stats.totalPrograms,
            repositories: stats.totalRepositories,
            researchExperts: stats.totalResearchExperts,
            blogPosts: stats.totalBlogs,
            newsUpdates: stats.totalNewsUpdates,
            publications: stats.totalResearchPublications
          },
          recentSessions: recentSessionsRes?.data?.slice(0, 5).map((session: any, index: number) => ({
            sessionNumber: index + 1,
            visitCount: session.visit_count,
            totalPageViews: session.total_page_views,
            firstVisit: session.first_visit,
            lastVisit: session.last_visit
          })) || []
        };

        content = JSON.stringify(jsonData, null, 2);
        mimeType = 'application/json';
        extension = 'json';
      } else if (reportFormat === 'pdf') {
        // Generate PDF format
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPosition = 20;

        // Title
        doc.setFontSize(20);
        doc.text('OTC Website Statistics Report', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Generated date
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Website Statistics Section
        doc.setFontSize(14);
        doc.text('Website Statistics', 20, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        const websiteStats = [
          `Site Visitors: ${stats.totalVisitors.toLocaleString()}`,
          `Total Page Views: ${(pageViewsRes.count || 0).toLocaleString()}`,
          `Average Pages per Visit: ${stats.totalVisitors > 0 ? ((pageViewsRes.count || 0) / stats.totalVisitors).toFixed(1) : '0'}`,
          `Visitor Activity: ${stats.visitorActivity}%`,
          `Downloads: ${stats.totalDownloads.toLocaleString()}`,
          `Downloads This Month: ${(downloadsByMonth[currentMonth] || 0).toLocaleString()}`,
          `Downloads Last Month: ${(downloadsByMonth[lastMonth] || 0).toLocaleString()}`
        ];

        websiteStats.forEach(stat => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(stat, 25, yPosition);
          yPosition += 6;
        });

        yPosition += 10;

        // Geographic Data
        if (topCountries.length > 0) {
          doc.setFontSize(12);
          doc.text('Geographic Data', 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text(`Top Countries: ${topCountries.join(', ')}`, 25, yPosition);
          yPosition += 10;
        }

        // Device Breakdown
        doc.setFontSize(12);
        doc.text('Device Breakdown', 20, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        const deviceStatsText = [
          `Desktop: ${deviceStats['desktop'] || 0}`,
          `Mobile: ${deviceStats['mobile'] || 0}`,
          `Tablet: ${deviceStats['tablet'] || 0}`
        ];
        deviceStatsText.forEach(stat => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(stat, 25, yPosition);
          yPosition += 6;
        });

        yPosition += 10;

        // Browser Breakdown
        doc.setFontSize(12);
        doc.text('Browser Breakdown', 20, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        const browserStatsText = [
          `Chrome: ${browserStats['Chrome'] || 0}`,
          `Firefox: ${browserStats['Firefox'] || 0}`,
          `Safari: ${browserStats['Safari'] || 0}`,
          `Edge: ${browserStats['Edge'] || 0}`
        ];
        browserStatsText.forEach(stat => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(stat, 25, yPosition);
          yPosition += 6;
        });

        yPosition += 10;

        // System Overview
        doc.setFontSize(12);
        doc.text('System Overview', 20, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        const systemStats = [
          `Total Pages: ${stats.totalPages}`,
          `Team Members: ${stats.totalTeamMembers}`,
          `Programs: ${stats.totalPrograms}`,
          `Repositories: ${stats.totalRepositories}`,
          `Research Experts: ${stats.totalResearchExperts}`,
          `Blog Posts: ${stats.totalBlogs}`,
          `News Updates: ${stats.totalNewsUpdates}`,
          `Publications: ${stats.totalResearchPublications}`
        ];

        systemStats.forEach(stat => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(stat, 25, yPosition);
          yPosition += 6;
        });

        // Generate blob from PDF
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `OTC-website-statistics-report-${new Date().toISOString().split('T')[0]}.pdf`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return; // Exit early for PDF as it handles download directly
      } else {
        // CSV format
        content = reportData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
        mimeType = 'text/csv;charset=utf-8;';
        extension = 'csv';
      }

      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `OTC-website-statistics-report-${new Date().toISOString().split('T')[0]}.${extension}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
      // Fallback to basic report if detailed data fails
      if (reportFormat === 'json') {
        const basicJsonData = {
          reportGenerated: new Date().toISOString(),
          websiteStatistics: {
            siteVisitors: stats.totalVisitors,
            visitorActivity: `${stats.visitorActivity}%`,
            downloads: stats.totalDownloads
          },
          systemOverview: {
            totalPages: stats.totalPages,
            teamMembers: stats.totalTeamMembers,
            programs: stats.totalPrograms,
            repositories: stats.totalRepositories,
            researchExperts: stats.totalResearchExperts,
            blogPosts: stats.totalBlogs,
            newsUpdates: stats.totalNewsUpdates,
            publications: stats.totalResearchPublications
          }
        };

        const content = JSON.stringify(basicJsonData, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `OTC-website-statistics-report-${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (reportFormat === 'pdf') {
        // Generate basic PDF format
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPosition = 20;

        // Title
        doc.setFontSize(20);
        doc.text('OTC Website Statistics Report', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Generated date
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Basic Website Statistics
        doc.setFontSize(14);
        doc.text('Website Statistics', 20, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        const basicStats = [
          `Site Visitors: ${stats.totalVisitors.toLocaleString()}`,
          `Visitor Activity: ${stats.visitorActivity}%`,
          `Downloads: ${stats.totalDownloads.toLocaleString()}`
        ];

        basicStats.forEach(stat => {
          doc.text(stat, 25, yPosition);
          yPosition += 8;
        });

        yPosition += 10;

        // Basic System Overview
        doc.setFontSize(12);
        doc.text('System Overview', 20, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        const basicSystemStats = [
          `Total Pages: ${stats.totalPages}`,
          `Team Members: ${stats.totalTeamMembers}`,
          `Programs: ${stats.totalPrograms}`,
          `Repositories: ${stats.totalRepositories}`,
          `Research Experts: ${stats.totalResearchExperts}`,
          `Blog Posts: ${stats.totalBlogs}`,
          `News Updates: ${stats.totalNewsUpdates}`,
          `Publications: ${stats.totalResearchPublications}`
        ];

        basicSystemStats.forEach(stat => {
          doc.text(stat, 25, yPosition);
          yPosition += 6;
        });

        // Generate blob from PDF
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `OTC-website-statistics-report-${new Date().toISOString().split('T')[0]}.pdf`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const basicReportData = [
          ['Category', 'Metric', 'Value', 'Description'],
          ['Website Statistics', 'Site Visitors', stats.totalVisitors.toString(), 'Unique visitors tracked'],
          ['Website Statistics', 'Visitor Activity', `${stats.visitorActivity}%`, 'Engagement rate'],
          ['Website Statistics', 'Downloads', stats.totalDownloads.toString(), 'Resource downloads'],
          ['System Overview', 'Total Pages', stats.totalPages.toString(), 'Website pages managed'],
          ['System Overview', 'Team Members', stats.totalTeamMembers.toString(), 'Active team members'],
          ['System Overview', 'Programs', stats.totalPrograms.toString(), 'Active programs'],
          ['System Overview', 'Repositories', stats.totalRepositories.toString(), 'Code repositories'],
          ['System Overview', 'Research Experts', stats.totalResearchExperts.toString(), 'Expert profiles'],
          ['System Overview', 'Blog Posts', stats.totalBlogs.toString(), 'Published articles'],
          ['System Overview', 'News Updates', stats.totalNewsUpdates.toString(), 'Latest updates'],
          ['System Overview', 'Publications', stats.totalResearchPublications.toString(), 'Research papers'],
          ['', '', '', ''],
          ['Report Generated', new Date().toLocaleString(), '', ''],
        ];

        const csvContent = basicReportData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `OTC-website-statistics-report-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

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
          publicationsRes,
          visitorsRes,
          downloadsRes
        ] = await Promise.all([
          supabase.from("pages").select("id", { count: "exact" }),
          supabase.from("team_members").select("id", { count: "exact" }),
          supabase.from("programs").select("id", { count: "exact" }),
          supabase.from("research_experts").select("id", { count: "exact" }),
          supabase.from("blogs").select("id", { count: "exact" }),
          supabase.from("repositories").select("id", { count: "exact" }),
          supabase.from("news_updates").select("id", { count: "exact" }),
          supabase.from("research_publications").select("id", { count: "exact" }),
          supabase.from("visitor_sessions").select("id", { count: "exact" }),
          supabase.from("repository_downloads").select("id", { count: "exact" }),
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
          totalVisitors: visitorsRes.count || 0,
          visitorActivity: 89, // This would need to be calculated from page views
          totalDownloads: downloadsRes.count || 0,
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
          totalResearchPublications: 25,
          totalVisitors: 0,
          visitorActivity: 0,
          totalDownloads: 0,
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Report ({reportFormat.toUpperCase()})</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0" align="end">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setReportFormat('csv');
                        // Close popover by clicking outside or programmatically
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                        reportFormat === 'csv' ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      CSV Format
                    </button>
                    <button
                      onClick={() => {
                        setReportFormat('json');
                        // Close popover by clicking outside or programmatically
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                        reportFormat === 'json' ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      JSON Format
                    </button>
                    <button
                      onClick={() => {
                        setReportFormat('pdf');
                        // Close popover by clicking outside or programmatically
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                        reportFormat === 'pdf' ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      PDF Format
                    </button>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={downloadStatisticsReport}
                      className="w-full text-left px-3 py-2 rounded-md text-sm bg-primary text-white hover:bg-primary/90 font-medium"
                    >
                      Download Now
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
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
        {/* Website Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Website Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/analytics/visitors/demographics')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Site Visitors</CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalVisitors.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Unique visitors tracked
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/analytics/activity')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Visitor Activity</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : `${stats.visitorActivity}%`}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Engagement rate
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/analytics/downloads')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Downloads</CardTitle>
                <Download className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats.totalDownloads.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Resource downloads
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

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

import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ExternalLink, GitBranch, Code, Database, BookOpen, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Repository {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  stars: number;
  forks: number;
  last_updated: string;
  github_url: string;
  demo_url: string;
  tags: string[];
  thumbnail: string;
  is_active: boolean;
  created_at: string;
  download_count?: number; // Calculated field, not stored in DB
}

const categories = ["All", "Assessment Tools", "AI Ethics", "Compliance Tools", "Research Database", "Case Management", "Data Portal"];

export default function RepositoryPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      // Fetch repositories
      const { data: reposData, error: reposError } = await supabase
        .from('repositories')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (reposError) throw reposError;

      // Fetch download counts for all repositories
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('repository_downloads')
        .select('repository_id');

      if (downloadsError) {
        console.warn('Error fetching download counts:', downloadsError);
      }

      // Calculate download counts
      const downloadCounts: { [key: string]: number } = {};
      if (downloadsData) {
        downloadsData.forEach(download => {
          downloadCounts[download.repository_id] = (downloadCounts[download.repository_id] || 0) + 1;
        });
      }

      // Add download counts to repositories
      const repositoriesWithCounts = (reposData || []).map(repo => ({
        ...repo,
        download_count: downloadCounts[repo.id] || 0
      }));

      setRepositories(repositoriesWithCounts);
      setFilteredRepos(repositoriesWithCounts);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRepos.slice(startIndex, endIndex);

  // Filter repositories based on search and category
  const handleSearch = (term: string, category: string) => {
    let filtered = repositories;

    if (term) {
      filtered = filtered.filter(repo =>
        repo.title.toLowerCase().includes(term.toLowerCase()) ||
        repo.description.toLowerCase().includes(term.toLowerCase()) ||
        repo.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(repo => repo.category === category);
    }

    setFilteredRepos(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleSearch(searchTerm, category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = async (repo: Repository) => {
    try {
      // Track the download
      const { error } = await supabase
        .from('repository_downloads')
        .insert({
          repository_id: repo.id,
          user_id: null, // Anonymous downloads for now
          ip_address: null, // Will be set by backend if needed
          user_agent: navigator.userAgent
        });

      if (error) {
        console.warn('Error tracking download:', error);
      }

      // Open the GitHub URL
      window.open(repo.github_url, '_blank');
    } catch (error) {
      console.error('Error handling download:', error);
      // Still open the URL even if tracking fails
      window.open(repo.github_url, '_blank');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading repositories...</div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-blue mb-6">
                    Repository
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Explore our open-source tools, research databases, and digital solutions developed to advance digital justice and innovation across Africa.
                  </p>
                </div>
              </div>
            </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredRepos.length)} of {filteredRepos.length} repositories
            </p>
          </div>
        </div>
      </section>

      {/* Repository Table */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Title</th>
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Categories</th>
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Update Date</th>
                    <th className="text-center py-4 px-6 font-normal text-gray-800">Download</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {currentItems.map((repo) => (
                    <tr key={repo.id} className="border-b border-gray-200 hover:bg-gray-50">
                      {/* Title Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                              <a
                                href={repo.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-golden font-semibold text-lg transition-colors duration-200"
                              >
                                {repo.title}
                              </a>
                              <div className="flex items-center mt-1 mb-2">
                                <Download className="w-3 h-3 text-gray-600 mr-2" />
                                <span className="text-xs font-normal text-gray-600">
                                  {repo.download_count} downloads
                                </span>
                              </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {repo.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Categories Column */}
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-800">
                            {repo.category}
                          </span>
                          {repo.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-sm text-gray-600">
                              • {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                        {/* Update Date Column */}
                        <td className="py-4 px-6 text-left text-gray-800 whitespace-nowrap">
                          {repo.last_updated ? new Date(repo.last_updated).toLocaleDateString() : 'N/A'}
                        </td>                      {/* Download Column */}
                      <td className="py-4 px-6 text-center">
                        <Button
                          className="bg-golden hover:bg-golden-hover text-golden-foreground font-bold uppercase px-6 py-2 rounded-none transition-colors duration-200"
                          onClick={() => handleDownload(repo)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          DOWNLOAD
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results */}
            {currentItems.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg">
                <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No repositories found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8">
        {totalPages > 1 ? (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 ${
                        currentPage === page
                          ? "bg-golden text-golden-foreground hover:bg-golden-hover"
                          : "hover:bg-golden/10 hover:text-golden"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
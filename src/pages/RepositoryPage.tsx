import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ExternalLink, GitBranch, Code, Database, BookOpen, Github, ChevronLeft, ChevronRight, Heart, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
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
  document_url?: string; // URL to downloadable document
  tags: string[];
  thumbnail: string;
  is_active: boolean;
  created_at: string;
  download_count?: number;
  like_count?: number;
  reshare_count?: number;
}

const categories = ["All", "Assessment Tools", "AI Ethics", "Compliance Tools", "Research Database", "Case Management", "Data Portal"];

export default function RepositoryPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [reshareDropdownOpen, setReshareDropdownOpen] = useState<string | null>(null);

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

      setRepositories(reposData || []);
      setFilteredRepos(reposData || []);
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
      // Get current download count
      const { data: currentRepo, error: fetchError } = await supabase
        .from('repositories')
        .select('download_count')
        .eq('id', repo.id)
        .single();

      if (fetchError) {
        console.warn('Download tracking not available - columns may not exist:', fetchError);
        // Still proceed with download
      } else {
        // Increment download count
        const newCount = (currentRepo?.download_count || 0) + 1;
        const { error: updateError } = await supabase
          .from('repositories')
          .update({ download_count: newCount })
          .eq('id', repo.id);

        if (updateError) {
          console.warn('Error updating download count:', updateError);
        } else {
          // Update local state to reflect the new count
          setRepositories(prev => prev.map(r =>
            r.id === repo.id
              ? { ...r, download_count: newCount }
              : r
          ));
          setFilteredRepos(prev => prev.map(r =>
            r.id === repo.id
              ? { ...r, download_count: newCount }
              : r
          ));
        }
      }

      // Check if there's a document URL to download from
      if (repo.document_url) {
        // Fetch the file and trigger download (like research publications)
        const response = await fetch(repo.document_url);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Extract filename from URL or create a default one
        const filename = repo.document_url.split('/').pop() || `${repo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_documentation`;

        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
      } else if (repo.github_url) {
        // Fallback to GitHub URL
        window.open(repo.github_url, '_blank');
      } else {
        // No download URL available
        alert('No downloadable document available for this repository.');
      }
    } catch (error) {
      console.error('Error handling download:', error);
      alert('Error downloading document. Please try again.');
    }
  };

  const handleLike = async (repositoryId: string) => {
    try {
      // Get current like count
      const { data: currentRepo, error: fetchError } = await supabase
        .from('repositories')
        .select('like_count')
        .eq('id', repositoryId)
        .single();

      if (fetchError) {
        console.warn('Like functionality not available - columns may not exist:', fetchError);
        // Still update local state for UI feedback
        setRepositories(prev => prev.map(repo =>
          repo.id === repositoryId
            ? { ...repo, like_count: (repo.like_count || 0) + 1 }
            : repo
        ));
        setFilteredRepos(prev => prev.map(repo =>
          repo.id === repositoryId
            ? { ...repo, like_count: (repo.like_count || 0) + 1 }
            : repo
        ));
        return;
      }

      // Increment like count
      const newCount = (currentRepo?.like_count || 0) + 1;
      const { error: updateError } = await supabase
        .from('repositories')
        .update({ like_count: newCount })
        .eq('id', repositoryId);

      if (updateError) {
        console.warn('Error updating like count:', updateError);
        return;
      }

      // Update local state to reflect the new count
      setRepositories(prev => prev.map(repo =>
        repo.id === repositoryId
          ? { ...repo, like_count: newCount }
          : repo
      ));
      setFilteredRepos(prev => prev.map(repo =>
        repo.id === repositoryId
          ? { ...repo, like_count: newCount }
          : repo
      ));
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleReshare = async (repositoryId: string, platform?: string) => {
    try {
      // Get current reshare count
      const { data: currentRepo, error: fetchError } = await supabase
        .from('repositories')
        .select('reshare_count')
        .eq('id', repositoryId)
        .single();

      if (fetchError) {
        console.warn('Reshare functionality not available - columns may not exist:', fetchError);
        // Still update local state for UI feedback
        setRepositories(prev => prev.map(repo =>
          repo.id === repositoryId
            ? { ...repo, reshare_count: (repo.reshare_count || 0) + 1 }
            : repo
        ));
        setFilteredRepos(prev => prev.map(repo =>
          repo.id === repositoryId
            ? { ...repo, reshare_count: (repo.reshare_count || 0) + 1 }
            : repo
        ));

        // Still share on platform if specified
        if (platform) {
          const repository = repositories.find(r => r.id === repositoryId);
          if (repository) {
            shareOnPlatform(platform, repository);
          }
        }
        return;
      }

      // Increment reshare count
      const newCount = (currentRepo?.reshare_count || 0) + 1;
      const { error: updateError } = await supabase
        .from('repositories')
        .update({ reshare_count: newCount })
        .eq('id', repositoryId);

      if (updateError) {
        console.warn('Error updating reshare count:', updateError);
        return;
      }

      // Update local state to reflect the new count
      setRepositories(prev => prev.map(repo =>
        repo.id === repositoryId
          ? { ...repo, reshare_count: newCount }
          : repo
      ));
      setFilteredRepos(prev => prev.map(repo =>
        repo.id === repositoryId
          ? { ...repo, reshare_count: newCount }
          : repo
      ));

      // If platform is specified, share on that platform
      if (platform) {
        const repository = repositories.find(r => r.id === repositoryId);
        if (repository) {
          shareOnPlatform(platform, repository);
        }
      }
    } catch (error) {
      console.error('Error handling reshare:', error);
    }
  };

  const shareOnPlatform = (platform: string, repository: Repository) => {
    const url = encodeURIComponent(repository.github_url);
    const title = encodeURIComponent(repository.title);
    const text = encodeURIComponent(`Check out this repository: ${repository.title}`);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background custom-scrollbar font-poppins">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading repositories...</div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Title</th>
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Categories</th>
                    <th className="text-left py-4 px-6 font-normal text-gray-800">Update Date</th>
                    <th className="text-center py-4 px-6 font-normal text-gray-800">Actions</th>
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
                                  42 downloads
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
                        </td>
                        {/* Actions Column */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(repo)}
                              className="relative flex items-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              <span className="absolute -top-1 -right-1 text-xs bg-primary text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                                42
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLike(repo.id)}
                              className="relative flex items-center justify-center"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                                27
                              </span>
                            </Button>
                            <div className="relative">
                              <Button
                                variant="outline"
                                size="sm"
                                className="relative flex items-center justify-center"
                                onMouseEnter={() => setReshareDropdownOpen(repo.id)}
                                onMouseLeave={() => setReshareDropdownOpen(null)}
                                onClick={(e) => { e.stopPropagation(); handleReshare(repo.id); }}
                              >
                                <Share2 className="w-4 h-4" />
                                <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                                  15
                                </span>
                              </Button>

                              {/* Social Media Dropdown */}
                              {reshareDropdownOpen === repo.id && (
                                <div
                                  className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-20"
                                  onMouseEnter={() => setReshareDropdownOpen(repo.id)}
                                  onMouseLeave={() => setReshareDropdownOpen(null)}
                                >
                                  <div className="flex gap-1">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleReshare(repo.id, 'facebook'); }}
                                      className="p-2 hover:bg-blue-50 rounded transition-colors"
                                      title="Share on Facebook"
                                    >
                                      <Facebook className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleReshare(repo.id, 'twitter'); }}
                                      className="p-2 hover:bg-sky-50 rounded transition-colors"
                                      title="Share on Twitter"
                                    >
                                      <Twitter className="w-4 h-4 text-sky-500" />
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleReshare(repo.id, 'linkedin'); }}
                                      className="p-2 hover:bg-blue-50 rounded transition-colors"
                                      title="Share on LinkedIn"
                                    >
                                      <Linkedin className="w-4 h-4 text-blue-700" />
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleReshare(repo.id, 'email'); }}
                                      className="p-2 hover:bg-gray-50 rounded transition-colors"
                                      title="Share via Email"
                                    >
                                      <Mail className="w-4 h-4 text-gray-600" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
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
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, Download, X, Loader2, ChevronLeft, ChevronRight, Heart, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface NewsUpdate {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  pdf_url: string;
  gallery_images: string[];
  publish_date: string;
  is_featured: boolean;
  category: string;
  tags: string[];
  display_order: number;
  download_count: number;
  like_count: number;
  reshare_count: number;
  created_at: string;
}

export default function NewsUpdatesPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');

  // Add state for image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imageOpacity, setImageOpacity] = useState<number>(1);

  // Add state for news updates
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [reshareDropdownOpen, setReshareDropdownOpen] = useState<string | null>(null);

  // Define gallery images
  const galleryImages = [
    '/images/DFA-25-Speakers-X-D01-09.jpg',
    '/images/DJP_5020.jpg',
    '/images/DFA-2.jpg',
    '/images/DJP_5027.jpg',
    '/images/DJP_5167.jpg'
  ];

  useEffect(() => {
    fetchNewsUpdates();
  }, []);

  // Close reshare dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reshareDropdownOpen && !(event.target as Element).closest('.reshare-dropdown')) {
        setReshareDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [reshareDropdownOpen]);

  const fetchNewsUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news updates:', error);
        setNewsUpdates([]);
      } else {
        // Ensure engagement columns exist with defaults
        const processedData = (data || []).map(item => ({
          ...item,
          download_count: item.download_count ?? 0,
          like_count: item.like_count ?? 0,
          reshare_count: item.reshare_count ?? 0,
          display_order: item.display_order ?? 0
        }));
        setNewsUpdates(processedData);
      }
    } catch (error) {
      console.error('Error fetching news updates:', error);
      setNewsUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (newsUpdate: NewsUpdate) => {
    try {
      // Try to update download count, but don't fail if column doesn't exist
      try {
        const { error } = await supabase
          .from('news_updates')
          .update({ download_count: newsUpdate.download_count + 1 })
          .eq('id', newsUpdate.id);

        if (!error) {
          // Update local state
          setNewsUpdates(prev => prev.map(item =>
            item.id === newsUpdate.id
              ? { ...item, download_count: item.download_count + 1 }
              : item
          ));
        }
      } catch (dbError) {
        console.warn('Database update failed, continuing with download:', dbError);
      }

      // Handle download
      if (newsUpdate.pdf_url) {
        const link = document.createElement('a');
        link.href = newsUpdate.pdf_url;
        link.download = `${newsUpdate.slug}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  const handleLike = async (newsUpdate: NewsUpdate) => {
    try {
      // Try to update like count, but don't fail if column doesn't exist
      try {
        const { error } = await supabase
          .from('news_updates')
          .update({ like_count: newsUpdate.like_count + 1 })
          .eq('id', newsUpdate.id);

        if (!error) {
          setNewsUpdates(prev => prev.map(item =>
            item.id === newsUpdate.id
              ? { ...item, like_count: item.like_count + 1 }
              : item
          ));
        }
      } catch (dbError) {
        console.warn('Database update failed, continuing with like:', dbError);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleReshare = async (newsUpdate: NewsUpdate, platform: string) => {
    try {
      // Try to update reshare count, but don't fail if column doesn't exist
      try {
        const { error } = await supabase
          .from('news_updates')
          .update({ reshare_count: newsUpdate.reshare_count + 1 })
          .eq('id', newsUpdate.id);

        if (!error) {
          setNewsUpdates(prev => prev.map(item =>
            item.id === newsUpdate.id
              ? { ...item, reshare_count: item.reshare_count + 1 }
              : item
          ));
        }
      } catch (dbError) {
        console.warn('Database update failed, continuing with reshare:', dbError);
      }

      // Handle social sharing
      const url = `${window.location.origin}/news/${newsUpdate.slug}`;
      const text = `Check out this news update: ${newsUpdate.title}`;

      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(newsUpdate.title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }

      setReshareDropdownOpen(null);
    } catch (error) {
      console.error('Error handling reshare:', error);
    }
  };

  const openPdfModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    if (pdfUrl.includes('OTC-Press-Release')) {
      setPdfTitle('OTC Press Release');
    } else if (pdfUrl.includes('Court-Release')) {
      setPdfTitle('Court Release');
    } else {
      setPdfTitle('Document Preview');
    }
  };

  const closePdfModal = () => {
    setSelectedPdf(null);
    setPdfTitle('');
  };

  // Add functions for image modal
  const openImageModal = (imageUrl: string) => {
    const index = galleryImages.indexOf(imageUrl);
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
    setImageTitle(`Image Preview (${index + 1} of ${galleryImages.length})`);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageTitle('');
  };

  const prevImage = () => {
    setImageOpacity(0);
    setTimeout(() => {
      const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : galleryImages.length - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(galleryImages[newIndex]);
      setImageTitle(`Image Preview (${newIndex + 1} of ${galleryImages.length})`);
      setImageOpacity(1);
    }, 300);
  };

  const nextImage = () => {
    setImageOpacity(0);
    setTimeout(() => {
      const newIndex = selectedImageIndex < galleryImages.length - 1 ? selectedImageIndex + 1 : 0;
      setSelectedImageIndex(newIndex);
      setSelectedImage(galleryImages[newIndex]);
      setImageTitle(`Image Preview (${newIndex + 1} of ${galleryImages.length})`);
      setImageOpacity(1);
    }, 300);
  };

  // Add state for newsletter subscription
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API endpoint (e.g., Mailchimp or your backend)
      const response = await fetch('/api/subscribe', { // Example: POST to your API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you for subscribing! You\'ll receive updates soon.' });
        setEmail(''); // Clear input on success
      } else {
        throw new Error('Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-background" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-gradient-blue mb-6 md:mb-8 px-4">
                News & Updates
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
                Stay informed about OTC's latest developments, research findings, advocacy wins,
                and insights on technology, human rights, and digital transformation across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* News & Updates Articles Section */}
        <section className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-gradient-blue mb-3 md:mb-4 px-4">
                  Latest News & Updates
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
                  Stay informed about OTC's latest developments, research findings, advocacy wins, and insights on technology, human rights, and digital transformation across Africa.
                </p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 md:py-24">
                  <Loader2 className="w-8 h-8 md:w-12 md:h-12 animate-spin text-primary mb-4" />
                  <span className="text-base md:text-lg text-muted-foreground">Loading news updates...</span>
                </div>
              ) : newsUpdates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {newsUpdates.map((newsUpdate) => (
                    <article key={newsUpdate.id} className="bg-card rounded-none shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      {/* Featured Image */}
                      {newsUpdate.featured_image && (
                        <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                          <img
                            src={newsUpdate.featured_image}
                            alt={newsUpdate.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {newsUpdate.is_featured && (
                            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-primary-foreground px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                              Featured
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4 md:p-6">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-secondary/10 text-secondary px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                            {newsUpdate.category || 'News'}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {newsUpdate.title}
                        </h3>

                        {/* Excerpt */}
                        {newsUpdate.excerpt && (
                          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {newsUpdate.excerpt}
                          </p>
                        )}

                        {/* Engagement Badges */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 md:gap-4">
                            {/* Download Badge */}
                            <button
                              onClick={() => handleDownload(newsUpdate)}
                              className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium transition-colors touch-manipulation min-h-[32px]"
                              aria-label={`Download ${newsUpdate.title}`}
                            >
                              <Download className="w-3 h-3 flex-shrink-0" />
                              <span className="hidden sm:inline">{newsUpdate.download_count}</span>
                            </button>

                            {/* Like Badge */}
                            <button
                              onClick={() => handleLike(newsUpdate)}
                              className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium transition-colors touch-manipulation min-h-[32px]"
                              aria-label={`Like ${newsUpdate.title}`}
                            >
                              <Heart className="w-3 h-3 flex-shrink-0" />
                              <span className="hidden sm:inline">{newsUpdate.like_count}</span>
                            </button>

                            {/* Reshare Badge with Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() => setReshareDropdownOpen(reshareDropdownOpen === newsUpdate.id ? null : newsUpdate.id)}
                                className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-600 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium transition-colors touch-manipulation min-h-[32px]"
                                aria-label={`Share ${newsUpdate.title}`}
                              >
                                <Share2 className="w-3 h-3 flex-shrink-0" />
                                <span className="hidden sm:inline">{newsUpdate.reshare_count}</span>
                              </button>

                              {/* Reshare Dropdown */}
                              {reshareDropdownOpen === newsUpdate.id && (
                                <div className="reshare-dropdown absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[140px] md:min-w-[160px]">
                                  <button
                                    onClick={() => handleReshare(newsUpdate, 'facebook')}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors touch-manipulation"
                                  >
                                    <Facebook className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    Facebook
                                  </button>
                                  <button
                                    onClick={() => handleReshare(newsUpdate, 'twitter')}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors touch-manipulation"
                                  >
                                    <Twitter className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                    Twitter
                                  </button>
                                  <button
                                    onClick={() => handleReshare(newsUpdate, 'linkedin')}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors touch-manipulation"
                                  >
                                    <Linkedin className="w-4 h-4 text-blue-700 flex-shrink-0" />
                                    LinkedIn
                                  </button>
                                  <button
                                    onClick={() => handleReshare(newsUpdate, 'email')}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors touch-manipulation"
                                  >
                                    <Mail className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                    Email
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Date */}
                          <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(newsUpdate.publish_date).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 touch-manipulation min-h-[40px] text-sm"
                            onClick={() => window.open(`/news/${newsUpdate.slug}`, '_blank')}
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                          </Button>
                          {newsUpdate.pdf_url && (
                            <Button
                              variant="golden"
                              size="sm"
                              className="touch-manipulation min-h-[40px] px-3"
                              onClick={() => handleDownload(newsUpdate)}
                            >
                              <Download className="w-4 h-4 flex-shrink-0" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 md:py-24">
                  <Newspaper className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-muted-foreground mb-2">No News Updates Yet</h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">Check back soon for the latest updates from OTC.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-gradient-blue mb-3 md:mb-4 px-4">
                Stay Updated
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
                Subscribe to our newsletter to receive the latest news, research updates, and advocacy insights directly in your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto px-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base touch-manipulation min-h-[48px]"
                    required
                  />
                  <Button type="submit" disabled={isLoading} className="px-6 py-3 touch-manipulation min-h-[48px] text-base">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>

                {message && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-gradient-blue mb-3 md:mb-4 px-4">
                  Stay Connected
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
                  Be the first to know about our latest research, advocacy wins, and insights on technology and human rights in Africa.
                </p>
              </div>

              <div className="bg-card border border-border rounded-none p-6 md:p-8 lg:p-12 shadow-card max-w-2xl mx-auto">
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold text-foreground mb-3 md:mb-4">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Get exclusive access to our latest updates, research findings, and thought leadership content.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 md:mb-6">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-background border border-input rounded-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base touch-manipulation min-h-[48px]"
                      disabled={isLoading}
                    />
                    <Button variant="golden" type="submit" disabled={isLoading} className="group rounded-none touch-manipulation min-h-[48px] px-4 md:px-6 text-base">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>

                  {message && (
                    <div className={`p-3 md:p-4 rounded-none text-sm mb-4 ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                      {message.text}
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By subscribing, you agree to receive updates from OneTechConnect.
                      We respect your privacy and you can unsubscribe at any time.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* PDF Preview Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/80">
            <h3 className="text-lg font-semibold text-white">{pdfTitle}</h3>
            <button onClick={closePdfModal} className="text-white hover:text-primary">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <iframe
              src={`${selectedPdf}#zoom=page-fit`}
              className="w-full h-full border-none"
              title={pdfTitle}
              style={{
                border: "none",
                minHeight: "100vh", // Ensure it can scroll if taller than viewport
                touchAction: "manipulation", // Allow pinch-to-zoom and pan
              }}
              allow="fullscreen"
            />
            <div className="py-4 flex justify-center bg-black/80 w-full">
              <Button variant="golden" size="lg" asChild>
                <a href={selectedPdf} download>
                  <Download className="w-5 h-5 mr-2" />
                  Download {pdfTitle}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/80">
            <h3 className="text-lg font-semibold text-white">{imageTitle}</h3>
            <button onClick={closeImageModal} className="text-white hover:text-primary">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <img
              src={selectedImage}
              alt={imageTitle}
              className="max-w-full max-h-full object-contain"
              style={{
                opacity: imageOpacity,
                transition: 'opacity 0.3s ease-in-out',
                touchAction: "manipulation", // Allow pinch-to-zoom and pan
              }}
            />
            <div className="absolute bottom-0 w-full bg-black/80 py-4">
              <div className="flex justify-center items-center gap-4 px-4">
                <Button variant="outline" size="sm" onClick={prevImage} className="text-white border-white hover:bg-white hover:text-black">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextImage} className="text-white border-white hover:bg-white hover:text-black">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <Button variant="golden" size="lg" asChild>
                  <a href={selectedImage} download>
                    <Download className="w-5 h-5 mr-2" />
                    Download {imageTitle}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

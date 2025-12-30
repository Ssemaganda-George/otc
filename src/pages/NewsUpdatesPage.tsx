import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper, Download, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react"; // Added ChevronLeft, ChevronRight
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NewsUpdatesPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');

  // Add state for image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imageOpacity, setImageOpacity] = useState<number>(1);

  // Define gallery images
  const galleryImages = [
    '/images/DFA-25-Speakers-X-D01-09.jpg',
    '/images/DJP_5020.jpg',
    '/images/DFA-2.jpg',
    '/images/DJP_5027.jpg',
    '/images/DJP_5167.jpg'
  ];

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

  // Add state for expandable description
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-background" />
              </div>
              <h1 className="heading-section text-gradient-blue mb-8">
                News & Updates
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                Stay informed about OTC's latest developments, research findings, advocacy wins, 
                and insights on technology, human rights, and digital transformation across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Google Case Banner */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/10 border-y border-primary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Flyer Image */}
                <div className="flex-shrink-0">
                  <img
                    src="/images/google-banner.jpg"
                    alt="Google Case Flyer"
                    className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Newspaper className="w-4 h-4" />
                    Breaking News
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient-blue mb-4">
                    Google LLC Withdraws Appeal in Landmark Ugandan Data Protection Case
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                    A major breakthrough in digital rights and data protection enforcement as Google agrees to comply with Uganda's Data Protection and Privacy Act.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button variant="golden" size="lg" className="group" onClick={() => openPdfModal('/documents/OTC-Press-Release.pdf')}>
                      Read Press Release
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="group" onClick={() => openPdfModal('/documents/Court-Release.pdf')}>
                      Read Withdraw Notice
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="group" onClick={() => openPdfModal('/documents/Ssekamwa-Frank-3-Ors-vs-Google-LLC-PDPO-Decision-18th-July-2024.pdf')}>
                      Read LLC-PDPO-Decision
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder News Banner */}
        <section className="py-16 bg-gradient-to-r from-secondary/20 to-secondary/10 border-y border-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Placeholder Image */}
                <div className="flex-shrink-0 cursor-pointer" onClick={() => openImageModal('/images/DFA-25-Speakers-X-D01-09.jpg')}>
                  <img
                    src="/images/DFA-25-Speakers-X-D01-09.jpg"
                    alt="Placeholder News - Click to view image"
                    className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
                
                {/* Placeholder Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Newspaper className="w-4 h-4" />
                    Latest Update
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient-blue mb-4">
                    OTC at DataFest Africa 2025
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto lg:mx-0">
                    {isDescriptionExpanded
                      ? `Our Executive Director represented OTC at DataFest Africa 2025, where he participated in the opening panel, "From Data to Power: How Data Is Shaping African Societies Today."

                        During the discussion, he underscored the need to prioritise data justice in Africa's digital revolution, highlighting the critical role of community-based digital rights litigation in strengthening accountability. He also emphasised the importance of decolonising data governance and artificial intelligence, ensuring that local knowledge, values and contexts inform the development and deployment of emerging technologies.

                        A key message from his contribution was the necessity of meaningful community participation, especially the involvement of young people, as custodians of Africa's digital future. Through their leadership, advocacy, and innovation, Africa can build a digital ecosystem grounded in rights, equity and sovereignty.`
                      : `Our Executive Director represented OTC at DataFest Africa 2025, where he participated in the opening panel, "From Data to Power: How Data Is Shaping African Societies Today."`
                    }
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mb-4 text-primary hover:text-primary/80"
                  >
                    {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button variant="golden" size="lg" className="group" onClick={() => openImageModal('/images/DJP_5020.jpg')}>
                      View
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="group" onClick={() => openImageModal('/images/DFA-2.jpg')}>
                      View
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="group" onClick={() => openImageModal('/images/DJP_5027.jpg')}>
                      View
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="group" onClick={() => openImageModal('/images/DJP_5167.jpg')}>
                      View
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attachments Gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gradient-blue mb-8 text-center">
                News Gallery
              </h2>
              <style>
                {`
                  @keyframes fadeInFromBack {
                    0% {
                      opacity: 0;
                      transform: scale(0.9) translateZ(-20px);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1) translateZ(0);
                    }
                  }
                  .gallery-item {
                    animation: fadeInFromBack 1s ease-out forwards;
                    opacity: 0;
                  }
                `}
              </style>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  '/images/DFA-25-Speakers-X-D01-09.jpg',
                  '/images/DJP_5020.jpg',
                  '/images/DFA-2.jpg',
                  '/images/DJP_5027.jpg',
                  '/images/DJP_5167.jpg'
                ].map((imageUrl, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow gallery-item"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => openImageModal(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News & Updates Articles Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Article Card removed as per request */}
            </div>
          </div>
        </section>

        {/* More News Coming */}
        <section className="py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gradient-blue mb-4">
                  More News Coming Soon
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're actively working on bringing you comprehensive coverage of our latest developments and initiatives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: "Research Publications & Findings",
                    description: "In-depth analysis and findings from our ongoing research initiatives",
                    icon: "📊"
                  },
                  {
                    title: "Strategic Litigation Updates",
                    description: "Updates on legal actions and court decisions affecting digital rights",
                    icon: "⚖️"
                  },
                  {
                    title: "Partnership Announcements",
                    description: "New collaborations and strategic partnerships for greater impact",
                    icon: "🤝"
                  },
                  {
                    title: "Policy & Advocacy Wins",
                    description: "Policy changes and advocacy successes in technology and human rights",
                    icon: "🏆"
                  },
                  {
                    title: "Event Coverage & Reports",
                    description: "Comprehensive coverage of conferences, workshops, and key events",
                    icon: "📅"
                  },
                  {
                    title: "Thought Leadership Articles",
                    description: "Expert insights and analysis on emerging technology trends",
                    icon: "💡"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-none p-6 shadow-card hover:shadow-blue transition-all duration-300 card-hover group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-playfair font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12 border border-primary/20 rounded-none">
                <div className="text-center">
                  <h3 className="text-2xl font-playfair font-semibold text-gradient-blue mb-4">
                    Stay Ahead of the Curve
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Want to stay updated on our latest developments and be the first to know when new content is published?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/newsletter">
                      <Button variant="golden" className="group">
                        Subscribe to Newsletter
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>

                    <Button variant="ghost-golden" className="group">
                      Follow @OneTechConnect
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 bg-gradient-to-br from-card/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-section text-gradient-blue mb-4">
                  Stay Connected
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Be the first to know about our latest research, advocacy wins, and insights on
                  technology and human rights in Africa.
                </p>
              </div>

              <div className="bg-card border border-border rounded-none p-8 md:p-12 shadow-card">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-muted-foreground">
                    Get exclusive access to our latest updates, research findings, and thought leadership content.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-background border border-input rounded-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      disabled={isLoading}
                    />
                    <Button variant="golden" type="submit" disabled={isLoading} className="group rounded-none">
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
                    <div className={`p-4 rounded-none text-sm mb-4 ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                      {message.text}
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
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

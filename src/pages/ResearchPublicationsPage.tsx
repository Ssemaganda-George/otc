import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ExternalLink, Calendar, User, Heart, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ResearchPublication {
	id: string;
	title: string;
	slug: string;
	authors: string[];
	publish_date: string;
	category: string;
	abstract: string;
	thumbnail: string;
	download_url: string;
	view_url: string;
	citation_count: number;
	download_count: number;
	like_count: number;
	reshare_count: number;
	tags: string[];
	created_at: string;
}

const categories = ["All", "Health", "Finance", "Agriculture", "Development"];

export default function ResearchPublicationsPage() {
	const [publications, setPublications] = useState<ResearchPublication[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [visibleCount, setVisibleCount] = useState(6);
	const [reshareDropdownOpen, setReshareDropdownOpen] = useState<string | null>(null);

	useEffect(() => {
		fetchPublications();
	}, []);

	const fetchPublications = async () => {
		try {
			const { data, error } = await supabase
				.from('research_publications')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching research publications:', error);
				setPublications([]);
			} else {
				setPublications(data || []);
			}
		} catch (error) {
			console.error('Error:', error);
			setPublications([]);
		}
		setLoading(false);
	};

	const handleDownload = async (publicationId: string, downloadUrl: string) => {
		try {
			// Get current download count
			const { data: currentPub, error: fetchError } = await supabase
				.from('research_publications')
				.select('download_count')
				.eq('id', publicationId)
				.single();

			if (fetchError) {
				console.error('Error fetching current download count:', fetchError);
			} else {
				// Increment download count
				const newCount = (currentPub?.download_count || 0) + 1;
				const { error: updateError } = await supabase
					.from('research_publications')
					.update({ download_count: newCount })
					.eq('id', publicationId);

				if (updateError) {
					console.error('Error updating download count:', updateError);
				} else {
					// Update local state to reflect the new count
					setPublications(prev => prev.map(pub =>
						pub.id === publicationId
							? { ...pub, download_count: newCount }
							: pub
					));
				}
			}

			// Fetch the file and trigger download
			const response = await fetch(downloadUrl);
			if (!response.ok) {
				throw new Error(`Failed to fetch file: ${response.status}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			// Extract filename from URL
			const filename = downloadUrl.split('/').pop() || 'download';

			// Create download link
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// Clean up the blob URL
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error handling download:', error);
			// Fallback: open in new tab if download fails
			window.open(downloadUrl, '_blank');
		}
	};

	const handleLike = async (publicationId: string) => {
		try {
			// Get current like count
			const { data: currentPub, error: fetchError } = await supabase
				.from('research_publications')
				.select('like_count')
				.eq('id', publicationId)
				.single();

			if (fetchError) {
				console.error('Error fetching current like count:', fetchError);
				return;
			}

			// Increment like count
			const newCount = (currentPub?.like_count || 0) + 1;
			const { error: updateError } = await supabase
				.from('research_publications')
				.update({ like_count: newCount })
				.eq('id', publicationId);

			if (updateError) {
				console.error('Error updating like count:', updateError);
				return;
			}

			// Update local state to reflect the new count
			setPublications(prev => prev.map(pub =>
				pub.id === publicationId
					? { ...pub, like_count: newCount }
					: pub
			));
		} catch (error) {
			console.error('Error handling like:', error);
		}
	};

	const handleReshare = async (publicationId: string, platform?: string) => {
		try {
			// Get current reshare count
			const { data: currentPub, error: fetchError } = await supabase
				.from('research_publications')
				.select('reshare_count')
				.eq('id', publicationId)
				.single();

			if (fetchError) {
				console.error('Error fetching current reshare count:', fetchError);
				return;
			}

			// Increment reshare count
			const newCount = (currentPub?.reshare_count || 0) + 1;
			const { error: updateError } = await supabase
				.from('research_publications')
				.update({ reshare_count: newCount })
				.eq('id', publicationId);

			if (updateError) {
				console.error('Error updating reshare count:', updateError);
				return;
			}

			// Update local state to reflect the new count
			setPublications(prev => prev.map(pub =>
				pub.id === publicationId
					? { ...pub, reshare_count: newCount }
					: pub
			));

			// If platform is specified, share on that platform
			if (platform) {
				const publication = publications.find(p => p.id === publicationId);
				if (publication) {
					shareOnPlatform(platform, publication);
				}
			}
		} catch (error) {
			console.error('Error handling reshare:', error);
		}
	};

	const shareOnPlatform = (platform: string, publication: ResearchPublication) => {
		const url = encodeURIComponent(publication.view_url);
		const title = encodeURIComponent(publication.title);
		const text = encodeURIComponent(`Check out this research publication: ${publication.title}`);

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
	};	const filteredPublications = publications.filter((pub) => {
		const matchesSearch =
			pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()));
		const matchesCategory = selectedCategory === "All" || pub.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const visiblePublications = filteredPublications.slice(0, visibleCount);

	const loadMore = () => {
		setVisibleCount((prev) => prev + 6);
	};

	return (
		<div className="min-h-screen bg-background custom-scrollbar font-poppins">
			<Navigation />

			<main className="pt-6">
				{/* Hero Section */}
				<section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
					<div className="max-w-7xl mx-auto px-6 lg:px-8">
						<div className="max-w-4xl mx-auto text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-10 h-10 text-background" />
							</div>
							<h1 className="heading-section text-gradient-blue mb-8">Research & Publications</h1>
							<p className="text-body text-muted-foreground leading-relaxed">
								Explore our comprehensive collection of research papers, policy briefs, and publications on digital
								transformation, human rights, and technology governance in Africa.
							</p>
						</div>
					</div>
				</section>

				{/* Filters Section */}
				<section className="py-12 bg-card">
					<div className="max-w-7xl mx-auto px-6 lg:px-8">
						<div className="max-w-4xl mx-auto">
							<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
									<input
										type="text"
										placeholder="Search publications..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</div>
								<div className="flex items-center gap-2">
									<Filter className="w-5 h-5 text-muted-foreground" />
									<select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										className="px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
									>
										{categories.map((cat) => (
											<option key={cat} value={cat}>
												{cat}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Publications Grid */}
				<section className="py-24 bg-background">
					<div className="max-w-7xl mx-auto px-6 lg:px-8">
						<div className="max-w-6xl mx-auto">
							{loading ? (
								<div className="text-center py-12">
									<p className="text-muted-foreground">Loading publications...</p>
								</div>
							) : (
								<>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
										{visiblePublications.map((pub) => (
											<div
												key={pub.id}
												className="bg-card border border-border overflow-hidden shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
												onClick={() => window.open(pub.view_url, '_blank')}
											>
												<div className="h-48 bg-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
													<img
														src={pub.thumbnail}
														alt={pub.title}
														className="w-full h-full object-cover"
														onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback
													/>
												</div>
												<div className="p-6 pb-12">
													<h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
														{pub.title}
													</h3>
													<div className="flex items-center text-sm text-muted-foreground mb-2">
														<User className="w-4 h-4 mr-1" />
														{pub.authors.join(", ")}
													</div>
													<div className="flex items-center text-sm text-muted-foreground mb-4">
														<Calendar className="w-4 h-4 mr-1" />
														{new Date(pub.publish_date).toLocaleDateString()}
													</div>
													<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
														{pub.abstract}
													</p>
													<div className="flex gap-2">
														<Button variant="outline" size="sm" asChild>
															<a
																href={pub.view_url}
																target="_blank"
																rel="noopener noreferrer"
															>
																<ExternalLink className="w-4 h-4 mr-1" />
																View
															</a>
														</Button>
														<Button 
															variant="outline" 
															size="sm" 
															onClick={(e) => { e.stopPropagation(); handleDownload(pub.id, pub.download_url); }}
															className="relative flex items-center gap-1"
														>
															<Download className="w-4 h-4" />
															Download
															<span className="absolute -top-1 -right-1 text-xs bg-primary text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
																{pub.download_count || 0}
															</span>
														</Button>
														<Button
															variant="outline"
															size="sm"
															onClick={(e) => { e.stopPropagation(); handleLike(pub.id); }}
															className="relative flex items-center justify-center"
														>
															<Heart className="w-4 h-4" />
															<span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
																{pub.like_count || 0}
															</span>
														</Button>
														<div className="relative">
															<Button
																variant="outline"
																size="sm"
																className="relative flex items-center justify-center"
																onMouseEnter={() => setReshareDropdownOpen(pub.id)}
																onMouseLeave={() => setReshareDropdownOpen(null)}
																onClick={(e) => { e.stopPropagation(); handleReshare(pub.id); }}
															>
																<Share2 className="w-4 h-4" />
																<span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
																	{pub.reshare_count || 0}
																</span>
															</Button>

															{/* Social Media Dropdown */}
															{reshareDropdownOpen === pub.id && (
																<div
																	className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-20"
																	onMouseEnter={() => setReshareDropdownOpen(pub.id)}
																	onMouseLeave={() => setReshareDropdownOpen(null)}
																>
																	<div className="flex gap-1">
																		<button
																			onClick={(e) => { e.stopPropagation(); handleReshare(pub.id, 'facebook'); }}
																			className="p-2 hover:bg-blue-50 rounded transition-colors"
																			title="Share on Facebook"
																		>
																			<Facebook className="w-4 h-4 text-blue-600" />
																		</button>
																		<button
																			onClick={() => handleReshare(pub.id, 'twitter')}
																			className="p-2 hover:bg-sky-50 rounded transition-colors"
																			title="Share on Twitter"
																		>
																			<Twitter className="w-4 h-4 text-sky-500" />
																		</button>
																		<button
																			onClick={(e) => { e.stopPropagation(); handleReshare(pub.id, 'linkedin'); }}
																			className="p-2 hover:bg-blue-50 rounded transition-colors"
																			title="Share on LinkedIn"
																		>
																			<Linkedin className="w-4 h-4 text-blue-700" />
																		</button>
																		<button
																			onClick={(e) => { e.stopPropagation(); handleReshare(pub.id, 'email'); }}
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
												</div>
											</div>
										))}
									</div>

									{visiblePublications.length < filteredPublications.length && (
										<div className="text-center mt-12">
											<Button variant="golden" onClick={loadMore}>
												Load More Publications
											</Button>
										</div>
									)}

									{filteredPublications.length === 0 && (
										<div className="text-center py-12">
											<p className="text-muted-foreground">No publications found matching your criteria.</p>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

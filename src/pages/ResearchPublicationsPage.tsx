import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ExternalLink, Calendar, User } from "lucide-react";

// Mock data for publications - Updated with realistic OTC publications
const publications = [
	{
		id: 1,
		title: "Balancing Innovation, Investor Interests and Data Privacy in Africa’s Digital Health Start-Up Ecosystem: Lessons from the Rocket Health Case",
		authors: [""],
		date: "2025-11-29",
		category: "POLICY BRIEF",
		abstract: "",
		thumbnail: "/images/publication1.jpg",
		downloadLink: "/documents/Policy Brief - OneTechConnect.pdf",
		viewLink: "/documents/Policy Brief - OneTechConnect.pdf",
	},
// 	{
// 		id: 2,
// 		title: "AI Ethics and Governance in African FinTech: Challenges and Opportunities",
// 		authors: ["Blair Kalivayo"],
// 		date: "2023-08-20",
// 		category: "Finance",
// 		abstract: "An analysis of ethical considerations in AI-driven financial technologies across Africa, with recommendations for regulatory frameworks and governance structures.",
// 		thumbnail: "/images/publication2.jpg",
// 		downloadLink: "/documents/ai-ethics-fintech-africa.pdf",
// 		viewLink: "/documents/ai-ethics-fintech-africa.pdf",
// 	},
// 	{
// 		id: 3,
// 		title: "Data Protection and Privacy in African Agriculture: Policy Implications",
// 		authors: ["Catherine Matama", "Tracy Rita Achola"],
// 		date: "2023-06-10",
// 		category: "Agriculture",
// 		abstract: "Exploring data privacy challenges in agricultural technology adoption across Africa, with policy recommendations for sustainable digital agriculture.",
// 		thumbnail: "/images/publication3.jpg",
// 		downloadLink: "/documents/data-privacy-agritech-africa.pdf",
// 		viewLink: "/documents/data-privacy-agritech-africa.pdf",
// 	},
// 	{
// 		id: 4,
// 		title: "Strategic Litigation for Digital Rights: Lessons from African Courts",
// 		authors: ["Frank Ssekamwa"],
// 		date: "2023-04-05",
// 		category: "Development",
// 		abstract: "A comprehensive review of strategic litigation cases advancing digital rights in African jurisdictions, with insights for future advocacy efforts.",
// 		thumbnail: "/images/publication4.jpg",
// 		downloadLink: "/documents/strategic-litigation-digital-rights.pdf",
// 		viewLink: "/documents/strategic-litigation-digital-rights.pdf",
// 	},
// 	{
// 		id: 5,
// 		title: "The Role of Technology in Advancing Sexual Reproductive Health Rights",
// 		authors: ["Sauda Nakitende", "Catherine Matama"],
// 		date: "2023-02-28",
// 		category: "Health",
// 		abstract: "Examining how digital technologies can enhance access to sexual and reproductive health services while protecting user rights and privacy.",
// 		thumbnail: "/images/publication5.jpg",
// 		downloadLink: "/documents/technology-srhr-rights.pdf",
// 		viewLink: "/documents/technology-srhr-rights.pdf",
// 	},
// 	{
// 		id: 6,
// 		title: "BigTech Africa: Power Dynamics and Regulatory Responses",
// 		authors: ["Blair Kalivayo", "Frank Ssekamwa"],
// 		date: "2022-12-15",
// 		category: "Development",
// 		abstract: "An analysis of BigTech's influence in African markets and the need for coordinated regulatory responses to protect digital sovereignty.",
// 		thumbnail: "/images/publication6.jpg",
// 		downloadLink: "/documents/bigtech-africa-power-dynamics.pdf",
// 		viewLink: "/documents/bigtech-africa-power-dynamics.pdf",
// 	},
// 	{
// 		id: 7,
// 		title: "AI Governance Frameworks for African Innovation Hubs",
// 		authors: ["Tracy Rita Achola"],
// 		date: "2022-10-08",
// 		category: "Development",
// 		abstract: "Developing comprehensive AI governance frameworks tailored to African innovation ecosystems, balancing innovation with ethical considerations.",
// 		thumbnail: "/images/publication7.jpg",
// 		downloadLink: "/documents/ai-governance-african-innovation.pdf",
// 		viewLink: "/documents/ai-governance-african-innovation.pdf",
// 	},
// 	{
// 		id: 8,
// 		title: "Digital Inclusion and Rural Development in Sub-Saharan Africa",
// 		authors: ["Catherine Matama", "Sauda Nakitende"],
// 		date: "2022-08-22",
// 		category: "Agriculture",
// 		abstract: "Investigating strategies for digital inclusion in rural areas, with case studies on technology-driven agricultural development initiatives.",
// 		thumbnail: "/images/publication8.jpg",
// 		downloadLink: "/documents/digital-inclusion-rural-africa.pdf",
// 		viewLink: "/documents/digital-inclusion-rural-africa.pdf",
// 	},
];

const categories = ["All", "Health", "Finance", "Agriculture", "Development"];

export default function ResearchPublicationsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [visibleCount, setVisibleCount] = useState(6);

	const filteredPublications = publications.filter((pub) => {
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
		<div className="min-h-screen bg-background">
			<Navigation />

			<main className="pt-20">
				{/* Hero Section */}
				<section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
					<div className="container mx-auto px-6">
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
					<div className="container mx-auto px-6">
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
					<div className="container mx-auto px-6">
						<div className="max-w-6xl mx-auto">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{visiblePublications.map((pub) => (
									<div
										key={pub.id}
										className="bg-card border border-border overflow-hidden shadow-card hover:shadow-blue transition-all duration-300"
									>
										<div className="h-48 bg-secondary/20 flex items-center justify-center">
											<img
												src={pub.thumbnail}
												alt={pub.title}
												className="w-full h-full object-cover"
												onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback
											/>
										</div>
										<div className="p-6">
											<h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
												{pub.title}
											</h3>
											<div className="flex items-center text-sm text-muted-foreground mb-2">
												<User className="w-4 h-4 mr-1" />
												{pub.authors.join(", ")}
											</div>
											<div className="flex items-center text-sm text-muted-foreground mb-4">
												<Calendar className="w-4 h-4 mr-1" />
												{new Date(pub.date).toLocaleDateString()}
											</div>
											<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
												{pub.abstract}
											</p>
											<div className="flex gap-2">
												<Button variant="outline" size="sm" asChild>
													<a
														href={pub.viewLink}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ExternalLink className="w-4 h-4 mr-1" />
														View
													</a>
												</Button>
												<Button variant="outline" size="sm" asChild>
													<a href={pub.downloadLink} download>
														<Download className="w-4 h-4 mr-1" />
														Download
													</a>
												</Button>
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
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

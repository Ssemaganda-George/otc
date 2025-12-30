import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Scale, Lightbulb, Music, Users, BookOpen, Shield, Building, TrendingUp, ArrowRight, ExternalLink } from "lucide-react";

const litigationCases = [
	{
		caseNumber: 1,
		caseName: "Ssekamwa Frank & 3 Others v Google LLC",
		issues: "Privacy violation & non-compliance, access to justice, distress, cross border transfer & Data Sovereignty",
		country: "Uganda",
		yearFiled: "November 2024",
		status: "Successful decision issued by the PDPO"
	},
	{
		caseNumber: 2,
		caseName: "Google LLC v Ssekamwa Frank & 3 Others",
		issues: "Time jurisdiction & Extraterritorial application of Uganda's data law",
		country: "Uganda",
		yearFiled: "August 2025",
		status: "Appeal by Google LLC before the Minister for ICT&NG"
	},
	{
		caseNumber: 3,
		caseName: "OneTechConnect (OTC) & 3 Others v Google LLC",
		issues: "Privacy Ruling Enforcement, DPIAs and Administrative fines",
		country: "Uganda",
		yearFiled: "Pending",
		status: "Hearing before the PDPO"
	}
];

const consultancyServices = [
	{
		title: "Research & Development",
		description: "Comprehensive research and analysis including feasibility studies, impact assessments, legislative scrutiny, and expert legal and policy analysis",
		icon: BookOpen
	},
	{
		title: "Training & Capacity Building",
		description: "Specialized training programs covering research methodology, academic writing, and tailored courses on contemporary issues",
		icon: Users
	},
	{
		title: "Compliance & Legal Services",
		description: "Navigate legal landscapes with audits, documentation, and reporting. Specializing in data protection and privacy compliance",
		icon: Shield
	},
	{
		title: "Corporate & Intellectual Property",
		description: "Corporate formation, compliance, company registration, and IP protection for tech innovations",
		icon: Building
	},
	{
		title: "Mergers, Acquisitions & Insolvency",
		description: "Guide African startups through M&A complexities and facilitate safe business transformation or closure",
		icon: TrendingUp
	}
];

export default function OurProductsPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			
			<main className="pt-20">
				{/* Hero Section */}
				<section className="py-24 bg-background">
					<div className="container mx-auto px-6">
						<div className="max-w-4xl mx-auto text-center">
							<div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
								<Scale className="w-10 h-10 text-primary" />
							</div>
							<h1 className="heading-display text-primary mb-8">
								Our Products
							</h1>
							<p className="text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto">
								Innovative solutions and services that drive digital transformation while upholding 
								human rights and advancing social justice across Africa.
							</p>
						</div>
					</div>
				</section>

				{/* Strategic Litigation */}
				<section className="py-24">
					<div className="container mx-auto px-6">
						<div className="max-w-full mx-auto">
							<div className="text-center mb-16">
								<div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
									<Scale className="w-10 h-10 text-primary" />
								</div>
								<h2 className="heading-section text-primary mb-8">
									Strategic Litigation
								</h2>
								<p className="text-body text-muted-foreground max-w-4xl mx-auto text-xl leading-relaxed">
									We offer strategic legal services, including case conceptualization, strategic interest litigation, 
									and expert legal strategies. We also provide professional opinions on tax compliance and other 
									legal matters related to tech and innovation.
								</p>
							</div>

							<div className="bg-card border border-border/50 rounded-none p-8 shadow-lg">
								<h3 className="text-2xl font-playfair font-bold text-primary mb-8 text-center">
									Litigation Database
								</h3>
								
								<div className="overflow-x-auto">
									<table className="w-full bg-card shadow-sm overflow-hidden border border-border/50 rounded-none">
										<thead className="bg-secondary/50">
											<tr>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">No.</th>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">Case Name</th>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">Issues</th>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">Country</th>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">Year of Filing</th>
												<th className="text-left py-4 px-6 text-sm font-semibold text-foreground border-b border-border/50">Status</th>
											</tr>
										</thead>
										<tbody>
											{litigationCases.map((case_) => (
												<tr key={case_.caseNumber} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
													<td className="py-4 px-6 text-sm text-foreground font-medium">{case_.caseNumber}</td>
													<td className="py-4 px-6 text-sm text-foreground font-semibold">{case_.caseName}</td>
													<td className="py-4 px-6 text-sm text-muted-foreground">{case_.issues}</td>
													<td className="py-4 px-6 text-sm text-muted-foreground">{case_.country}</td>
													<td className="py-4 px-6 text-sm text-muted-foreground">{case_.yearFiled}</td>
													<td className="py-4 px-6 text-sm text-muted-foreground">{case_.status}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Innovations */}
				<section className="py-24 bg-secondary/20">
					<div className="container mx-auto px-6">
						<div className="max-w-full mx-auto">
							<div className="text-center mb-16">
								<div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
									<Lightbulb className="w-10 h-10 text-primary" />
								</div>
								<h2 className="heading-section text-primary mb-6">
									Innovations
								</h2>
								<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
									Through our innovation hub, we transform dreams and vision into reality. We offer expert 
									services in website and mobile app design, coding, development and full-scale rollout.
								</p>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
								{/* WazaziConnect */}
								<div className="bg-card border border-border/50 rounded-none p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
									<h3 className="text-xl font-playfair font-bold text-primary mb-4">
										WazaziConnect
									</h3>
									<p className="text-muted-foreground leading-relaxed mb-6">
										WazaziConnect (Swahili for Parents) is our flagship initiative designed to provide an affordable 
										pathway for Africans who wish to become parents. The platform connects intending parents with 
										surrogate mothers, donors and service providers creating opportunities for family building in a 
										safe, ethical, and supportive environment.
									</p>
									<div className="space-y-3 mb-6">
										<h4 className="font-semibold text-foreground">Guided by principles of:</h4>
										{["Privacy & Confidentiality", "Gender Equity & Inclusivity", "Human Rights and Ethical Standards"].map((principle, index) => (
											<div key={index} className="flex items-center space-x-3">
												<div className="w-1.5 h-1.5 bg-primary rounded-full" />
												<span className="text-sm text-muted-foreground">{principle}</span>
											</div>
										))}
									</div>
									<div className="flex flex-col sm:flex-row gap-3">
										<Button variant="golden" size="sm" className="group">
											Download App
											<ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</Button>
										<Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
											Visit Website
											<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</Button>
									</div>
								</div>

								{/* OTC Records */}
								<div className="bg-card border border-border/50 rounded-none p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
									<div className="flex items-start space-x-4 mb-6">
										<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
											<Music className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-playfair font-bold text-primary mb-2">
												OTC Records
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Discover innovation fused with African culture. OTC Records promotes and preserves 
												African talent and culture through music, art, and design.
											</p>
										</div>
									</div>
									<div className="space-y-3 mb-6">
										<h4 className="font-semibold text-foreground">Our services include:</h4>
										{["Sound and video recording", "Content creation (songwriting, playwriting)", "Full event planning and management"].map((service, index) => (
											<div key={index} className="flex items-center space-x-3">
												<div className="w-1.5 h-1.5 bg-primary rounded-full" />
												<span className="text-sm text-muted-foreground">{service}</span>
											</div>
										))}
									</div>
									<Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5 group">
										Explore OTC Records
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Consultancy Services */}
				<section className="py-24">
					<div className="container mx-auto px-4">
						<div className="max-w-full mx-auto">
							<div className="text-center mb-16">
								<h2 className="heading-section text-primary mb-6">
									Consultancy Services
								</h2>
								<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
									Expert consultancy services designed to support innovation and growth across Africa, 
									available with flexible payment options including legal tender, equity, partnerships, 
									co-investment, and other in-kind arrangements.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
								{consultancyServices.map((service, index) => (
									<div
										key={index}
										className="bg-card border border-border/50 rounded-none p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group"
									>
										<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
											<service.icon className="w-6 h-6 text-primary" />
										</div>
										<h3 className="text-lg font-playfair font-bold text-primary mb-3">
											{service.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{service.description}
										</p>
									</div>
								))}
								
								{/* Additional Services */}
								<div className="bg-card border border-border/50 rounded-none p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
									<h3 className="text-lg font-playfair font-bold text-primary mb-3">
										Organizational Strategy & Business Finance
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Business vehicle advice, fiscal hosting, project fund management, and professional fundraising expertise.
									</p>
								</div>
							</div>

							{/* Short Courses */}
							<div className="bg-secondary/30 p-8 border border-primary/10 rounded-none shadow-sm">
								<h3 className="text-xl font-playfair font-bold text-primary mb-4">
									Short Courses (Coming Soon)
								</h3>
								<p className="text-muted-foreground leading-relaxed mb-6">
									Self-paced courses to equip stakeholders with practical knowledge on pressing issues at the 
									intersection of technology and rights. Drawing from cutting-edge research, case law, and published works.
								</p>
								<div className="space-y-3">
									<h4 className="font-semibold text-foreground">Inaugural courses:</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										<div className="flex items-center space-x-3">
											<div className="w-1.5 h-1.5 bg-primary rounded-full" />
											<span className="text-sm text-muted-foreground">AI and Health Rights in Africa</span>
										</div>
										<div className="flex items-center space-x-3">
											<div className="w-1.5 h-1.5 bg-primary rounded-full" />
											<span className="text-sm text-muted-foreground">Data Privacy and Protection in Africa</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

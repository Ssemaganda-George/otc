import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { BookOpen, Users, Shield, Building, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultancyServices = [
	{
		icon: BookOpen,
		title: "Research & Development",
		description:
			"We provide comprehensive research and analysis to inform your strategy, including feasibility studies, impact assessments, legislative and post-legislative scrutiny, and expert legal and policy analysis. Our team is skilled in both qualitative and quantitative research from data collection and analysis to synthesis.",
		features: [
			"Feasibility studies",
			"Impact assessments",
			"Legislative scrutiny",
			"Expert legal and policy analysis",
		],
	},
	{
		icon: Users,
		title: "Training & Capacity Building",
		description:
			"We empower your team through specialized training. Our programs cover research methodology, academic writing, and publishing, in addition to tailored short courses and masterclasses on contemporary issues in our key sectors.",
		features: [
			"Research methodology training",
			"Academic writing and publishing",
			"Tailored short courses",
			"Masterclasses on contemporary issues",
		],
	},
	{
		icon: Shield,
		title: "Compliance & Legal Services",
		description:
			"We help you navigate the legal and regulatory landscape with services that include audits, documentation, and reporting. We specialize in data protection and privacy, offering services as a Data Protection Officer and providing legal advice on regulatory compliance.",
		features: [
			"Legal audits and documentation",
			"Data Protection Officer services",
			"Privacy compliance",
			"Regulatory compliance advice",
		],
	},
	{
		icon: Building,
		title: "Corporate & Intellectual Property",
		description:
			"We assist with all aspects of corporate formation and compliance, including company registration and secretarial services. We also help you protect your innovations by registering and safeguarding Intellectual Property (IP) rights for tech in health, agriculture, finance, and development.",
		features: [
			"Company registration",
			"Corporate secretarial services",
			"IP rights registration",
			"Innovation protection",
		],
	},
	{
		icon: TrendingUp,
		title: "Mergers, Acquisitions & Insolvency",
		description:
			"Our experts guide African startups in HealthTech, AgriTech, FinTech, and development through the complexities of mergers and acquisitions to help them scale and remain sustainable. We also have experienced practitioners who can facilitate a legal and safe business transformation or closure.",
		features: [
			"M&A guidance for startups",
			"Scaling strategies",
			"Business transformation",
			"Legal closure processes",
		],
	},
	{
		icon: DollarSign,
		title: "Organizational Strategy & Business Finance",
		description:
			"We offer advice on the most appropriate business vehicles for new and existing entities, provide fiscal hosting, and manage project funds. Our team includes professional fundraising experts who can help you secure the grants and funding necessary to sustain your projects.",
		features: [
			"Business vehicle selection",
			"Fiscal hosting",
			"Project fund management",
			"Grant and funding support",
		],
	},
];

export default function ConsultancyPage() {
	const [openDetails, setOpenDetails] = useState(
		Array(consultancyServices.length).fill(false)
	);

	const handleToggle = (idx: number) => {
		setOpenDetails((prev) =>
			prev.map((open, i) => (i === idx ? !open : open))
		);
	};

	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<main className="pt-20">
				{/* Hero Section */}
				<section className="py-24 bg-background">
					<div className="container mx-auto px-6">
						<div className="max-w-4xl mx-auto text-center">
							<div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
								<Briefcase className="w-10 h-10 text-primary" />
							</div>
							<h1 className="heading-section text-primary mb-8">
								Consultancy Services
							</h1>
							<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Expert consultancy services designed to support innovation and growth across Africa,
								delivering comprehensive solutions for technology, legal, and business development needs.
							</p>
						</div>
					</div>
				</section>

				{/* Services Grid */}
				<section className="py-24">
					<div className="container mx-auto px-4">
						<div className="max-w-full mx-auto">
							<div className="text-center mb-16">
								<h2 className="heading-section text-primary mb-6">
									Our Expertise Areas
								</h2>
								<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
									Comprehensive expertise across all aspects of technology,
									innovation, and business development in Africa
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{consultancyServices.map((service, index) => (
									<div
										key={index}
										className="bg-card border border-border/50 rounded-none p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20"
									>
										<div className="flex items-start mb-6">
											<div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
												<service.icon className="w-8 h-8 text-primary" />
											</div>
											<div className="flex-1">
												<h3 className="text-xl font-playfair font-bold text-foreground mb-3">
													{service.title}
												</h3>
												<p className="text-muted-foreground leading-relaxed mb-6">
													{service.description}
												</p>
											</div>
										</div>

										<div>
											<button
												className="mb-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
												onClick={() => handleToggle(index)}
											>
												{openDetails[index]
													? "Hide Details"
													: "View Details"}
											</button>
											{openDetails[index] && (
												<>
													<h4 className="font-semibold text-foreground mb-4">
														Key Features:
													</h4>
													<ul className="space-y-2">
														{service.features.map(
															(feature, featureIndex) => (
																<li
																	key={featureIndex}
																	className="flex items-start space-x-3"
																>
																	<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
																	<span className="text-muted-foreground leading-relaxed">
																		{feature}
																	</span>
																</li>
															)
														)}
													</ul>
												</>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-24 bg-secondary/30">
					<div className="container mx-auto px-6">
						<div className="max-w-4xl mx-auto text-center">
							<h2 className="heading-section text-primary mb-6">
								Ready to Get Started?
							</h2>
							<p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
								Contact us today to discuss how our consultancy services can
								support your organization's growth and innovation objectives
								across Africa.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Button variant="golden" size="lg">
									Start Consultation
								</Button>
								<Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
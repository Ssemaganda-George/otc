import { Mail, Phone, MapPin, ArrowRight, ExternalLink, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const quickLinks = [
	{ name: "About Us", href: "/about" },
	{ name: "What We Do", href: "/what-we-do" },
	{ name: "Our Products", href: "/our-products" },
	{ name: "Team", href: "/about/team" },
	{ name: "Contact Us", href: "/contact" }
];

const services = [
	{ name: "Strategic Litigation", href: "/products/strategic-litigation" },
	{ name: "Innovation Hub", href: "/products/innovations" },
	{ name: "Center for Digital Justice", href: "/products/center-for-digital-justice" },
	{ name: "Consultancy Services", href: "/products/consultancy" }
];

const programmes = [
	{ name: "Tech & SRHR Governance (TSG)", href: "/programmes/tsg" },
	{ name: "BigTech Africa (BiTA)", href: "/programmes/bita" },
	{ name: "AfricanIntelligenceNow (AiNow)", href: "/programmes/ainow" },
	{ name: "EmpowerThem (EMT)", href: "/programmes/emt" }
];

const legalLinks = [
	{ name: "Privacy Policy", href: "#" },
	{ name: "Terms of Service", href: "#" },
	{ name: "Cookie Policy", href: "#" },
	{ name: "Legal Disclaimer", href: "#" }
];

export function Footer() {
	return (
		<footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200/50 shadow-lg">
			<div className="container mx-auto px-6">
				{/* Main Footer Content */}
				<div className="py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
						{/* Company Info */}
						<div className="lg:col-span-1">
							<div className="flex items-center mb-8">
								<img 
									src="/OTC_logo.png" 
									alt="OneTechConnect Logo" 
									className="h-14 w-auto drop-shadow-sm"
								/>
							</div>
							
							<p className="text-slate-600 mb-8 leading-relaxed text-lg">
								Advancing Digital Justice through research, advocacy, capacity building, innovation & strategic interest litigation in the areas of HealthTech, FinTech, AgricTec & Development.
							</p>

							{/* Contact Info */}
							<div className="space-y-4">
								<div className="flex items-center space-x-4 group">
									<div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<MapPin className="w-5 h-5 text-primary" />
									</div>
									<span className="text-slate-700 font-medium">Kingdom Kampala Building, Uganda</span>
								</div>
								<div className="flex items-center space-x-4 group">
									<div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<Phone className="w-5 h-5 text-primary" />
									</div>
									<span className="text-slate-700 font-medium">+256-778410315</span>
								</div>
								<div className="flex items-center space-x-4 group">
									<div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<Mail className="w-5 h-5 text-primary" />
									</div>
									<span className="text-slate-700 font-medium">info@onetechconnect.org</span>
								</div>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="font-playfair font-bold text-slate-800 mb-8 text-xl">
								Quick Links
							</h3>
							<ul className="space-y-4">
								{quickLinks.map((link) => (
									<li key={link.name}>
										<Link 
											to={link.href}
											className="text-slate-600 hover:text-primary transition-all duration-300 text-lg font-medium hover:translate-x-1 inline-block"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Services */}
						<div>
							<h3 className="font-playfair font-bold text-slate-800 mb-8 text-xl">
								Our Services
							</h3>
							<ul className="space-y-4">
								{services.map((service) => (
									<li key={service.name}>
										<Link 
											to={service.href}
											className="text-slate-600 hover:text-primary transition-all duration-300 text-lg font-medium hover:translate-x-1 inline-block"
										>
											{service.name}
										</Link>
									</li>
								))}
							</ul>

							<div className="mt-10">
								<h4 className="font-playfair font-bold text-slate-800 mb-6 text-xl">
									Programmes
								</h4>
								<ul className="space-y-3">
									{programmes.map((programme) => (
										<li key={programme.name}>
											<Link 
												to={programme.href}
												className="text-slate-600 hover:text-primary transition-all duration-300 text-lg font-medium hover:translate-x-1 inline-block"
											>
												{programme.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Resources & Newsletter */}
						<div>
							<h3 className="font-playfair font-bold text-slate-800 mb-8 text-xl">
								Stay Connected
							</h3>
							
							<p className="text-slate-600 text-lg mb-6 leading-relaxed">
								Get the latest updates on African tech law and innovation.
							</p>

							<div className="space-y-4 mb-8">
								<Button variant="ghost-golden" size="lg" className="w-full justify-start group shadow-sm hover:shadow-md transition-shadow" asChild>
									<Link to="/newsletter">
										<span className="font-semibold">Subscribe to Newsletter</span>
										<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
									</Link>
								</Button>
								<Button variant="ghost-golden" size="lg" className="w-full justify-start group shadow-sm hover:shadow-md transition-shadow">
									<span className="font-semibold">Follow on LinkedIn</span>
									<ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Button>
								<a 
									href="https://twitter.com/OneTechConnect" 
									target="_blank" 
									rel="noopener noreferrer"
									className="block"
								>
									<Button variant="ghost-golden" size="lg" className="w-full justify-start group shadow-sm hover:shadow-md transition-shadow">
										<Twitter className="w-5 h-5 mr-2" />
										<span className="font-semibold">@OneTechConnect</span>
										<ExternalLink className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
									</Button>
								</a>
								<Button variant="ghost-golden" size="lg" className="w-full justify-start group shadow-sm hover:shadow-md transition-shadow">
									<span className="font-semibold">Join Our Community</span>
									<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Button>
							</div>

							{/* Core Values */}
							<div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-sm">
								<h4 className="font-semibold text-primary text-lg mb-3">Our Values</h4>
								<div className="flex flex-wrap gap-3">
									{["Innovation", "Interoperability", "Equity", "Human Rights"].map((value) => (
										<span key={value} className="text-base bg-primary/15 text-primary px-3 py-2 rounded-full font-medium shadow-sm">
											{value}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-slate-200/50 py-10">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
						{/* Copyright */}
						<div className="text-slate-600 font-medium text-lg">
							© 2025 OneTechConnect. All rights reserved.
						</div>

						{/* Legal Links */}
						<div className="flex items-center space-x-8">
							{legalLinks.map((link) => (
								<a 
									key={link.name}
									href={link.href}
									className="text-slate-600 hover:text-primary transition-colors duration-300 text-lg font-medium hover:underline"
								>
									{link.name}
								</a>
							))}
						</div>
					</div>

					{/* Mission Statement */}
					<div className="mt-8 pt-8 border-t border-slate-200/30">
						<p className="text-center text-slate-600 italic max-w-4xl mx-auto text-lg leading-relaxed">
							Advancing Digital Justice through research, training, advocacy and innovation in health & SRHR, Finance, Agriculture and Development.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

import { Mail, Phone, MapPin, ArrowRight, ExternalLink, Twitter, Linkedin, Facebook } from "lucide-react"; // Added social icons
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const quickLinks = [
	{ name: "About Us", href: "/about" },
	{ name: "What We Do", href: "/what-we-do" },
	{ name: "Our Products", href: "/our-products" },
	{ name: "Team", href: "/about/team" },
	{ name: "Contact Us", href: "/contact" }
];

const servicesAndProgrammes = [
	{ name: "Strategic Litigation", href: "/products/strategic-litigation" },
	{ name: "Innovation Hub", href: "/products/innovations" },
	{ name: "Center for Digital Justice", href: "/products/center-for-digital-justice" },
	{ name: "Consultancy Services", href: "/products/consultancy" },
	{ name: "Tech & SRHR Governance (TSG)", href: "/programmes/tsg" },
	{ name: "BigTech Africa (BiTA)", href: "/programmes/bita" },
	{ name: "AfricanIntelligenceNow (AiNow)", href: "/programmes/ainow" },
	{ name: "EmpowerThem (EMT)", href: "/programmes/emt" }
];

const legalLinks = [
	{ name: "Privacy Policy", href: "#" },
	{ name: "Terms of Service", href: "#" },
	{ name: "Cookie Policy", href: "#" }
];

export function Footer() {
	return (
		<footer className="bg-slate-50 border-t border-slate-200">
			<div className="container mx-auto px-6 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<div className="flex items-center mb-6">
							<img 
								src="/OTC_logo.png" 
								alt="OneTechConnect Logo" 
								className="h-12 w-auto"
							/>
						</div>
						<p className="text-slate-600 text-base leading-relaxed mb-6">
							Advancing Digital Justice through research, advocacy, and innovation in Africa.
						</p>
						{/* Social Icons */}
						<div className="flex space-x-4">
							<a href="https://twitter.com/OneTechConnect" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
								<Twitter className="w-5 h-5" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
								<Linkedin className="w-5 h-5" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
								<Facebook className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-semibold text-slate-800 mb-6 text-lg">Quick Links</h3>
						<ul className="space-y-3">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link 
										to={link.href}
										className="text-slate-600 hover:text-primary transition-colors text-base"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services & Programmes */}
					<div>
						<h3 className="font-semibold text-slate-800 mb-6 text-lg">Services & Programmes</h3>
						<ul className="space-y-3">
							{servicesAndProgrammes.map((item) => (
								<li key={item.name}>
									<Link 
										to={item.href}
										className="text-slate-600 hover:text-primary transition-colors text-base"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & Newsletter */}
					<div>
						<h3 className="font-semibold text-slate-800 mb-6 text-lg">Contact & Updates</h3>
						<div className="space-y-4 mb-6">
							<div className="flex items-center space-x-3">
								<MapPin className="w-5 h-5 text-primary flex-shrink-0" />
								<span className="text-slate-600 text-base">Kingdom Kampala Building, Uganda</span>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="w-5 h-5 text-primary flex-shrink-0" />
								<span className="text-slate-600 text-base">+256-778410315</span>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="w-5 h-5 text-primary flex-shrink-0" />
								<span className="text-slate-600 text-base">info@onetechconnect.org</span>
							</div>
						</div>
						<Button variant="outline" size="sm" className="w-full" asChild>
							<Link to="/newsletter">
								Subscribe to Newsletter
								<ArrowRight className="w-4 h-4 ml-2" />
							</Link>
						</Button>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-slate-200 mt-12 pt-6">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						<div className="text-slate-600 text-sm">
							© 2025 OneTechConnect. All rights reserved.
						</div>
						<div className="flex space-x-6">
							{legalLinks.map((link) => (
								<a 
									key={link.name}
									href={link.href}
									className="text-slate-600 hover:text-primary transition-colors text-sm"
								>
									{link.name}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

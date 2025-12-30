import { Mail, Phone, MapPin, ArrowRight, ExternalLink, Twitter, Linkedin, Facebook, Send } from "lucide-react"; // Added social icons
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
	const { toast } = useToast();
	const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

	const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setNewsletterSubmitting(true);

		const form = e.currentTarget;
		const formData = new FormData(form);

		try {
			const response = await fetch("https://formspree.io/f/mdkwwayn", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json",
				},
			});

			if (response.ok) {
				toast({
					title: "Successfully subscribed!",
					description: "Thank you for subscribing to our newsletter.",
				});
				form.reset();
			} else {
				throw new Error("Failed to subscribe");
			}
		} catch (error) {
			toast({
				title: "Subscription failed",
				description: "Please try again later.",
				variant: "destructive",
			});
		} finally {
			setNewsletterSubmitting(false);
		}
	};

	return (
		<footer className="bg-card border-t border-border" role="contentinfo">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Multi-Column Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Organization Info */}
					<div className="space-y-4">
						<img 
							src="/OTC_logo.png" 
							alt="OneTechConnect Logo" 
							className="h-12 w-auto"
						/>
						<p className="text-body">
							Championing <span className="font-bold">Africa's technological and digital justice</span> through research, advocacy, training, and innovation.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
								<Facebook className="h-5 w-5" />
							</a>
							<a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
								<Twitter className="h-5 w-5" />
							</a>
							<a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="heading-h3 mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li><Link to="/" className="text-body hover:text-primary transition-colors">Home</Link></li>
							<li><Link to="/about" className="text-body hover:text-primary transition-colors">About Us</Link></li>
							<li><Link to="/what-we-do" className="text-body hover:text-primary transition-colors">What We Do</Link></li>
							<li><Link to="/our-products" className="text-body hover:text-primary transition-colors">Our Products</Link></li>
							<li><Link to="/news" className="text-body hover:text-primary transition-colors">News & Updates</Link></li>
							<li><Link to="/contact" className="text-body hover:text-primary transition-colors">Contact Us</Link></li>
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="heading-h3 mb-4">Our Products</h3>
						<ul className="space-y-2">
							<li><Link to="/products/strategic-litigation" className="text-body hover:text-primary transition-colors"><span className="font-bold">Strategic Litigation</span></Link></li>
							<li><Link to="/products/innovations" className="text-body hover:text-primary transition-colors"><span className="font-bold">Innovation Hub</span></Link></li>
							<li><Link to="/products/center-for-digital-justice" className="text-body hover:text-primary transition-colors"><span className="font-bold">Center for Digital Justice</span></Link></li>
							<li><Link to="/products/consultancy" className="text-body hover:text-primary transition-colors"><span className="font-bold">Consultancy Services</span></Link></li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="heading-h3 mb-4">Contact Info</h3>
						<div className="space-y-3">
							<div className="flex items-start space-x-3">
								<MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
								<span className="text-body">Kampala, Uganda</span>
							</div>
							<div className="flex items-start space-x-3">
								<Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
								<span className="text-body">+256-778410315</span>
							</div>
							<div className="flex items-start space-x-3">
								<Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
								<span className="text-body">info@onetechconnect.org</span>
							</div>
						</div>
						<div className="mt-6">
							<h4 className="heading-h3 mb-3"><span className="font-black">Stay Updated</span></h4>
							<p className="text-body mb-4">
								Get the <span className="font-bold">latest insights</span> on tech law and innovation across Africa.
							</p>
							<form 
								className="flex flex-col space-y-3"
								onSubmit={handleNewsletterSubmit}
							>
								<Input 
									type="email" 
									name="email"
									placeholder="Enter your email"
									className="text-body h-9"
									required
								/>
								<Button 
									variant="golden" 
									size="sm"
									className="group w-full text-button"
									type="submit"
									disabled={newsletterSubmitting}
								>
									{newsletterSubmitting ? "Subscribing..." : "Subscribe"}
									<Send className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
								</Button>
							</form>
							<p className="text-caption mt-2">
								We respect your privacy. Unsubscribe anytime.
							</p>
						</div>
					</div>
				</div>

				<div className="border-t border-border mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-body">
							© 2025 <span className="font-bold">OneTechConnect</span>. All rights reserved.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<Link to="/privacy" className="text-body hover:text-primary transition-colors font-bold">Privacy Policy</Link>
							<Link to="/terms" className="text-body hover:text-primary transition-colors font-bold">Terms of Service</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

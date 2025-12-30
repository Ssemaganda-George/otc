import { Mail, Phone, MapPin, ArrowRight, ExternalLink, Twitter, Linkedin, Facebook, Send, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AOSWrapper from "@/components/AOSWrapper";
import { H3, Body, Small } from "@/components/ui/typography";

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
		<footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 border-t border-gray-200" role="contentinfo">
			{/* Subtle Background Pattern */}
			<div className="absolute inset-0 opacity-30">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px]"></div>
			</div>

			{/* Accent Border Top */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-accent"></div>

			<div className="relative container mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Organization Info */}
					<AOSWrapper animation="fade-up" className="lg:col-span-1">
						<div className="space-y-6">
							<div className="bg-accent/10 rounded-xl p-4 inline-block">
								<img
									src="/OTC_logo.png"
									alt="OneTechConnect Logo"
									className="h-12 w-auto"
								/>
							</div>
							<Body className="text-gray-600 leading-relaxed">
								Championing <span className="text-accent font-semibold">Africa's technological and digital justice</span> through research, advocacy, training, and innovation.
							</Body>
							<div className="flex space-x-3">
								<a
									href="https://twitter.com/OneTechConnect"
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 bg-white hover:bg-accent/10 border border-gray-200 hover:border-accent/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
									aria-label="Twitter"
								>
									<Twitter className="h-5 w-5 text-gray-600 group-hover:text-accent transition-colors" />
								</a>
								<a
									href="https://linkedin.com/company/onetechconnect"
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 bg-white hover:bg-accent/10 border border-gray-200 hover:border-accent/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
									aria-label="LinkedIn"
								>
									<Linkedin className="h-5 w-5 text-gray-600 group-hover:text-accent transition-colors" />
								</a>
								<a
									href="https://facebook.com/OneTechConnect"
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 bg-white hover:bg-accent/10 border border-gray-200 hover:border-accent/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
									aria-label="Facebook"
								>
									<Facebook className="h-5 w-5 text-gray-600 group-hover:text-accent transition-colors" />
								</a>
								<a
									href="https://instagram.com/onetechconnect"
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 bg-white hover:bg-accent/10 border border-gray-200 hover:border-accent/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
									aria-label="Instagram"
								>
									<Instagram className="h-5 w-5 text-gray-600 group-hover:text-accent transition-colors" />
								</a>
							</div>
						</div>
					</AOSWrapper>

					{/* Quick Links */}
					<AOSWrapper animation="fade-up" delay={100}>
						<div className="space-y-6">
							<H3 className="text-gray-800 font-semibold">Quick Links</H3>
							<ul className="space-y-4">
								<li><Link to="/" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/about" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/what-we-do" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">What We Do</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/our-products" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Our Products</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/news" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">News & Updates</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/contact" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
							</ul>
						</div>
					</AOSWrapper>

					{/* Our Products */}
					<AOSWrapper animation="fade-up" delay={200}>
						<div className="space-y-6">
							<H3 className="text-gray-800 font-semibold">Our Products</H3>
							<ul className="space-y-4">
								<li><Link to="/products/strategic-litigation" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Strategic Litigation</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/products/innovations" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Innovation Hub</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/products/center-for-digital-justice" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Center for Digital Justice</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
								<li><Link to="/products/consultancy" className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center group py-1">
									<span className="group-hover:translate-x-1 transition-transform duration-300">Consultancy Services</span>
									<ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-accent" />
								</Link></li>
							</ul>
						</div>
					</AOSWrapper>

					{/* Contact & Newsletter */}
					<AOSWrapper animation="fade-up" delay={300}>
						<div className="space-y-8">
							<div>
								<H3 className="text-gray-800 font-semibold mb-6">Contact Info</H3>
								<div className="space-y-4">
									<div className="flex items-start space-x-3 group">
										<div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
											<MapPin className="h-4 w-4 text-accent" />
										</div>
										<Body className="text-gray-600 group-hover:text-gray-800 transition-colors">Kampala, Uganda</Body>
									</div>
									<div className="flex items-start space-x-3 group">
										<div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
											<Phone className="h-4 w-4 text-accent" />
										</div>
										<Body className="text-gray-600 group-hover:text-gray-800 transition-colors">+256-778410315</Body>
									</div>
									<div className="flex items-start space-x-3 group">
										<div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
											<Mail className="h-4 w-4 text-accent" />
										</div>
										<Body className="text-gray-600 group-hover:text-gray-800 transition-colors">info@onetechconnect.org</Body>
									</div>
								</div>
							</div>

							{/* Newsletter Signup */}
							<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
								<H3 className="text-gray-800 font-semibold mb-3">Stay Updated</H3>
								<Body className="text-gray-600 mb-4">
									Get the <span className="text-accent font-semibold">latest insights</span> on tech law and innovation across Africa.
								</Body>
								<form
									className="space-y-4"
									onSubmit={handleNewsletterSubmit}
								>
									<Input
										type="email"
										name="email"
										placeholder="Enter your email"
										className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-accent focus:ring-accent/20 h-12 rounded-lg"
										required
									/>
									<Button
										variant="primary"
										size="sm"
										className="w-full group h-12 rounded-lg"
										type="submit"
										disabled={newsletterSubmitting}
									>
										{newsletterSubmitting ? "Subscribing..." : "Subscribe"}
										<Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</form>
								<Small className="text-gray-500 mt-3 block">
									We respect your privacy. Unsubscribe anytime.
								</Small>
							</div>
						</div>
					</AOSWrapper>
				</div>

				{/* Footer Bottom */}
				<AOSWrapper animation="fade-up" delay={400}>
					<div className="border-t border-gray-200 mt-16 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
							<Body className="text-gray-600">
								© 2025 <span className="text-accent font-semibold">OneTechConnect</span>. All rights reserved.
							</Body>
							<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
								<Link to="/privacy" className="text-gray-600 hover:text-accent transition-colors duration-300 hover:underline">
									Privacy Policy
								</Link>
								<Link to="/terms" className="text-gray-600 hover:text-accent transition-colors duration-300 hover:underline">
									Terms of Service
								</Link>
								<Link to="/cookies" className="text-gray-600 hover:text-accent transition-colors duration-300 hover:underline">
									Cookie Policy
								</Link>
							</div>
						</div>
					</div>
				</AOSWrapper>
			</div>
		</footer>
	);
}

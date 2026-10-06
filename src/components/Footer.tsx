import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Send, Instagram } from "lucide-react";
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

const ourProducts = [
	{ name: "Strategic Litigation", href: "/products/strategic-litigation" },
	{ name: "Innovation Hub", href: "/products/innovations" },
	{ name: "Center for Digital Justice", href: "/products/center-for-digital-justice" },
	{ name: "Consultancy Services", href: "/products/consultancy" }
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
		<footer className="bg-white border-t border-gray-200" role="contentinfo">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Organization Info */}
					<div className="space-y-6">
						<img
							src="/OTC_logo.png"
							alt="OneTechConnect Logo"
							className="h-12 w-auto"
						/>
						<p className="text-gray-600 leading-relaxed">
							Championing <span className="text-primary font-semibold">Africa's technological and digital justice</span> through research, advocacy, training, and innovation.
						</p>
						<div className="flex space-x-3">
							<a
								href="https://twitter.com/OneTechConnect"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300"
								aria-label="Twitter"
							>
								<Twitter className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
							</a>
							<a
								href="https://linkedin.com/company/onetechconnect"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
							</a>
							<a
								href="https://facebook.com/OneTechConnect"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300"
								aria-label="Facebook"
							>
								<Facebook className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
							</a>
							<a
								href="https://instagram.com/onetechconnect"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300"
								aria-label="Instagram"
							>
								<Instagram className="h-4 w-4 text-gray-600 hover:text-primary transition-colors" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-6">
						<h3 className="text-gray-800 font-semibold">Quick Links</h3>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link to={link.href} className="text-gray-600 hover:text-primary transition-colors duration-300">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Our Products */}
					<div className="space-y-6">
						<h3 className="text-gray-800 font-semibold">Our Products</h3>
						<ul className="space-y-2">
							{ourProducts.map((product) => (
								<li key={product.name}>
									<Link to={product.href} className="text-gray-600 hover:text-primary transition-colors duration-300">
										{product.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & Newsletter */}
					<div className="space-y-6">
						<div>
							<h3 className="text-gray-800 font-semibold mb-4">Contact Info</h3>
							<div className="space-y-3">
								<div className="flex items-start space-x-3">
									<MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
									<span className="text-gray-600">Kampala, Uganda</span>
								</div>
								<div className="flex items-start space-x-3">
									<Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
									<span className="text-gray-600">+256-778410315</span>
								</div>
								<div className="flex items-start space-x-3">
									<Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
									<span className="text-gray-600">info@onetechconnect.org</span>
								</div>
							</div>
						</div>

						{/* Newsletter Signup */}
						<div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
							<h3 className="text-gray-800 font-semibold mb-2">Stay Updated</h3>
							<p className="text-gray-600 text-sm mb-4">
								Get the <span className="text-primary font-semibold">latest insights</span> on tech law and innovation across Africa.
							</p>
							<form
								className="space-y-2"
								onSubmit={handleNewsletterSubmit}
							>
								<Input
									type="email"
									name="email"
									placeholder="Enter your email"
									className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-primary focus:ring-primary/20 h-10 rounded-md"
									required
								/>
								<Button
									variant="primary"
									size="sm"
									className="w-full group h-10 rounded-md"
									type="submit"
									disabled={newsletterSubmitting}
								>
									{newsletterSubmitting ? "Subscribing..." : "Subscribe"}
									<Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
								</Button>
							</form>
							<p className="text-gray-500 text-xs mt-3">
								We respect your privacy. Unsubscribe anytime.
							</p>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="border-t border-gray-200 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-gray-600 text-sm">
							© 2025 <span className="text-primary font-semibold">OneTechConnect</span>. All rights reserved.
						</p>
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
							<Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm">
								Privacy Policy
							</Link>
							<Link to="/terms" className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm">
								Terms of Service
							</Link>
							<Link to="/cookies" className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm">
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

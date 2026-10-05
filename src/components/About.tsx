import { Lightbulb, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const techSolutions = [
	{
		name: "WazaziConnect",
		description: "A digital platform connecting parents and caregivers with trusted health and development resources.",
	},
	{
		name: "HappyFarma",
		description: "A technology solution supporting farmers with access to information, inputs and markets.",
	},
];

export function About() {
	return (
		<section id="about" className="py-24 bg-background">
			<div className="container mx-auto px-6">
				<div className="max-w-6xl mx-auto">
					{/* Our Approach */}
					<div className="text-center mb-20">
						<h2 className="heading-section text-gradient-blue mb-6">Our Approach</h2>
						<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							At OTC, we take ideas from opportunity to impact. We discover real problems and opportunities,
							build innovative solutions and enterprises, protect their intellectual and commercial value,
							finance their growth with appropriate capital, amplify their stories and connect them to the
							right audiences, and scale what works to create lasting impact.
						</p>
					</div>

					{/* Our Tech Solutions */}
					<div>
						<div className="text-center mb-12">
							<h3 className="heading-card text-foreground mb-4">Our Tech Solutions</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
							{techSolutions.map((solution) => (
								<div
									key={solution.name}
									className="card-dark p-8 shadow-card hover:shadow-golden transition-all duration-300 card-hover"
								>
									<div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center mb-6">
										<Lightbulb className="w-6 h-6 text-golden" />
									</div>
									<h4 className="text-xl font-playfair font-semibold text-white mb-3">{solution.name}</h4>
									<p className="text-body text-gray-300">{solution.description}</p>
								</div>
							))}
						</div>
						<div className="text-center">
							<Link
								to="/innovation-hub"
								className="inline-flex items-center gap-2 bg-golden text-golden-foreground px-6 py-3 font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
							>
								<Rocket className="w-5 h-5" />
								Explore Opportunities
								<ArrowRight className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

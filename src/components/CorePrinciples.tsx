import { Shield, Users, Target, Heart } from "lucide-react";

const principles = [
	{
		icon: Shield,
		title: "Innovation",
		description:
			"Driving creative, future-oriented solutions that harness technology to improve lives and transform societies.",
	},
	{
		icon: Users,
		title: "Interoperability",
		description:
			"Building systems that seamlessly connect people, communities, and innovations for maximum impact.",
	},
	{
		icon: Target,
		title: "Equity",
		description:
			"Ensuring digital transformation reaches all Africans, reducing inequalities and promoting inclusion.",
	},
	{
		icon: Heart,
		title: "Human Rights",
		description:
			"Upholding fundamental rights and social justice in all our technological initiatives and solutions.",
	},
];

export function CorePrinciples() {
	return (
		<section className="py-24 bg-gradient-to-b from-background to-card/30">
			<div className="container mx-auto px-6">
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="text-center mb-16">
						<h2 className="heading-section text-gradient-blue mb-6">
							Our Core Principles
						</h2>
						<p className="text-body text-muted-foreground max-w-3xl mx-auto">
							These foundational principles guide everything we do and shape our
							approach to advancing Africa's digital transformation.
						</p>
					</div>

					{/* Principles Grid - 4-Column Layout */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{principles.map((principle, index) => (
							<div
								key={principle.title}
								className="group bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover text-center"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
									<principle.icon className="w-8 h-8 text-primary" />
								</div>
								<h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-4">
									{principle.title}
								</h3>
								<p className="text-body text-muted-foreground leading-relaxed">
									{principle.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

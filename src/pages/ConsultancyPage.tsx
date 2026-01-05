import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { BookOpen, Users, Shield, Building, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface ConsultancyService {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  service_type: string;
  features: string[];
  pricing_info: string;
  contact_info: string;
}

const iconMap = {
  BookOpen,
  Users,
  Shield,
  Building,
  TrendingUp,
  DollarSign,
  Briefcase,
};

export default function ConsultancyPage() {
  const [services, setServices] = useState<ConsultancyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDetails, setOpenDetails] = useState<boolean[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setOpenDetails(new Array(services.length).fill(false));
  }, [services]);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('consultancy_services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching consultancy services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleToggle = (idx: number) => {
    setOpenDetails((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading consultancy services...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
								{services.map((service, index) => {
									const IconComponent = iconMap[service.icon_name as keyof typeof iconMap] || BookOpen;
									return (
										<div
											key={service.id}
											className="bg-card border border-border/50 rounded-none p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20"
										>
											<div className="flex items-start mb-6">
												<div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
													<IconComponent className="w-8 h-8 text-primary" />
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
															{service.features?.map(
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
									);
								})}
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
import { useState, useCallback, useEffect } from "react";
import { LinkedinIcon, MailIcon, TwitterIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  expertise?: string[];
  education?: string[];
  experience?: string[];
  social?: {
    linkedin: string;
    email: string;
    twitter: string;
  };
  display_order?: number;
}

export function Team() {
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedMember, setSelectedMember] = useState<number | null>(null);
	const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
	const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

	useEffect(() => {
		const fetchTeamMembers = async () => {
			try {
				const { data, error } = await supabase
					.from('team_members')
					.select('*')
					.order('display_order');

				if (error) {
					console.error('Error fetching team members:', error);
					setError('Failed to load team members');
					return;
				}

				// Transform the data to match the expected format
				const transformedData = (data || []).map(member => ({
					...member,
					// Arrays are already arrays in the database, social is JSONB
					expertise: Array.isArray(member.expertise) ? member.expertise : [],
					education: Array.isArray(member.education) ? member.education : [],
					experience: Array.isArray(member.experience) ? member.experience : [],
					social: { linkedin: '', email: '', twitter: '', ...(member.social || {}) }
				}));

				setTeamMembers(transformedData);
			} catch (err) {
				console.error('Error fetching team members:', err);
				setError('Failed to load team members');
			} finally {
				setLoading(false);
			}
		};

		fetchTeamMembers();
	}, []);

	const openModal = useCallback((index: number) => {
		setSelectedMember(index);
		setAccordionOpen(null);
		setDirection(null);
	}, []);

	const closeModal = useCallback(() => {
		setSelectedMember(null);
		setAccordionOpen(null);
		setDirection(null);
	}, []);

	const navigateMember = useCallback((navDirection: 'prev' | 'next') => {
		if (selectedMember === null) return;
		const newIndex = navDirection === 'next' 
			? (selectedMember + 1) % teamMembers.length 
			: (selectedMember - 1 + teamMembers.length) % teamMembers.length;
		setDirection(navDirection);
		setSelectedMember(newIndex);
		setAccordionOpen(null);
	}, [selectedMember, teamMembers.length]);

	const toggleAccordion = useCallback((section: string) => {
		setAccordionOpen(accordionOpen === section ? null : section);
	}, [accordionOpen]);

	return (
		<>
		<section
			id="team"
			className="py-16 bg-white"
				style={{
					'--color-background-warm': 'var(--background)',
					'--color-text-primary': 'var(--foreground)',
					'--color-accent': 'var(--primary)'
				} as React.CSSProperties}
			>
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-6xl">
						{/* Section Header */}
					<div className="text-center mb-12">
						<h2 className="heading-section text-primary mb-6">
							Our Team
						</h2>
						<p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Meet the people behind OneTechConnect — legal experts, technologists, and visionaries advancing digital justice across Africa.
						</p>
					</div>

						{/* Team Grid */}
						{loading ? (
							<div className="flex justify-center items-center py-12">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
							</div>
						) : error ? (
							<div className="text-center py-12">
								<p className="text-red-500 mb-4">{error}</p>
								<Button onClick={() => window.location.reload()} variant="outline">
									Try Again
								</Button>
							</div>
						) : teamMembers.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-muted-foreground">No team members found.</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
								{teamMembers.map((member, index) => (
									<div
										key={member.id || member.name}
										className="group bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover opacity-0 translate-y-8 animate-fade-in border border-border/50 hover:border-primary/20 cursor-pointer"
										style={{
											animationDelay: `${index * 0.15}s`,
											animationFillMode: "forwards",
										}}
										onClick={() => openModal(index)}
									>
										{/* Profile Photo */}
										<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
											{member.image ? (
												<img
													src={member.image}
													alt={member.name}
													loading="lazy"
													className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-4xl font-bold font-poppins text-primary">
													{member.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										</div>

										{/* Content */}
										<div className="p-6 text-center">
											<h3 className="text-lg font-playfair font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
												{member.name}
											</h3>
											<p className="text-primary font-semibold text-xs uppercase tracking-wide">
												{member.position}
											</p>

											{/* Social Links */}
											{(member.social.linkedin || member.social.email || member.social.twitter) && (
												<div className="flex items-center justify-center space-x-3 pt-4 mt-4 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
													{member.social.linkedin && (
														<Button
															asChild
															variant="ghost"
															size="icon"
															className="w-9 h-9 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
														>
															<a
																href={member.social.linkedin}
																target="_blank"
																rel="noopener noreferrer"
																aria-label="LinkedIn"
															>
																<LinkedinIcon className="w-4 h-4" />
															</a>
														</Button>
													)}
													{member.social.email && (
														<Button
															asChild
															variant="ghost"
															size="icon"
															className="w-9 h-9 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
														>
															<a href={`mailto:${member.social.email}`} aria-label="Email">
																<MailIcon className="w-4 h-4" />
															</a>
														</Button>
													)}
													{member.social.twitter && (
														<Button
															asChild
															variant="ghost"
															size="icon"
															className="w-9 h-9 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
														>
															<a
																href={member.social.twitter}
																target="_blank"
																rel="noopener noreferrer"
																aria-label="Twitter"
															>
																<TwitterIcon className="w-4 h-4" />
															</a>
														</Button>
													)}
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						)}

					</div>
				</div>
			</section>

			{/* Modal */}
			<AnimatePresence>
				{selectedMember !== null && selectedMember < teamMembers.length && (
					<motion.div
						key={selectedMember}
						initial={direction === 'next' ? { x: "100%" } : direction === 'prev' ? { x: "-100%" } : { y: "100%" }}
						animate={{ x: 0, y: 0 }}
						exit={direction === 'next' ? { x: "-100%" } : direction === 'prev' ? { x: "100%" } : { y: "100%" }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="fixed inset-0 z-50 bg-yellow-600 flex items-center justify-center"
					>
						<div className="relative w-full h-full flex flex-col lg:flex-row">
							{/* Close Button */}
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors"
							>
								<X className="w-8 h-8" />
							</button>

							{/* Image Column */}
							<div className="w-full lg:w-2/5 h-1/2 lg:h-full relative">
								<img
									src={teamMembers[selectedMember].image}
									alt={teamMembers[selectedMember].name}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Content Column */}
							<div className="w-full lg:w-3/5 h-1/2 lg:h-full p-8 lg:p-12 overflow-y-auto text-white">
								<div className="max-w-2xl mx-auto">
									<h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-2">
										{teamMembers[selectedMember].name}
									</h1>
									<p className="text-xl lg:text-2xl font-inter font-normal mb-8">
										{teamMembers[selectedMember].position}
									</p>

									{/* Biography */}
									<div className="mb-8">
										{Array.isArray(teamMembers[selectedMember].bio) ? (
											teamMembers[selectedMember].bio.map((paragraph, idx) => (
												<p key={idx} className="text-lg leading-relaxed mb-4">
													{paragraph}
												</p>
											))
										) : (
											<p className="text-lg leading-relaxed">{teamMembers[selectedMember].bio}</p>
										)}
									</div>

									{/* Accordion */}
									<div className="space-y-4 mb-8">
										{/* Education */}
										<div>
											<button
												onClick={() => toggleAccordion('education')}
												className="w-full flex justify-between items-center py-4 border-b border-white/30 text-left"
											>
												<span className="text-xl font-semibold uppercase">Education</span>
												<span className="text-2xl">{accordionOpen === 'education' ? '−' : '+'}</span>
											</button>
											{accordionOpen === 'education' && (
												<div className="py-4 space-y-2">
													{teamMembers[selectedMember].education?.map((item, idx) => (
														<p key={idx} className="text-lg">{item}</p>
													))}
												</div>
											)}
										</div>

										{/* Experience */}
										<div>
											<button
												onClick={() => toggleAccordion('experience')}
												className="w-full flex justify-between items-center py-4 border-b border-white/30 text-left"
											>
												<span className="text-xl font-semibold uppercase">Experience</span>
												<span className="text-2xl">{accordionOpen === 'experience' ? '−' : '+'}</span>
											</button>
											{accordionOpen === 'experience' && (
												<div className="py-4 space-y-2">
													{teamMembers[selectedMember].experience?.map((item, idx) => (
														<p key={idx} className="text-lg">{item}</p>
													))}
												</div>
											)}
										</div>

										{/* Expertise */}
										<div>
											<button
												onClick={() => toggleAccordion('expertise')}
												className="w-full flex justify-between items-center py-4 border-b border-white/30 text-left"
											>
												<span className="text-xl font-semibold uppercase">Expertise</span>
												<span className="text-2xl">{accordionOpen === 'expertise' ? '−' : '+'}</span>
											</button>
											{accordionOpen === 'expertise' && (
												<div className="py-4 flex flex-wrap gap-2">
													{teamMembers[selectedMember].expertise.map((skill) => (
														<span key={skill} className="px-3 py-1 bg-white/20 rounded-full text-sm">
															{skill}
														</span>
													))}
												</div>
											)}
										</div>
									</div>

									{/* Navigation */}
									<div className="flex justify-between items-center">
										<button
											onClick={() => navigateMember('prev')}
											className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
										>
											<ChevronLeft className="w-6 h-6" />
											<span className="text-lg uppercase">Previous</span>
										</button>
										<button
											onClick={() => navigateMember('next')}
											className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
										>
											<span className="text-lg uppercase">Next</span>
											<ChevronRight className="w-6 h-6" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

// Add to your global CSS (e.g., src/index.css or tailwind.css):
/*
@keyframes fade-in {
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
}
*/
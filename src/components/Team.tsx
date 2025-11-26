import { useState } from "react";
import { LinkedinIcon, MailIcon, TwitterIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
	{
		name: "Ssekamwa Frank",
		pronouns: "(He/Him)",
		position: "Executive Director",
		bio: [
			"Frank leads OTC as Chief Executive Director, bringing together expertise at the intersection of law, technology, and global health. He holds a Bachelor of Laws from Makerere University, a Postgraduate Diploma in Legal Practice from the Law Development Centre and a Master of Laws (LL.M.) specializing in Digital Health Rights in Low- and Middle-Income Countries.",
			"In addition to his academic qualifications, Frank has undertaken professional training in administrative science, climate change, digital health, reproductive health, and project management. His career spans diverse roles with the High Court of Uganda, leading law firms and Afya na Haki Institute equipping him with a unique blend of experience in research, strategic litigation, capacity building, and project leadership.",
			"Frank is a Tech Lawyer and Innovator passionate about advancing digital rights and justice in Africa. He is an active member of both the East African Law Society and the Uganda Law Society.",
		],
		image: "/images/Frank.jpg",
		expertise: [
			"Digital Health Rights",
			"Tech Law",
			"Strategic Litigation",
			"Project Leadership",
		],
		education: ["Bachelor of Laws - Makerere University", "Postgraduate Diploma in Legal Practice - Law Development Centre", "Master of Laws (LL.M.) - Digital Health Rights"],
		experience: ["High Court of Uganda", "Leading Law Firms", "Afya na Haki Institute"],
		social: {
			linkedin: "https://www.linkedin.com/in/ssekamwa-frank-451b6920b/",
			email: "frank@onetechconnect.org",
			twitter: "https://x.com/ssekamwafrank",
		},
	},
	{
		name: "Nakitende Sauda",
		pronouns: "",
		position: "Head of Research and Development (R&D)",
		bio: [
			"Sauda is the Head of Research and Development at OTC, driven by a passion for ensuring that technological transformation advances the well-being and rights of women, children, and underserved communities across Africa. Sauda holds a Bachelor of Laws (Hons) and a first-class Diploma in Legal Practice.",
			"She is currently a master's candidate, where her research explores the criminalization of cyber laws and its impact on the right to freedom of expression in the digital era. With her expertise in research, teaching, project planning, management, monitoring, and reporting, Sauda is instrumental in leading our initiatives.",
			"She is a registered member of both the East African Law Society and the Uganda Law Society.",
		],
		image: "/images/Sauda.jpg",
		expertise: ["Research Management", "Program Development", "Cyber Law", "Women's Rights"],
		education: ["Bachelor of Laws (Hons)", "Diploma in Legal Practice - Law Development Centre"],
		experience: ["Researcher", "Health and Hygiene Inspector"],
		social: {
			linkedin: "#",
			email: "sauda@onetechconnect.org",
			twitter: "#",
		},
	},
	{
		name: "Kalivayo Blair",
		pronouns: "(He/Him)",
		position: "Director of Operations",
		bio: [
			"Blair is the founding Director of Operations, a distinguished corporate lawyer with a profound passion for the intersection of law and ICT. Blair holds a Bachelor of Laws from Makerere University and a Post-Graduate Diploma in Legal Practice, supplemented by several relevant professional training certifications.",
			"His expertise is extensive, covering banking, corporate governance, insolvency practice, Mergers and Acquisitions (M&A), Intellectual Property (IP), Technology, Media, and Telecommunications (TMT). Over the years, Blair has been instrumental in the success of numerous start-ups across Uganda, East, and West Africa.",
			"His career includes serving with some of Uganda's leading law firms, providing him with a wealth of practical experience. He is a respected member of both the Uganda Law Society and the East African Law Society.",
		],
		image: "/images/Blair.png",
		expertise: ["Corporate Law", "M&A", "Intellectual Property", "TMT Law"],
		education: ["Bachelor of Laws - Makerere University", "Post-Graduate Diploma in Legal Practice"],
		experience: ["Corporate Lawyer", "Director of Operations"],
		social: {
			linkedin: "https://www.linkedin.com/in/blair-kalivayo-748007198/",
			email: "blair@onetechconnect.org",
			twitter: "https://x.com/blairekalivayo",
		},
	},
	{
		name: "Abomugisha Dorothy",
		pronouns: "",
		position: "Head Finance",
		bio: [
			"Dorothy leads OTC's financial operations, ensuring fiscal responsibility and strategic financial planning that supports our mission of advancing digital transformation across Africa.",
			"Her expertise in financial management and accounting helps maintain transparency and accountability in all our operations.",
		],
		image: "/images/Dorothy.jpg",
		expertise: [
			"Financial Management",
			"Strategic Planning",
			"Accounting",
			"Budget Management",
		],
		education: ["Bachelor's Degree in Commerce", "Master's Degree in Business Administration"],
		experience: ["Finance Manager", "Accountant"],
		social: {
			linkedin: "#",
			email: "dorothy@onetechconnect.org",
			twitter: "#",
		},
	},
	{
		name: "Catherine Matama",
		pronouns: "",
		position: "Programme Officer, Research & Community Engagement",
		bio: [
			"Catherine is the Programme Officer for Research and Community Engagement at OTC. She supports the development and coordination of programmes that bridge research, innovation, and advocacy to ensure that digital transformation reflects the voices and needs of communities at the grassroots.",
			"She holds a Bachelor's Degree in Environmental Health Science (Second Class Upper Division) from Makerere University and has professional experience in public research, environmental health and regulatory compliance.",
			"Catherine has previously worked as a Researcher, Health and Hygiene Inspector contributing to the enforcement of health, safety and environmental standards for Uganda's first oil pipeline project. Catherine is passionate about inclusive research, innovation, environmental sustainability and ensuring that digital transformation benefits communities at the last mile.",
		],
		image: "/images/Catherine.jpg",
		expertise: [
			"Inclusive Research",
			"Innovation",
			"Environmental Sustainability",
			"Digital Transformation",
		],
		education: ["Bachelor's Degree in Environmental Health Science - Makerere University"],
		experience: ["Programme Officer", "Researcher", "Health and Hygiene Inspector"],
		social: {
			linkedin: "#",
			email: "catherine@onetechconnect.org",
			twitter: "#",
		},
	},

	{
		name: "Tracy Rita Acholas",
		pronouns: "",
		position: "Head of Program",
		bio: [
			"Tracy is a lawyer and Advocate of the High Court of Uganda, holding a Bachelor of Laws from Makerere University and a Postgraduate Diploma in Legal Practice from the Law Development Centre. She also holds a Post Graduate Diploma in Project Management and is currently pursuing a Master of Business Administration (MBA).",
			"Management and is currently pursuing a Master of Business Administration (MBA). Tracy has extensive experience in public health, sexual and reproductive health and rights (SRHR), strategic public interest litigation and program design and implementation. ",
			"She is deeply committed to advancing digital justice leveraging the law, research, litigation, advocacy and management to promote an equitable and just society.",
		],
		image: "/images/Rita.jpg",
		expertise: [
			"Inclusive Research",
			"Innovation",
			"Environmental Sustainability",
			"Digital Transformation",
		],
		education: ["Bachelor of Laws - Makerere University", "Postgraduate Diploma in Legal Practice - Law Development Centre", "Post Graduate Diploma in Project Management"],
		experience: ["Lawyer", "Advocate of the High Court of Uganda", "Head of Program"],
		social: {
			linkedin: "https://www.linkedin.com/in/tracy-rita-achola-09aaa1140/ ",
			email: "rita@onetechconnect.org",
			twitter: "https://x.com/AcholaRita ",
		},
	},
];

export function Team() {
	const [selectedMember, setSelectedMember] = useState<number | null>(null);
	const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

	const openModal = (index: number) => {
		setSelectedMember(index);
		setAccordionOpen(null);
	};

	const closeModal = () => {
		setSelectedMember(null);
		setAccordionOpen(null);
	};

	const navigateMember = (direction: 'prev' | 'next') => {
		if (selectedMember === null) return;
		const newIndex = direction === 'next' 
			? (selectedMember + 1) % teamMembers.length 
			: (selectedMember - 1 + teamMembers.length) % teamMembers.length;
		setSelectedMember(newIndex);
		setAccordionOpen(null);
	};

	const toggleAccordion = (section: string) => {
		setAccordionOpen(accordionOpen === section ? null : section);
	};

	return (
		<>
			<section
				id="team"
				className="py-24 bg-background"
				style={{
					'--color-background-warm': 'var(--background)',
					'--color-text-primary': 'var(--foreground)',
					'--color-accent': 'var(--primary)'
				} as React.CSSProperties}
			>
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-6xl">
						{/* Section Header */}
						<div className="text-center mb-16">
							<h2 className="heading-section text-gradient-blue mb-6">
								Our Team
							</h2>
							<p className="text-body text-muted-foreground max-w-3xl mx-auto">
								Meet the innovative minds behind OneTechConnect.
							</p>
						</div>

						{/* Team Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
							{teamMembers.map((member, index) => (
								<div
									key={member.name}
									className="group bg-card border border-border overflow-hidden shadow-card hover:shadow-blue transition-all duration-500 card-hover opacity-0 translate-y-8 animate-fade-in"
									style={{
										animationDelay: `${index * 0.2}s`,
										animationFillMode: "forwards",
									}}
								>
									{/* Profile Image */}
									<div className="relative h-80 bg-gradient-to-br from-secondary/80 to-secondary/60 overflow-hidden">
										<img
											src={member.image}
											alt={member.name}
											loading="lazy"
											className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
										<div className="absolute bottom-4 left-4 right-4">
											<h3 className="text-xl font-playfair font-bold text-foreground mb-1">
												{member.name}{" "}
												{member.pronouns && (
													<span className="text-muted-foreground font-normal text-sm">
														{member.pronouns}
													</span>
												)}
											</h3>
											<p className="text-primary font-medium">
												{member.position}
											</p>
										</div>
									</div>

									{/* Content */}
									<div className="p-6">
										{/* Social Links */}
										<div className="flex items-center space-x-3 mb-4">
											<Button
												asChild
												variant="ghost-golden"
												size="icon"
												className="w-8 h-8"
											>
												<a
													href={member.social.linkedin}
													target="_blank"
													rel="noopener noreferrer"
												>
													<LinkedinIcon className="w-4 h-4" />
												</a>
											</Button>
											<Button
												asChild
												variant="ghost-golden"
												size="icon"
												className="w-8 h-8"
											>
												<a href={`mailto:${member.social.email}`}>
													<MailIcon className="w-4 h-4" />
												</a>
											</Button>
											<Button
												asChild
												variant="ghost-golden"
												size="icon"
												className="w-8 h-8"
											>
												<a
													href={member.social.twitter}
													target="_blank"
													rel="noopener noreferrer"
												>
													<TwitterIcon className="w-4 h-4" />
												</a>
											</Button>
										</div>

										{/* View Profile Button */}
										<Button
											variant="outline"
											className="w-full shadow-md transition-all duration-200 hover:shadow-lg hover:bg-primary/10 active:scale-95 focus:ring-2 focus:ring-primary focus:outline-none"
											onClick={() => openModal(index)}
										>
											View Profile
										</Button>
									</div>
								</div>
							))}
						</div>

						{/* Call to Action */}
						<div className="text-center mt-16">
							<div className="bg-secondary/60 rounded-2xl p-8 border border-border">
								<h3 className="heading-card text-gradient-blue mb-4">
									Join Our Mission
								</h3>
								<p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
									We're always looking for passionate individuals who share our
									vision
									<br className="hidden sm:block" /> of advancing digital Justice
									in Africa.
								</p>
								<Button variant="golden">View Open Positions</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Modal */}
			{selectedMember !== null && (
				<div className="fixed inset-0 z-50 bg-yellow-600 flex items-center justify-center">
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
				</div>
			)}
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
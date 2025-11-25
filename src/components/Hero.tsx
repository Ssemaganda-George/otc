import { useState, useEffect } from "react";
import { ArrowRight, Code, Scale, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/sac7.jpeg";
import heroImage2 from "@/assets/sac1.png";
import heroImage4 from "@/assets/sac3.png";
import heroImage6 from "@/assets/sac5.png";
import heroImage8 from "@/assets/sac7.png";

const heroSlides = [
	{
		image: heroImage1,
		message:
			"OTC is a Youth-led African Not for Profit Organization that ensures digital justice in health, sexual reproductive health, finance, agriculture and Development is advanced while ensuring respect to fundamental human rights and social justice for every individual and communities in Africa.",
	},
	{
		image: heroImage2,
		message:
			"We nurture the next generation of African tech innovators through comprehensive legal support, mentorship programs, and advocacy.",
	},
	{
		image: heroImage4,
		message: "We work around HealthTech& SRHR, AgriTech, FinTech & Development.",
	},
	{
		image: heroImage6,
		message: "We promote social justice and human rights.",
	},
	{
		image: heroImage8,
		message: "We Research, Capacitate, Advocate and Innovate",
	},
];

export function Hero() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroSlides.length);
		}, 6500);
		return () => clearInterval(interval);
	}, []);

	return (
		<section id="home" className="relative min-h-screen overflow-hidden pt-20">
			{/* Sliding Background Images Container */}
			<div className="absolute inset-0 z-0">
				{heroSlides.map((slide, index) => (
					<div
						key={index}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							index === current ? "opacity-100" : "opacity-0"
						}`}
					>
						<img
							src={slide.image}
							alt="OTC Innovation Background"
							className="w-full h-full object-cover"
							draggable={false}
						/>
						{/* First slide - darker overlay for better readability */}
						{index === 0 && (
							<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
						)}
						{/* Other slides - bottom gradient only (fades up from bottom) */}
						{index > 0 && (
							<div
								className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
								style={{
									background:
										"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0.3) 30%, transparent 50%)",
								}}
							/>
						)}
					</div>
				))}
			</div>

			{/* Floating Elements */}
			<div className="absolute top-32 left-10 w-16 h-16 bg-golden/15 rounded-full animate-float pointer-events-none" />
			<div
				className="absolute top-44 right-20 w-12 h-12 bg-primary/15 rounded-full animate-float pointer-events-none"
				style={{ animationDelay: "1s" }}
			/>
			<div
				className="absolute bottom-32 left-20 w-10 h-10 bg-golden/20 rounded-full animate-float pointer-events-none"
				style={{ animationDelay: "2s" }}
			/>

			{/* Main Content */}
			<div className="relative z-10 min-h-screen flex items-center">
				{/* First Slide - Full Design (Centered) */}
				{current === 0 && (
					<div className="container mx-auto px-6 py-12">
						<div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up text-center">
							{/* Tagline */}
							<div className="inline-flex items-center space-x-3 bg-white/90 border border-primary/30 rounded-full px-6 py-3 backdrop-blur-md shadow-xl">
								<span className="w-3 h-3 bg-golden rounded-full animate-golden-pulse" />
								<span className="text-primary font-semibold text-lg">
									Championing Digital Justice In Africa
								</span>
							</div>

							{/* Main Headline */}
							<h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white drop-shadow-2xl leading-tight">
								Championing Africa's Technological & Digital Justice
							</h1>

							{/* Message */}
							<p className="text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto text-center text-white drop-shadow-lg bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-950/95 rounded-2xl px-8 py-6 leading-relaxed shadow-2xl border border-white/10">
								{heroSlides[0].message}
							</p>

							{/* Stats Row */}
							<div className="grid grid-cols-3 gap-8 md:gap-12">
								<div className="flex flex-col items-center space-y-3 group">
									<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
										<Code className="w-8 h-8 text-golden" />
									</div>
									<div className="text-3xl md:text-4xl font-bold text-golden group-hover:text-white transition-colors drop-shadow-lg">
										5+
									</div>
									<div className="text-white text-lg md:text-xl font-medium drop-shadow-md">
										Tech Sectors
									</div>
								</div>
								<div className="flex flex-col items-center space-y-3 group">
									<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
										<Scale className="w-8 h-8 text-golden" />
									</div>
									<div className="text-3xl md:text-4xl font-bold text-golden group-hover:text-white transition-colors drop-shadow-lg">
										100+
									</div>
									<div className="text-white text-lg md:text-xl font-medium drop-shadow-md">
										Legal Frameworks
									</div>
								</div>
								<div className="flex flex-col items-center space-y-3 group">
									<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
										<Globe className="w-8 h-8 text-golden" />
									</div>
									<div className="text-3xl md:text-4xl font-bold text-golden group-hover:text-white transition-colors drop-shadow-lg">
										5+
									</div>
									<div className="text-white text-lg md:text-xl font-medium drop-shadow-md">
										African Countries
									</div>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
								<Button
									variant="golden"
									size="lg"
									className="group transition-all hover:scale-105 shadow-2xl text-xl px-8 py-4"
								>
									Explore Our Work
									<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform ml-2" />
								</Button>
								<Button
									variant="hero"
									size="lg"
									className="transition-all hover:scale-105 shadow-2xl text-xl px-8 py-4"
									asChild
								>
									<a href="/donate">Donate</a>
								</Button>
							</div>
						</div>
					</div>
				)}

				{/* Slides 2-5 - Text in Bottom Left Corner (Like Afya na Haki) */}
				{current > 0 && (
					<div className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-6 md:left-12 lg:left-16 max-w-xl md:max-w-2xl animate-fade-in-up">
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight leading-tight text-left">
							{heroSlides[current].message}
						</h2>
					</div>
				)}
			</div>

			{/* Slide Indicators */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						title={`Go to slide ${index + 1}`}
						className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
							index === current
								? "bg-golden scale-110"
								: "bg-white/50 hover:bg-white/70"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import AOSWrapper from "@/components/AOSWrapper";

export default function CampaignDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background custom-scrollbar font-poppins">
      <Navigation />
      <main className="pt-6">
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="uppercase tracking-widest text-primary font-bold text-sm mb-4">OTC Media Hub</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">Campaign Development</h1>
            </div>
          </section>
        </AOSWrapper>

        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Justice Champions Campaign</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We partnered with ADIJUST, designed and ran the Data Justice Champions Campaign which sought to use art
                and digital media to enhance responsible personal data handling among young Ugandans, with a focus on youth.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We designed the campaign strategy that involved recruitment and scrutinisation of content creators, and a
                TikTok challenge.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Over 200,000 youths engaged on TikTok and other social media during the one month's campaign.</li>
                <li>Over 30 youths were skilled about digital health rights and justice in Katanga slum, Uganda.</li>
                <li>Over 10+ TikTokers and content creators were recruited and capacitated about responsible data handling.</li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                This project was supported by ADIJUST in partnership with the University of Warwick and the Personal Data
                Protection Office, with generous support from the Wellcome Trust.
              </p>
            </div>
          </section>
        </AOSWrapper>
      </main>
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/Footer";
import { Heart, Leaf, DollarSign, Laptop, Users, BookOpen, Megaphone, Lightbulb } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AOSWrapper from "@/components/AOSWrapper";

interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Department {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Programme {
  id: string;
  title: string;
  description: string;
  objectives: string[];
}

const iconMap = {
  Heart,
  Leaf,
  DollarSign,
  Laptop,
  Users,
  BookOpen,
  Megaphone,
  Lightbulb
};

export default function WhatWeDoPage() {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [focusAreasRes, departmentsRes, programmesRes] = await Promise.all([
        supabase.from('what_we_do_focus_areas').select('*').order('created_at'),
        supabase.from('what_we_do_departments').select('*').order('created_at'),
        supabase.from('what_we_do_programmes').select('*').order('created_at')
      ]);

      if (focusAreasRes.data) setFocusAreas(focusAreasRes.data);
      if (departmentsRes.data) setDepartments(departmentsRes.data);
      if (programmesRes.data) {
        // Parse objectives JSON string back to array
        const parsedProgrammes = programmesRes.data.map(programme => ({
          ...programme,
          objectives: typeof programme.objectives === 'string'
            ? JSON.parse(programme.objectives)
            : programme.objectives
        }));
        setProgrammes(parsedProgrammes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
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
        <AOSWrapper animation="fade-up">
          <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="heading-display text-gradient-blue mb-8">
                  What We Do
                </h1>
                <p className="text-body text-muted-foreground leading-relaxed">
                  OTC drives inclusive digital transformation across Africa through strategic focus areas, 
                  specialized departments, and targeted programmes that advance human rights and social justice.
                </p>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Focus Areas */}
        <AOSWrapper animation="fade-up" delay={100}>
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="heading-section text-gradient-blue mb-6">
                    Focus Areas
                  </h2>
                  <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                    Our work spans four critical sectors where technology and human rights intersect
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {focusAreas.map((area, index) => {
                    const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Heart;
                    return (
                      <div
                        key={area.id || index}
                        className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 ${area.color}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                              {area.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {area.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Departments */}
        <AOSWrapper animation="fade-up" delay={200}>
          <section className="py-24 bg-gradient-to-br from-card/30 to-background">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="heading-section text-gradient-blue mb-6">
                    Departments
                  </h2>
                  <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                    Our four strategic pillars that operationalize the OTC Framework
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {departments.map((dept, index) => {
                    const IconComponent = iconMap[dept.icon as keyof typeof iconMap] || BookOpen;
                    return (
                      <div
                        key={dept.id || index}
                        className="bg-card border border-border p-6 shadow-card hover:shadow-blue transition-all duration-300 text-center group"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-playfair font-semibold text-gradient-blue mb-3">
                          {dept.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {dept.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* Programmes */}
        <AOSWrapper animation="fade-up" delay={300}>
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="heading-section text-gradient-blue mb-6">
                    Programmes
                  </h2>
                  <p className="text-body text-muted-foreground max-w-3xl mx-auto">
                    Targeted initiatives addressing specific challenges and opportunities in our focus areas
                  </p>
                </div>

                <div className="space-y-8">
                  {programmes.map((programme, index) => (
                    <div
                      key={programme.id || index}
                      className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300"
                    >
                      <h3 className="text-2xl font-playfair font-semibold text-gradient-blue mb-4">
                        {programme.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {programme.description}
                      </p>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Key Objectives:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {programme.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AOSWrapper>
      </main>

      <Footer />
    </div>
  );
}

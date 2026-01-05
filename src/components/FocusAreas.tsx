import { useState, useEffect } from "react";
import { Heart, Leaf, DollarSign, Laptop } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
}

const iconMap = {
  Heart,
  Leaf,
  DollarSign,
  Laptop
};

const focusAreas = [
  {
    title: "HealthTech & Sexual Reproductive Health and Rights",
    description: "Advancing digital health solutions while safeguarding reproductive rights and dignity",
    icon: Heart,
    color: "text-red-600"
  },
  {
    title: "Agriculture, Tech & Innovation",
    description: "Transforming agricultural practices through innovative technology solutions",
    icon: Leaf,
    color: "text-green-600"
  },
  {
    title: "FinTech & Governance",
    description: "Promoting inclusive financial technologies and transparent governance systems",
    icon: DollarSign,
    color: "text-yellow-600"
  },
  {
    title: "Tech, Innovation, Digitalization & Development",
    description: "Driving comprehensive digital transformation for sustainable development",
    icon: Laptop,
    color: "text-blue-600"
  }
];

export function FocusAreas() {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFocusAreas();
  }, []);

  const fetchFocusAreas = async () => {
    const { data, error } = await supabase
      .from('what_we_do_focus_areas')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching focus areas:', error);
    } else {
      setFocusAreas(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading focus areas...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Focus Areas
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We work across four critical sectors to ensure Africa's digital transformation 
              promotes inclusive growth and protects fundamental rights.
            </p>
          </div>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => {
              const IconComponent = iconMap[area.icon_name as keyof typeof iconMap] || Heart;
              return (
                <div
                  key={area.id}
                  className="bg-card border border-border rounded-none p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/60 flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${area.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                        {area.title}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
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
  );
}

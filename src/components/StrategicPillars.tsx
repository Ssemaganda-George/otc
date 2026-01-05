import { useState, useEffect } from "react";
import { Target, Users, Briefcase, Lightbulb } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface StrategicPillar {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  items: string[];
}

const iconMap = {
  Target,
  Users,
  Briefcase,
  Lightbulb
};

export function StrategicPillars() {
  const [pillars, setPillars] = useState<StrategicPillar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPillars();
  }, []);

  const fetchPillars = async () => {
    const { data, error } = await supabase
      .from('strategic_pillars')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching strategic pillars:', error);
    } else {
      setPillars(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading strategic pillars...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-section text-gradient-blue mb-6">
              Our Strategic Pillars
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We operationalize our framework through four strategic pillars that guide our approach 
              to advancing Africa's digital transformation.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => {
              const IconComponent = iconMap[pillar.icon_name as keyof typeof iconMap] || Target;
              return (
                <div
                  key={pillar.id}
                  className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-blue hover:border-primary/40"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-primary mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Pillar Items */}
                  <div className="border-t border-border pt-4">
                    <ul className="space-y-2">
                      {pillar.items?.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
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

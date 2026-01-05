import { useState, useEffect } from "react";
import { BookOpen, Users, Megaphone, Lightbulb } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Department {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  key_activities: string[];
}

const iconMap = {
  BookOpen,
  Users,
  Megaphone,
  Lightbulb
};

const departments = [
  {
    icon: BookOpen,
    title: "Research & Development",
    description: "Generating evidence to inform policy, practice, and innovation through comprehensive research and analysis across all sectors.",
    keyActivities: [
      "Documentation and Think tanks",
      "Policy Analysis and Legislative Scrutiny",
      "Experiments and Implementation",
      "Kimeeza / Public debates"
    ]
  },
  {
    icon: Users,
    title: "Training & Skill Development",
    description: "Equipping young people and communities with digital, technical, and rights-based skills for the digital transformation era.",
    keyActivities: [
      "Short courses and Academic programmes",
      "Seminars and Master classes",
      "Webinars and Workshops",
      "Capacity building initiatives"
    ]
  },
  {
    icon: Megaphone,
    title: "Advocacy & Partnerships",
    description: "Building alliances to influence policy and amplify voices for justice and accountability across Africa.",
    keyActivities: [
      "Reporting and MDA collaborations",
      "Activism and Strategic litigation",
      "ADR and Legislative drafting",
      "Coalition/Networks/Movement building"
    ]
  },
  {
    icon: Lightbulb,
    title: "Tech, Innovation & Digital Transformation (TID)",
    description: "Creating and supporting solutions that harness technology for inclusive and sustainable development.",
    keyActivities: [
      "Hackathons and IP Protection",
      "Data management and Sandboxes",
      "Compliance services",
      "Grant & Donations and Investment Fund"
    ]
  }
];

export function OurApproach() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDetails, setOpenDetails] = useState<boolean[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setOpenDetails(new Array(departments.length).fill(false));
  }, [departments]);

  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from('our_approach_departments')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching departments:', error);
    } else {
      setDepartments(data || []);
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading departments...</p>
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
              Our Departments
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We organize our work through four specialized departments that drive inclusive digital 
              transformation while ensuring respect for fundamental human rights and social justice.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {departments.map((department, index) => {
              const IconComponent = iconMap[department.icon_name as keyof typeof iconMap] || BookOpen;
              return (
                <div
                  key={department.id}
                  className="bg-card border border-border p-8 shadow-card hover:shadow-blue transition-all duration-300 card-hover"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-gradient-blue mb-3">
                        {department.title}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-4">
                        {department.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-22">
                    <button
                      className="mb-4 px-5 py-2 rounded-full bg-golden text-golden-foreground text-xs font-semibold shadow-lg hover:bg-golden-dark hover:scale-105 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2"
                      onClick={() => handleToggle(index)}
                    >
                      {openDetails[index] ? "Hide Details" : "View Details"}
                    </button>
                    {openDetails[index] && (
                      <>
                        <h4 className="font-semibold text-foreground mb-3">Key Activities:</h4>
                        <ul className="space-y-2">
                          {department.key_activities?.map((activity, activityIndex) => (
                            <li key={activityIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connectivity Statement */}
          <div className="bg-gradient-to-r from-golden/10 to-golden/5 border-2 border-golden/20 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-golden/20 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-golden" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gradient-blue">One Tech Approach</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              <span className="font-semibold text-primary">Connectivity:</span> Building technologies and systems that seamlessly connect people, communities, and innovations across Africa through our integrated departmental approach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { Landmark } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

// Shown until the board_members table has rows (see supabase/seed-about.sql).
const fallbackBoardMembers: BoardMember[] = [
  { id: "fallback-1", name: "Ankunda Patience", role: "Chairperson, Board of Trustees", image: null },
  { id: "fallback-2", name: "Ssekamwa Frank", role: "Executive Member", image: "/images/Frank.jpg" },
  { id: "fallback-3", name: "Kalivayo Blair", role: "Executive Member", image: "/images/Blair.png" },
  { id: "fallback-4", name: "Aisha Masimbi", role: "Non-Executive Member", image: null },
  { id: "fallback-5", name: "Dr. Stephen Roberts", role: "Non-Executive Member", image: null },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function BoardMembers() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      const { data, error } = await supabase
        .from("board_members")
        .select("*")
        .order("display_order");

      if (error) {
        console.error("Error fetching board members:", error);
        setMembers(fallbackBoardMembers);
      } else {
        setMembers(data && data.length > 0 ? data : fallbackBoardMembers);
      }
      setLoading(false);
    };

    fetchBoardMembers();
  }, []);

  return (
    <section id="board-members" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
              <Landmark className="w-9 h-9 text-primary" />
            </div>
            <h2 className="heading-section text-primary mb-6">Board Members</h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The governance leadership guiding OTC's strategic direction.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover opacity-0 translate-y-8 animate-fade-in border border-border/50 hover:border-primary/20"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
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
                        {initials(member.name)}
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
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


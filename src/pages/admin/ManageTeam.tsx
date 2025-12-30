import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  expertise: string[];
  education: string[];
  experience: string[];
  social: {
    linkedin: string;
    email: string;
    twitter: string;
  };
}

export default function ManageTeam() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    expertise: "",
    education: "",
    experience: "",
    linkedin: "",
    email: "",
    twitter: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchTeamMembers();
  }, [user, navigate]);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase.from('team_members').select('*').order('name');
    if (error) console.error(error);
    else setTeamMembers(data || []);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`team-members/${fileName}`, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(`team-members/${fileName}`);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (selectedFile) {
      imageUrl = await uploadFile(selectedFile);
    }
    const memberData = {
      ...formData,
      image: imageUrl,
      expertise: formData.expertise.split(',').map(s => s.trim()),
      education: formData.education.split(',').map(s => s.trim()),
      experience: formData.experience.split(',').map(s => s.trim()),
      social: {
        linkedin: formData.linkedin,
        email: formData.email,
        twitter: formData.twitter
      }
    };
    if (editingId) {
      await supabase.from('team_members').update(memberData).eq('id', editingId);
    } else {
      await supabase.from('team_members').insert([memberData]);
    }
    setFormData({
      name: "", position: "", bio: "", image: "", expertise: "", education: "", experience: "",
      linkedin: "", email: "", twitter: ""
    });
    setEditingId(null);
    setSelectedFile(null);
    fetchTeamMembers();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      expertise: member.expertise.join(', '),
      education: member.education.join(', '),
      experience: member.experience.join(', '),
      linkedin: member.social.linkedin,
      email: member.social.email,
      twitter: member.social.twitter
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      await supabase.from('team_members').delete().eq('id', id);
      fetchTeamMembers();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "", position: "", bio: "", image: "", expertise: "", education: "", experience: "",
      linkedin: "", email: "", twitter: ""
    });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Team</h1>
          <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Team Member' : 'Edit Team Member'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!editingId}
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                    <Input
                      id="expertise"
                      value={formData.expertise}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education (comma-separated)</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience (comma-separated)</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Team Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

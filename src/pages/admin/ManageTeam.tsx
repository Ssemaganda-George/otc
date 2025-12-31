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
  display_order: number;
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
    twitter: "",
    display_order: ""
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
    const { data, error } = await supabase.from('team_members').select('*').order('display_order');
    if (error) {
      console.error('Error fetching team members:', error);
      setLoading(false);
      return;
    }

    // Parse data from database (arrays are already arrays, social is JSONB)
    const parsedData = (data || []).map(member => ({
      ...member,
      expertise: Array.isArray(member.expertise) ? member.expertise : [],
      education: Array.isArray(member.education) ? member.education : [],
      experience: Array.isArray(member.experience) ? member.experience : [],
      social: member.social || { linkedin: '', email: '', twitter: '' }
    }));

    setTeamMembers(parsedData);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('team-members')
        .upload(`${fileName}`, file);

      if (error) {
        console.error('Storage upload error:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('team-members')
        .getPublicUrl(`${fileName}`);
      return publicUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      // Only attempt to upload if a file is selected
      if (selectedFile) {
        try {
          imageUrl = await uploadFile(selectedFile);
        } catch (uploadError) {
          console.error('Image upload failed, proceeding without image:', uploadError);
          alert('Warning: Image upload failed, but team member will be saved without an image. You can add the image URL manually or set up storage later.');
          // Continue with the form submission but keep the original image URL or empty string
          imageUrl = formData.image || '';
        }
      }

      const memberData = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        image: imageUrl,
        // Store arrays directly (not as JSON strings)
        expertise: formData.expertise.split(',').map(s => s.trim()).filter(s => s.length > 0),
        education: formData.education.split(',').map(s => s.trim()).filter(s => s.length > 0),
        experience: formData.experience.split(',').map(s => s.trim()).filter(s => s.length > 0),
        social: {
          linkedin: formData.linkedin,
          email: formData.email,
          twitter: formData.twitter
        },
        display_order: parseInt(formData.display_order) || 0
      };

      console.log('Attempting to save team member:', memberData);

      let result;
      if (editingId && editingId !== 'new') {
        result = await supabase.from('team_members').update(memberData).eq('id', editingId);
      } else {
        result = await supabase.from('team_members').insert([memberData]);
      }

      console.log('Save result:', result);

      if (result.error) {
        console.error('Database error:', result.error);
        alert(`Error saving team member: ${result.error.message}`);
        return;
      }

      // Reset form
      setFormData({
        name: "", position: "", bio: "", image: "", expertise: "", education: "", experience: "",
        linkedin: "", email: "", twitter: "", display_order: ""
      });
      setEditingId(null);
      setSelectedFile(null);
      fetchTeamMembers();
      alert('Team member saved successfully!');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      expertise: Array.isArray(member.expertise) ? member.expertise.join(', ') : '',
      education: Array.isArray(member.education) ? member.education.join(', ') : '',
      experience: Array.isArray(member.experience) ? member.experience.join(', ') : '',
      linkedin: member.social?.linkedin || '',
      email: member.social?.email || '',
      twitter: member.social?.twitter || '',
      display_order: member.display_order?.toString() || '0'
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
      linkedin: "", email: "", twitter: "", display_order: ""
    });
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading team members...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
              <p className="text-gray-600 mt-1">Manage and organize your team profiles</p>
            </div>
            <Button
              onClick={() => setEditingId('new')}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Form Section */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8 border-0 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-900">
                {editingId === 'new' ? 'Add New Team Member' : 'Edit Team Member'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {editingId === 'new' ? 'Create a new team member profile with all necessary details' : 'Update the team member information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter job position"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_order" className="text-sm font-medium text-gray-700">Display Order *</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter display order (1, 2, 3...)"
                      min="1"
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
                  <p className="text-sm text-gray-500 mt-1">
                    Upload an image file or provide a URL below. If upload fails, you can manually enter an image URL.
                  </p>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                  )}
                </div>
                <div>
                  <Label htmlFor="imageUrl">Or enter Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Alternative: paste an image URL if upload doesn't work
                  </p>
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Order: {member.display_order}
                  </div>
                </div>
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

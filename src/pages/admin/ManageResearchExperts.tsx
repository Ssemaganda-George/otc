import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";

interface ResearchExpert {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  expertise: string[];
  education: string[];
  experience: string[];
  publications: string[];
  social: {
    linkedin: string;
    email: string;
    twitter: string;
    researchgate: string;
  };
  created_at: string;
}

export default function ManageResearchExperts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [experts, setExperts] = useState<ResearchExpert[]>([]);
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
    publications: "",
    linkedin: "",
    email: "",
    twitter: "",
    researchgate: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchExperts();
  }, [user, navigate]);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('research_experts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching research experts:', error);
        if (error.code === 'PGRST116') {
          // Table doesn't exist
          setExperts([]);
          alert('The research_experts table does not exist. Please run the database setup script.');
        }
      } else {
        setExperts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setExperts([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `research-experts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const expertData = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        image: imageUrl,
        expertise: formData.expertise ? formData.expertise.split(',').map(item => item.trim()) : [],
        education: formData.education ? formData.education.split(',').map(item => item.trim()) : [],
        experience: formData.experience ? formData.experience.split(',').map(item => item.trim()) : [],
        publications: formData.publications ? formData.publications.split(',').map(item => item.trim()) : [],
        social: {
          linkedin: formData.linkedin,
          email: formData.email,
          twitter: formData.twitter,
          researchgate: formData.researchgate
        }
      };

      if (editingId) {
        const { error } = await supabase
          .from('research_experts')
          .update(expertData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('research_experts')
          .insert([expertData]);

        if (error) throw error;
      }

      resetForm();
      fetchExperts();
    } catch (error) {
      console.error('Error saving research expert:', error);
      alert('Error saving research expert. Please try again.');
    }
  };

  const handleEdit = (expert: ResearchExpert) => {
    setEditingId(expert.id);
    setFormData({
      name: expert.name,
      position: expert.position,
      bio: expert.bio,
      image: expert.image,
      expertise: expert.expertise.join(', '),
      education: expert.education.join(', '),
      experience: expert.experience.join(', '),
      publications: expert.publications.join(', '),
      linkedin: expert.social.linkedin,
      email: expert.social.email,
      twitter: expert.social.twitter,
      researchgate: expert.social.researchgate
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research expert?')) return;

    try {
      const { error } = await supabase
        .from('research_experts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchExperts();
    } catch (error) {
      console.error('Error deleting research expert:', error);
      alert('Error deleting research expert. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      bio: "",
      image: "",
      expertise: "",
      education: "",
      experience: "",
      publications: "",
      linkedin: "",
      email: "",
      twitter: "",
      researchgate: ""
    });
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading research experts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Research Experts</h1>
            <p className="text-muted-foreground">Add, edit, and manage research experts</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Expert
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Research Expert' : 'Edit Research Expert'}</CardTitle>
              <CardDescription>
                Fill in the details for the research expert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Title *</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biography *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Image URL or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    <Input
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      placeholder="Comma-separated list"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder="Comma-separated list"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Professional Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Comma-separated list"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publications">Key Publications</Label>
                    <Input
                      id="publications"
                      name="publications"
                      value={formData.publications}
                      onChange={handleInputChange}
                      placeholder="Comma-separated list"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="researchgate">ResearchGate</Label>
                      <Input
                        id="researchgate"
                        name="researchgate"
                        value={formData.researchgate}
                        onChange={handleInputChange}
                        placeholder="https://researchgate.net/profile/username"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Expert' : 'Update Expert'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Experts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  {expert.image ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xl font-bold">
                      {expert.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{expert.name}</CardTitle>
                <CardDescription>{expert.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {expert.bio}
                </p>

                {expert.expertise.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">EXPERTISE:</p>
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(expert)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(expert.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {experts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No research experts found. Add your first expert!</p>
          </div>
        )}
      </div>
    </div>
  );
}
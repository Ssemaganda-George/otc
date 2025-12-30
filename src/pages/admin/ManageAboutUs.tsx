import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface HomeSection {
  id: string;
  section_type: 'about_us' | 'mission' | 'vision';
  content: string;
  created_at: string;
}

export default function ManageAboutUs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    section_type: 'about_us' as 'about_us' | 'mission' | 'vision',
    content: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchSections();
  }, [user, navigate]);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('home_sections')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching About Us sections:', error);
        if (error.code === 'PGRST116') {
          alert('The home_sections table does not exist. Please run the database setup script.');
        }
      } else {
        setSections(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setSections([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const sectionData = {
        section_type: formData.section_type,
        content: formData.content
      };

      if (editingId) {
        const { error } = await supabase
          .from('home_sections')
          .update(sectionData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('home_sections')
          .insert([sectionData]);

        if (error) throw error;
      }

      resetForm();
      fetchSections();
    } catch (error) {
      console.error('Error saving About Us section:', error);
      alert('Error saving About Us section. Please try again.');
    }
  };

  const handleEdit = (section: HomeSection) => {
    setEditingId(section.id);
    setFormData({
      section_type: section.section_type,
      content: section.content
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this About Us section?')) return;

    try {
      const { error } = await supabase
        .from('home_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSections();
    } catch (error) {
      console.error('Error deleting About Us section:', error);
      alert('Error deleting About Us section. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      section_type: 'about_us',
      content: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading About Us sections...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">About Us Manager</h1>
            <p className="text-muted-foreground">Manage About Us, Mission, and Vision content sections</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Section' : 'Edit Section'}</CardTitle>
              <CardDescription>
                Create or edit About Us, Mission, or Vision content sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="section_type">Section Type *</Label>
                  <Select value={formData.section_type} onValueChange={(value: 'about_us' | 'mission' | 'vision') => handleSelectChange('section_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="about_us">About Us</SelectItem>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="vision">Vision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Enter the content for this section..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Section' : 'Update Section'}
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

        {/* Sections List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {section.section_type === 'about_us' ? 'A' : section.section_type === 'mission' ? 'M' : 'V'}
                  </span>
                </div>
                <CardTitle className="text-lg">
                  {section.section_type === 'about_us' ? 'About Us' : section.section_type === 'mission' ? 'Mission' : 'Vision'}
                </CardTitle>
                <CardDescription>
                  {section.section_type.replace('_', ' ').toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                  {section.content}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(section)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(section.id)}
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

        {sections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No About Us sections found. Add your first section!</p>
          </div>
        )}
      </div>
    </div>
  );
}
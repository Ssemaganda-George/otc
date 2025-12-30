import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff } from "lucide-react";

interface HomeSection {
  id: string;
  section_type: 'about_us' | 'mission' | 'vision';
  title: string;
  subtitle: string;
  content: string;
  image: string;
  link_url: string;
  link_text: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManageHomeSections() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    section_type: 'about_us' as 'about_us' | 'mission' | 'vision',
    title: "",
    subtitle: "",
    content: "",
    image: "",
    link_url: "",
    link_text: "",
    display_order: "",
    is_active: true
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
        console.error('Error fetching home sections:', error);
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_active: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `home-sections/${fileName}`;

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

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const sectionData = {
        section_type: formData.section_type,
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        image: imageUrl,
        link_url: formData.link_url,
        link_text: formData.link_text,
        display_order: formData.display_order ? parseInt(formData.display_order) : 0,
        is_active: formData.is_active
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
      console.error('Error saving home section:', error);
      alert('Error saving home section. Please try again.');
    }
  };

  const handleEdit = (section: HomeSection) => {
    setEditingId(section.id);
    setFormData({
      section_type: section.section_type,
      title: section.title,
      subtitle: section.subtitle,
      content: section.content,
      image: section.image,
      link_url: section.link_url,
      link_text: section.link_text,
      display_order: section.display_order?.toString() || "",
      is_active: section.is_active
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this home section?')) return;

    try {
      const { error } = await supabase
        .from('home_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSections();
    } catch (error) {
      console.error('Error deleting home section:', error);
      alert('Error deleting home section. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      section_type: 'about_us',
      title: "",
      subtitle: "",
      content: "",
      image: "",
      link_url: "",
      link_text: "",
      display_order: "",
      is_active: true
    });
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading home sections...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">About Us, Mission & Vision</h1>
            <p className="text-muted-foreground">Configure the About Us, Mission, and Vision sections of your website</p>
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
                Configure the content for About Us, Mission, or Vision sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="link_url">Link URL</Label>
                    <Input
                      id="link_url"
                      name="link_url"
                      value={formData.link_url}
                      onChange={handleInputChange}
                      placeholder="/about"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link_text">Link Text</Label>
                    <Input
                      id="link_text"
                      name="link_text"
                      value={formData.link_text}
                      onChange={handleInputChange}
                      placeholder="Learn More"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      name="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="is_active">Section is Active</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Section Image</Label>
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
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  {selectedImage && (
                    <p className="text-sm text-muted-foreground">Selected: {selectedImage.name}</p>
                  )}
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
                <div className="w-20 h-20 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {section.section_type === 'about_us' ? 'A' : section.section_type === 'mission' ? 'M' : 'V'}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">
                  {section.title || (section.section_type === 'about_us' ? 'About Us' : section.section_type === 'mission' ? 'Mission' : 'Vision')}
                </CardTitle>
                <CardDescription>
                  {section.section_type.replace('_', ' ').toUpperCase()} • Order: {section.display_order}
                  {section.is_active ? (
                    <Eye className="inline w-4 h-4 ml-2 text-green-500" />
                  ) : (
                    <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {section.subtitle && (
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {section.subtitle}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
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
            <p className="text-muted-foreground">No home sections found. Add your first section!</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Innovation {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManageInnovations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
    website_url: "",
    display_order: "",
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchInnovations();
  }, [user, navigate]);

  const fetchInnovations = async () => {
    const { data, error } = await supabase.from('innovations').select('*').order('display_order');
    if (error) console.error(error);
    else setInnovations(data || []);
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
      .from('innovations')
      .upload(`${fileName}`, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('innovations')
      .getPublicUrl(`${fileName}`);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let logoUrl = formData.logo_url;
      if (selectedFile) {
        logoUrl = await uploadFile(selectedFile);
      }

      const innovationData = {
        name: formData.name,
        description: formData.description || null,
        logo_url: logoUrl || null,
        website_url: formData.website_url || null,
        display_order: parseInt(formData.display_order) || 0,
        is_active: formData.is_active
      };

      if (editingId && editingId !== 'new') {
        const { error } = await supabase.from('innovations').update(innovationData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('innovations').insert([innovationData]);
        if (error) throw error;
      }

      resetForm();
      fetchInnovations();
    } catch (error) {
      console.error('Error saving innovation:', error);
      alert('Error saving innovation. Please try again.');
    }
  };

  const handleEdit = (innovation: Innovation) => {
    setEditingId(innovation.id);
    setFormData({
      name: innovation.name,
      description: innovation.description || "",
      logo_url: innovation.logo_url || "",
      website_url: innovation.website_url || "",
      display_order: innovation.display_order?.toString() || "",
      is_active: innovation.is_active
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this innovation?')) {
      try {
        await supabase.from('innovations').delete().eq('id', id);
        fetchInnovations();
      } catch (error) {
        console.error('Error deleting innovation:', error);
        alert('Error deleting innovation. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
      display_order: "",
      is_active: true
    });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Innovations</h1>
        <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Innovation</span>
        </Button>
      </div>

      {/* Form */}
      {(editingId === 'new' || editingId) && (
        <div ref={formRef}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Innovation' : 'Edit Innovation'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.logo_url && (
                    <img src={formData.logo_url} alt="Innovation logo preview" className="mt-2 h-24 w-auto object-contain rounded border border-gray-200" />
                  )}
                </div>
                <div>
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    placeholder="https://example.com (logo links here)"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Innovations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {innovations.map((innovation) => (
          <Card key={innovation.id}>
            <CardHeader>
              <CardTitle className="text-lg">{innovation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {innovation.logo_url ? (
                <img src={innovation.logo_url} alt={innovation.name} className="h-24 w-auto object-contain mb-4 mx-auto" />
              ) : (
                <div className="w-full h-24 bg-gray-100 mb-4 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No logo</span>
                </div>
              )}
              {innovation.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{innovation.description}</p>
              )}
              <div className="text-xs text-gray-500 mb-4">
                <p>Order: {innovation.display_order} | Status: {innovation.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(innovation)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(innovation.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {innovations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No innovations yet. Add your first innovation!</p>
        </div>
      )}
    </div>
  );
}

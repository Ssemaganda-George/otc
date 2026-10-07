import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManagePartners() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    website_url: "",
    logo_url: "",
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
    fetchPartners();
  }, [user, navigate]);

  const fetchPartners = async () => {
    const { data, error } = await supabase.from('partners').select('*').order('display_order');
    if (error) console.error(error);
    else setPartners(data || []);
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
      .from('partners')
      .upload(`${fileName}`, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('partners')
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

      const partnerData = {
        name: formData.name,
        website_url: formData.website_url || null,
        logo_url: logoUrl,
        display_order: parseInt(formData.display_order) || 0,
        is_active: formData.is_active
      };

      if (editingId && editingId !== 'new') {
        const { error } = await supabase.from('partners').update(partnerData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('partners').insert([partnerData]);
        if (error) throw error;
      }

      resetForm();
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      alert('Error saving partner. Please try again.');
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      website_url: partner.website_url || "",
      logo_url: partner.logo_url || "",
      display_order: partner.display_order?.toString() || "",
      is_active: partner.is_active
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      try {
        await supabase.from('partners').delete().eq('id', id);
        fetchPartners();
      } catch (error) {
        console.error('Error deleting partner:', error);
        alert('Error deleting partner. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      website_url: "",
      logo_url: "",
      display_order: "",
      is_active: true
    });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
        <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Partner</span>
        </Button>
      </div>

      {/* Form */}
      {(editingId === 'new' || editingId) && (
        <div ref={formRef}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Partner' : 'Edit Partner'}</CardTitle>
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
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
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
                    <img src={formData.logo_url} alt="Logo preview" className="mt-2 h-24 w-auto object-contain" />
                  )}
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

      {/* Partners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <CardTitle className="text-lg">{partner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {partner.logo_url && (
                <img src={partner.logo_url} alt={partner.name} className="h-20 w-auto object-contain mb-4" />
              )}
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <p>Order: {partner.display_order} | Status: {partner.is_active ? 'Active' : 'Inactive'}</p>
                {partner.website_url && <p className="truncate">{partner.website_url}</p>}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(partner)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(partner.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No partners yet. Add your first partner!</p>
        </div>
      )}
    </div>
  );
}

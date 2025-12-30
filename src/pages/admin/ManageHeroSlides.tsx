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

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  display_order: number;
  is_active: boolean;
  category?: string;
  video_background?: string;
  created_at: string;
}

export default function ManageHeroSlides() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    cta_text: "",
    cta_link: "",
    display_order: "",
    is_active: true,
    category: "",
    video_background: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchSlides();
  }, [user, navigate]);

  const fetchSlides = async () => {
    const { data, error } = await supabase.from('hero_slides').select('*').eq('is_active', true).order('display_order');
    if (error) console.error(error);
    else setSlides(data || []);
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
      .upload(`hero-slides/${fileName}`, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(`hero-slides/${fileName}`);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (selectedFile) {
      imageUrl = await uploadFile(selectedFile);
    }
    const slideData = { 
      ...formData, 
      image: imageUrl,
      display_order: parseInt(formData.display_order) || 0
    };
    if (editingId) {
      await supabase.from('hero_slides').update(slideData).eq('id', editingId);
    } else {
      await supabase.from('hero_slides').insert([slideData]);
    }
    setFormData({ 
      title: "",
      subtitle: "",
      description: "",
      image: "",
      cta_text: "",
      cta_link: "",
      display_order: "",
      is_active: true,
      category: "",
      video_background: ""
    });
    setSelectedFile(null);
    setEditingId(null);
    fetchSlides();
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      cta_text: slide.cta_text,
      cta_link: slide.cta_link,
      display_order: slide.display_order.toString(),
      is_active: slide.is_active,
      category: slide.category || "",
      video_background: slide.video_background || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      await supabase.from('hero_slides').delete().eq('id', id);
      fetchSlides();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ 
      title: "",
      subtitle: "",
      description: "",
      image: "",
      cta_text: "",
      cta_link: "",
      display_order: "",
      is_active: true,
      category: "",
      video_background: ""
    });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hero Slides</h1>
        <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Slide</span>
        </Button>
      </div>

      {/* Form */}
      {(editingId === 'new' || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'Add New Hero Slide' : 'Edit Hero Slide'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
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
                <Label htmlFor="cta_text">CTA Text</Label>
                <Input
                  id="cta_text"
                  value={formData.cta_text}
                  onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cta_link">CTA Link</Label>
                <Input
                  id="cta_link"
                  value={formData.cta_link}
                  onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
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
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="video_background">Video Background URL</Label>
                <Input
                  id="video_background"
                  value={formData.video_background}
                  onChange={(e) => setFormData({ ...formData, video_background: e.target.value })}
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
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Slides List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <Card key={slide.id}>
            <CardHeader>
              <CardTitle className="text-lg">{slide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {slide.image && (
                <img src={slide.image} alt="Hero slide" className="w-full h-32 object-cover mb-4 rounded" />
              )}
              {slide.subtitle && (
                <p className="text-sm font-medium text-gray-700 mb-2">{slide.subtitle}</p>
              )}
              {slide.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{slide.description}</p>
              )}
              <div className="text-xs text-gray-500 mb-4">
                <p>Order: {slide.display_order} | Category: {slide.category || 'None'}</p>
                <p>Status: {slide.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(slide)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(slide.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

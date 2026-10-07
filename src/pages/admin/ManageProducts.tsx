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

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManageProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    image_url: "",
    link_url: "",
    link_text: "",
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
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('display_order');
    if (error) console.error(error);
    else setProducts(data || []);
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
      .from('products')
      .upload(`${fileName}`, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(`${fileName}`);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile);
      }

      const productData = {
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description || null,
        image_url: imageUrl || null,
        link_url: formData.link_url || null,
        link_text: formData.link_text || null,
        display_order: parseInt(formData.display_order) || 0,
        is_active: formData.is_active
      };

      if (editingId && editingId !== 'new') {
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      tagline: product.tagline || "",
      description: product.description || "",
      image_url: product.image_url || "",
      link_url: product.link_url || "",
      link_text: product.link_text || "",
      display_order: product.display_order?.toString() || "",
      is_active: product.is_active
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await supabase.from('products').delete().eq('id', id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      tagline: "",
      description: "",
      image_url: "",
      link_url: "",
      link_text: "",
      display_order: "",
      is_active: true
    });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Form */}
      {(editingId === 'new' || editingId) && (
        <div ref={formRef}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Product' : 'Edit Product'}</CardTitle>
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
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Product preview" className="mt-2 w-full max-w-md h-40 object-cover rounded" />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="link_url">Link URL</Label>
                    <Input
                      id="link_url"
                      placeholder="/innovation-hub or https://example.com"
                      value={formData.link_url}
                      onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="link_text">Link Text</Label>
                    <Input
                      id="link_text"
                      placeholder="Learn more"
                      value={formData.link_text}
                      onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                    />
                  </div>
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

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-36 object-cover mb-4 rounded" />
              ) : (
                <div className="w-full h-36 bg-gray-100 mb-4 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
              {product.tagline && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.tagline}</p>
              )}
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <p>Order: {product.display_order} | Status: {product.is_active ? 'Active' : 'Inactive'}</p>
                {product.link_url && <p className="truncate">{product.link_url}</p>}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products yet. Add your first product!</p>
        </div>
      )}
    </div>
  );
}

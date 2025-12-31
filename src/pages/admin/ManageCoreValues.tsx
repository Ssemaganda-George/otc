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

interface CoreValue {
  id: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManageCoreValues() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    display_order: "",
    is_active: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchCoreValues();
  }, [user, navigate]);

  const fetchCoreValues = async () => {
    try {
      const { data, error } = await supabase
        .from('core_values')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching core values:', error);
        if (error.code === 'PGRST116') {
          alert('The core_values table does not exist. Please run the database setup script.');
        }
      } else {
        setCoreValues(data || []);
      }
    } catch (error) {
      console.error('Error fetching core values:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const coreValueData = {
        title: formData.title,
        description: formData.description,
        display_order: formData.display_order ? parseInt(formData.display_order) : 0,
        is_active: formData.is_active
      };

      if (editingId) {
        const { error } = await supabase
          .from('core_values')
          .update(coreValueData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('core_values')
          .insert([coreValueData]);

        if (error) throw error;
      }

      resetForm();
      fetchCoreValues();
    } catch (error) {
      console.error('Error saving core value:', error);
      alert('Error saving core value. Please try again.');
    }
  };

  const handleEdit = (coreValue: CoreValue) => {
    setEditingId(coreValue.id);
    setFormData({
      title: coreValue.title,
      description: coreValue.description,
      display_order: coreValue.display_order?.toString() || "",
      is_active: coreValue.is_active
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this core value?')) return;

    try {
      const { error } = await supabase
        .from('core_values')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchCoreValues();
    } catch (error) {
      console.error('Error deleting core value:', error);
      alert('Error deleting core value. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      display_order: "",
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading core values...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Core Values Manager</h1>
            <p className="text-muted-foreground">Manage the core values that define our organization</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Core Value
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Core Value' : 'Edit Core Value'}</CardTitle>
              <CardDescription>
                Define a core value that represents our organizational principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe what this core value means to the organization..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleSelectChange('is_active', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="is_active">Active (visible on website)</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Core Value' : 'Update Core Value'}
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

        {/* Core Values List */}
        <div className="grid gap-6">
          {coreValues.map((coreValue) => (
            <Card key={coreValue.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {coreValue.display_order || '?'}
                  </span>
                </div>
                <CardTitle className="text-lg">{coreValue.title}</CardTitle>
                <CardDescription>
                  Order: {coreValue.display_order}
                  {!coreValue.is_active && (
                    <span className="text-red-500 ml-2">(Inactive)</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {coreValue.description || 'No description provided.'}
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(coreValue)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(coreValue.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {coreValues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No core values found. Click "Add Core Value" to create your first one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
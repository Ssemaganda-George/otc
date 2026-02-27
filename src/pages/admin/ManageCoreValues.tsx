import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/admin-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Core Values</h1>
            <p className="text-sm text-gray-500">Manage the core values shown on the website</p>
          </div>
          <Button onClick={() => setEditingId('new')} className="h-9 px-3">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Modal Form (classy, compact) */}
        <Dialog open={!!editingId} onOpenChange={(open) => { if (!open) resetForm(); }}>
          <DialogContent className="max-w-lg bg-white rounded-lg shadow-md p-6">
            <div>
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{editingId === 'new' ? 'Add Core Value' : 'Edit Core Value'}</h3>
                <p className="text-sm text-gray-500 mt-1">Quickly add or edit a core value shown on the site.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2 space-y-1">
                    <Label htmlFor="title" className="text-sm">Title *</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required placeholder="E.g. Integrity" autoFocus />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="display_order" className="text-sm">Order</Label>
                    <Input id="display_order" name="display_order" type="number" value={formData.display_order} onChange={handleInputChange} placeholder="0" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description" className="text-sm">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Describe the core value in one or two sentences." />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="is_active" checked={formData.is_active} onChange={(e) => handleSelectChange('is_active', e.target.checked)} className="rounded" />
                    <Label htmlFor="is_active" className="text-sm">Active</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => resetForm()} className="h-9 px-4 text-sm">Cancel</Button>
                    <Button type="submit" className="h-9 px-4 text-sm">{editingId === 'new' ? 'Create' : 'Save'}</Button>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Core Values List */}
        <div className="space-y-3">
          {coreValues.map((coreValue) => (
            <Card key={coreValue.id} className="hover:shadow transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-700">{coreValue.title}</div>
                      <div className="text-xs text-gray-500">{coreValue.display_order}</div>
                      {!coreValue.is_active && <div className="text-xs text-red-500">Inactive</div>}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{coreValue.description || 'No description provided.'}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(coreValue)} className="h-8 px-2 text-sm">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(coreValue.id)} className="h-8 px-2 text-sm">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {coreValues.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-500">No core values found. Click "Add" to create your first one.</div>
        )}
      </div>
    </div>
  );
}
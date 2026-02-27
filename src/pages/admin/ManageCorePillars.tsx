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

interface CorePillar {
  id: string;
  letter: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function ManageCorePillars() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pillars, setPillars] = useState<CorePillar[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    letter: "",
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
    fetchPillars();
  }, [user, navigate]);

  const fetchPillars = async () => {
    const { data, error } = await supabase.from('core_pillars').select('*').order('display_order');
    if (error) console.error(error);
    else setPillars(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pillarData = {
      ...formData,
      display_order: parseInt(formData.display_order) || 0
    };

    if (editingId) {
      await supabase.from('core_pillars').update(pillarData).eq('id', editingId);
    } else {
      await supabase.from('core_pillars').insert([pillarData]);
    }
    setFormData({ letter: "", title: "", description: "", display_order: "", is_active: true });
    setEditingId(null);
    fetchPillars();
  };

  const handleEdit = (pillar: CorePillar) => {
    setEditingId(pillar.id);
    setFormData({
      letter: pillar.letter,
      title: pillar.title,
      description: pillar.description,
      display_order: pillar.display_order.toString(),
      is_active: pillar.is_active
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this core pillar?')) {
      await supabase.from('core_pillars').delete().eq('id', id);
      fetchPillars();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ letter: "", title: "", description: "", display_order: "", is_active: true });
  };

  if (loading) return <div className="p-8">Loading core pillars...</div>;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Core Pillars</h1>
            <p className="text-muted-foreground">Manage the R, A, T pillars displayed on the home page</p>
          </div>
          <Button onClick={() => setEditingId('new')} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Pillar
          </Button>
        </div>

        {/* Modal Form (compact admin pattern) */}
        <Dialog open={!!editingId} onOpenChange={(open) => { if (!open) handleCancel(); }}>
          <DialogContent className="max-w-lg bg-white rounded-lg shadow-md p-6">
            <div>
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{editingId === 'new' ? 'Add Pillar' : 'Edit Pillar'}</h3>
                <p className="text-sm text-gray-500 mt-1">Configure the core pillars (R, A, T) that appear on the home page.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="letter">Letter</Label>
                    <Input
                      id="letter"
                      value={formData.letter}
                      onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                      placeholder="R"
                      required
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                      placeholder="1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Research"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this pillar"
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

                <div className="flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleCancel} className="h-9 px-4 text-sm">Cancel</Button>
                  <Button type="submit" className="h-9 px-4 text-sm">{editingId === 'new' ? 'Create' : 'Save'}</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {pillar.letter}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(pillar)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(pillar.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{pillar.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Order: {pillar.display_order}</span>
                  <span className={pillar.is_active ? 'text-green-600' : 'text-red-600'}>
                    {pillar.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pillars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No core pillars found. Add your first pillar!</p>
          </div>
        )}
      </div>
    </div>
  );
}
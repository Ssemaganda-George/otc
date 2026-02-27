import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, TrendingUp } from "lucide-react";

interface ImpactStat {
  id: string;
  number: string;
  label: string;
  created_at: string;
}

export default function ManageOurImpact() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    number: "",
    label: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchImpactStats();
  }, [user, navigate]);

  const fetchImpactStats = async () => {
    try {
      const { data, error } = await supabase
        .from('our_impact_stats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImpactStats(data || []);
    } catch (error) {
      console.error('Error fetching impact stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        number: formData.number,
        label: formData.label
      };

      if (editingId) {
        const { error } = await supabase
          .from('our_impact_stats')
          .update(data)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('our_impact_stats')
          .insert([data]);

        if (error) throw error;
      }

      resetForm();
      fetchImpactStats();
    } catch (error) {
      console.error('Error saving impact stat:', error);
      alert('Error saving impact stat. Please try again.');
    }
  };

  const handleEdit = (stat: ImpactStat) => {
    setEditingId(stat.id);
    setFormData({
      number: stat.number,
      label: stat.label
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this impact statistic?')) return;

    try {
      const { error } = await supabase
        .from('our_impact_stats')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchImpactStats();
    } catch (error) {
      console.error('Error deleting impact stat:', error);
      alert('Error deleting impact stat. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      number: "",
      label: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading Our Impact statistics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Our Impact Manager</h1>
            <p className="text-muted-foreground">Manage impact statistics displayed on the home page</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Impact Stat
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Impact Statistic' : 'Edit Impact Statistic'}</CardTitle>
              <CardDescription>
                Create or edit impact statistics for the home page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="number">Number *</Label>
                    <Input
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="100+"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="label">Label *</Label>
                    <Input
                      id="label"
                      name="label"
                      value={formData.label}
                      onChange={handleInputChange}
                      placeholder="African Countries Reached"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Impact Stat' : 'Update Impact Stat'}
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

        {/* Statistics List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <Card key={stat.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">{stat.number}</CardTitle>
                <CardDescription className="text-center">{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(stat)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(stat.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {impactStats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No impact statistics found. Add your first impact stat!</p>
          </div>
        )}
      </div>
    </div>
  );
}
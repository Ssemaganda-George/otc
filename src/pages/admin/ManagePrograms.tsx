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

interface Program {
  id: string;
  title: string;
  description: string;
  goal: string;
  objectives: string[];
  outputs: string;
  focus_areas: string[];
  created_at: string;
}

export default function ManagePrograms() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    objectives: "",
    outputs: "",
    focus_areas: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchPrograms();
  }, [user, navigate]);

  const fetchPrograms = async () => {
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setPrograms(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const programData = {
      ...formData,
      objectives: formData.objectives.split(',').map(s => s.trim()),
      focus_areas: formData.focus_areas.split(',').map(s => s.trim())
    };
    if (editingId) {
      await supabase.from('programs').update(programData).eq('id', editingId);
    } else {
      await supabase.from('programs').insert([programData]);
    }
    setFormData({
      title: "", description: "", goal: "", objectives: "", outputs: "", focus_areas: ""
    });
    setEditingId(null);
    fetchPrograms();
  };

  const handleEdit = (program: Program) => {
    setEditingId(program.id);
    setFormData({
      title: program.title,
      description: program.description,
      goal: program.goal,
      objectives: program.objectives.join(', '),
      outputs: program.outputs,
      focus_areas: program.focus_areas.join(', ')
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      await supabase.from('programs').delete().eq('id', id);
      fetchPrograms();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "", description: "", goal: "", objectives: "", outputs: "", focus_areas: ""
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Programs</h1>
          <Button onClick={() => setEditingId('new')} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Program</span>
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Program' : 'Edit Program'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="goal">Goal</Label>
                  <Textarea
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Objectives (comma-separated)</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="outputs">Outputs & Activities</Label>
                  <Textarea
                    id="outputs"
                    value={formData.outputs}
                    onChange={(e) => setFormData({ ...formData, outputs: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="focus_areas">Focus Areas (comma-separated)</Label>
                  <Input
                    id="focus_areas"
                    value={formData.focus_areas}
                    onChange={(e) => setFormData({ ...formData, focus_areas: e.target.value })}
                  />
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

        {/* Programs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <CardDescription>{program.description.substring(0, 100)}...</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.goal}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(program.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

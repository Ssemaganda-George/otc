import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/admin-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface HomeSection {
  id: string;
  section_type: 'about_us' | 'mission' | 'vision';
  content: string;
  created_at: string;
}

export default function ManageAboutUs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    section_type: 'about_us' as 'about_us' | 'mission' | 'vision',
    content: ""
  });

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
        console.error('Error fetching About Us sections:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const sectionData = {
        section_type: formData.section_type,
        content: formData.content
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
      console.error('Error saving About Us section:', error);
      alert('Error saving About Us section. Please try again.');
    }
  };

  const handleEdit = (section: HomeSection) => {
    setEditingId(section.id);
    setFormData({
      section_type: section.section_type,
      content: section.content
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this About Us section?')) return;

    try {
      const { error } = await supabase
        .from('home_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSections();
    } catch (error) {
      console.error('Error deleting About Us section:', error);
      alert('Error deleting About Us section. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      section_type: 'about_us',
      content: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading About Us sections...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">About Us</h1>
            <p className="text-sm text-gray-500">Manage About Us, Mission & Vision sections</p>
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
                <h3 className="text-lg font-semibold text-gray-900">{editingId === 'new' ? 'Add Section' : 'Edit Section'}</h3>
                <p className="text-sm text-gray-500 mt-1">Create or edit About Us, Mission, or Vision content.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="section_type" className="text-sm">Section Type *</Label>
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

                <div className="space-y-1">
                  <Label htmlFor="content" className="text-sm">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Enter the content for this section..."
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm} className="h-9 px-4 text-sm">Cancel</Button>
                  <Button type="submit" className="h-9 px-4 text-sm">{editingId === 'new' ? 'Create' : 'Save'}</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Sections List */}
        <div className="space-y-3">
          {sections.map((section) => (
            <Card key={section.id} className="hover:shadow transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-700">{section.section_type === 'about_us' ? 'About Us' : section.section_type === 'mission' ? 'Mission' : 'Vision'}</div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-4">{section.content}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(section)} className="h-8 px-2 text-sm">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(section.id)} className="h-8 px-2 text-sm">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sections.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-500">No sections found. Click "Add" to create your first one.</div>
        )}
      </div>
    </div>
  );
}
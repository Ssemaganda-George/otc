import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  image: string;
  display_order: number;
}

export default function ManageBoardMembers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", role: "", image: "", display_order: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchMembers();
  }, [user, navigate]);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('board_members').select('*').order('display_order');
    if (error) console.error('Error fetching board members:', error);
    else setMembers(data || []);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `board-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('team-members').upload(fileName, file);
    if (error) throw new Error(`Failed to upload image: ${error.message}`);
    const { data: { publicUrl } } = supabase.storage.from('team-members').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile);
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        image: imageUrl || null,
        display_order: parseInt(formData.display_order) || 0
      };

      if (editingId && editingId !== 'new') {
        const { error } = await supabase.from('board_members').update(memberData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('board_members').insert([memberData]);
        if (error) throw error;
      }

      resetForm();
      fetchMembers();
    } catch (error) {
      console.error('Error saving board member:', error);
      alert(`Error saving board member: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEdit = (member: BoardMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image || "",
      display_order: member.display_order?.toString() || "0"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this board member?')) return;
    const { error } = await supabase.from('board_members').delete().eq('id', id);
    if (error) console.error('Error deleting board member:', error);
    fetchMembers();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", image: "", display_order: "" });
    setSelectedFile(null);
  };

  if (loading) return <div className="p-8">Loading board members...</div>;

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Board Members</h1>
            <p className="text-muted-foreground">Manage the governance leadership shown on the About and Team pages</p>
          </div>
          {editingId === null && (
            <Button onClick={() => setEditingId('new')} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Board Member
            </Button>
          )}
        </div>

        {editingId !== null && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add Board Member' : 'Edit Board Member'}</CardTitle>
              <CardDescription>Photo is optional — leave blank to show initials as a placeholder</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Chairperson, Board of Trustees" required />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input id="display_order" type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="photo">Photo (optional)</Label>
                    <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {member.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(member)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {members.length === 0 && (
            <p className="text-muted-foreground col-span-2">No board members yet. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}

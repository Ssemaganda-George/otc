import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Upload, Download } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  file_url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  download_count: number;
  created_at: string;
}

export default function ManageResources() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    file_url: "",
    thumbnail: "",
    category: "",
    tags: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchResources();
  }, [user, navigate]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        if (error.code === 'PGRST116') {
          alert('The resources table does not exist. Please run the database setup script.');
        }
      } else {
        setResources(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setResources([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.name === 'file') {
        setSelectedFile(file);
      } else if (e.target.name === 'thumbnail') {
        setSelectedThumbnail(file);
      }
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resources')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('resources')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fileUrl = formData.file_url;
      let thumbnailUrl = formData.thumbnail;

      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile, 'resources');
      }

      if (selectedThumbnail) {
        thumbnailUrl = await uploadFile(selectedThumbnail, 'thumbnails');
      }

      const resourceData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        file_url: fileUrl,
        thumbnail: thumbnailUrl,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (editingId) {
        const { error } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('resources')
          .insert([resourceData]);

        if (error) throw error;
      }

      resetForm();
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Error saving resource. Please try again.');
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title,
      slug: resource.slug,
      description: resource.description,
      file_url: resource.file_url,
      thumbnail: resource.thumbnail,
      category: resource.category,
      tags: resource.tags?.join(', ') || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Error deleting resource. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      file_url: "",
      thumbnail: "",
      category: "",
      tags: ""
    });
    setSelectedFile(null);
    setSelectedThumbnail(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading resources...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resources</h1>
            <p className="text-muted-foreground">Add, edit, and manage downloadable resources</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Resource' : 'Edit Resource'}</CardTitle>
              <CardDescription>
                Fill in the details for the downloadable resource
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
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Comma-separated"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Resource File</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="file_url"
                      name="file_url"
                      value={formData.file_url}
                      onChange={handleInputChange}
                      placeholder="File URL or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">Selected file: {selectedFile.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="thumbnail"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      placeholder="Image URL or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Thumbnail
                      </Button>
                    </div>
                  </div>
                  {selectedThumbnail && (
                    <p className="text-sm text-muted-foreground">Selected thumbnail: {selectedThumbnail.name}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Resource' : 'Update Resource'}
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

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  {resource.thumbnail ? (
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <Download className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(resource)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(resource.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found. Add your first resource!</p>
          </div>
        )}
      </div>
    </div>
  );
}
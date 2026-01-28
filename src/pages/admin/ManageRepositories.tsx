import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Github, ExternalLink } from "lucide-react";

interface Repository {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  stars: number;
  forks: number;
  last_updated: string;
  github_url: string;
  demo_url: string;
  document_url?: string; // URL to downloadable document
  tags: string[];
  thumbnail: string;
  is_active: boolean;
  created_at: string;
  download_count?: number; // Calculated field, not stored in DB
}

export default function ManageRepositories() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    stars: "",
    forks: "",
    last_updated: "",
    github_url: "",
    demo_url: "",
    document_url: "",
    tags: "",
    thumbnail: "",
    is_active: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchRepositories();
  }, [user, navigate]);

  const fetchRepositories = async () => {
    try {
      // Fetch repositories
      const { data: reposData, error: reposError } = await supabase
        .from('repositories')
        .select('*')
        .order('created_at', { ascending: false });

      if (reposError) throw reposError;

      // Fetch download counts for all repositories
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('repository_downloads')
        .select('repository_id');

      if (downloadsError) {
        console.warn('Error fetching download counts:', downloadsError);
      }

      // Calculate download counts
      const downloadCounts: { [key: string]: number } = {};
      if (downloadsData) {
        downloadsData.forEach(download => {
          downloadCounts[download.repository_id] = (downloadCounts[download.repository_id] || 0) + 1;
        });
      }

      // Add download counts to repositories
      const repositoriesWithCounts = (reposData || []).map(repo => ({
        ...repo,
        download_count: downloadCounts[repo.id] || 0
      }));

      setRepositories(repositoriesWithCounts);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let documentUrl = formData.document_url;

      // Upload file if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `repositories/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        documentUrl = publicUrl;
      }

      const repositoryData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        language: formData.language,
        stars: parseInt(formData.stars) || 0,
        forks: parseInt(formData.forks) || 0,
        last_updated: formData.last_updated || null,
        github_url: formData.github_url,
        demo_url: formData.demo_url,
        document_url: documentUrl,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        thumbnail: formData.thumbnail,
        is_active: formData.is_active
      };

      if (editingId) {
        const { error } = await supabase
          .from('repositories')
          .update(repositoryData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('repositories')
          .insert([repositoryData]);

        if (error) throw error;
      }

      resetForm();
      fetchRepositories();
    } catch (error) {
      console.error('Error saving repository:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (repository: Repository) => {
    setEditingId(repository.id);
    setFormData({
      title: repository.title,
      description: repository.description || "",
      category: repository.category || "",
      language: repository.language || "",
      stars: repository.stars.toString(),
      forks: repository.forks.toString(),
      last_updated: repository.last_updated || "",
      github_url: repository.github_url || "",
      demo_url: repository.demo_url || "",
      document_url: repository.document_url || "",
      tags: repository.tags ? repository.tags.join(', ') : "",
      thumbnail: repository.thumbnail || "",
      is_active: repository.is_active
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this repository?')) return;

    try {
      const { error } = await supabase
        .from('repositories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchRepositories();
    } catch (error) {
      console.error('Error deleting repository:', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedFile(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      language: "",
      stars: "",
      forks: "",
      last_updated: "",
      github_url: "",
      demo_url: "",
      document_url: "",
      tags: "",
      thumbnail: "",
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Repositories</h1>
        <p className="text-gray-600">Add, edit, and manage repository entries for the OneTechConnect repository showcase.</p>
      </div>

      {/* Add/Edit Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Repository' : 'Add New Repository'}</CardTitle>
          <CardDescription>
            {editingId ? 'Update the repository information below.' : 'Fill in the details to add a new repository.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="document">Document File</Label>
                <Input
                  id="document"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {formData.document_url && (
                  <p className="text-sm text-gray-500 mt-1">
                    Current file: {formData.document_url.split('/').pop()}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="stars">Stars</Label>
                <Input
                  id="stars"
                  type="number"
                  value={formData.stars}
                  onChange={(e) => setFormData({ ...formData, stars: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="forks">Forks</Label>
                <Input
                  id="forks"
                  type="number"
                  value={formData.forks}
                  onChange={(e) => setFormData({ ...formData, forks: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_updated">Last Updated (YYYY-MM-DD)</Label>
                <Input
                  id="last_updated"
                  type="date"
                  value={formData.last_updated}
                  onChange={(e) => setFormData({ ...formData, last_updated: e.target.value })}
                />
              </div>
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
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Digital Rights, Assessment, Legal Tech"
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
            <div className="flex gap-2">
              <Button type="submit" disabled={uploading}>
                <Save className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : (editingId ? 'Update' : 'Add') + ' Repository'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Repositories List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Repositories</CardTitle>
          <CardDescription>Manage your repository entries below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="flex items-center justify-between p-4 border">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{repo.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⭐ {repo.stars}</span>
                    <span>🍴 {repo.forks}</span>
                    <span>📥 {repo.download_count}</span>
                    {repo.category && <span>🏷️ {repo.category}</span>}
                    {repo.language && <span>💻 {repo.language}</span>}
                  </div>
                  {repo.tags && repo.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {repo.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {repo.github_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(repo.github_url, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {repo.demo_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(repo.demo_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(repo)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(repo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {repositories.length === 0 && (
              <p className="text-center text-gray-500 py-8">No repositories found. Add your first repository above.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
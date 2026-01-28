import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Upload, FileText, Download } from "lucide-react";

interface ResearchPublication {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  publish_date: string;
  category: string;
  abstract: string;
  thumbnail: string;
  download_url: string;
  view_url: string;
  citation_count: number;
  download_count: number;
  like_count: number;
  reshare_count: number;
  tags: string[];
  created_at: string;
}

export default function ManageResearchPublications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [publications, setPublications] = useState<ResearchPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    authors: "",
    publish_date: "",
    category: "",
    abstract: "",
    thumbnail: "",
    download_url: "",
    view_url: "",
    citation_count: "",
    download_count: "",
    like_count: "",
    reshare_count: "",
    tags: ""
  });
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchPublications();
  }, [user, navigate]);

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('research_publications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching research publications:', error);
        if (error.code === 'PGRST116') {
          alert('The research_publications table does not exist. Please run the database setup script.');
        }
      } else {
        setPublications(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setPublications([]);
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
      if (e.target.name === 'thumbnail') {
        setSelectedThumbnail(file);
      } else if (e.target.name === 'document') {
        setSelectedDocument(file);
      }
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum size is 10MB.`);
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (folder === 'thumbnails' && !allowedImageTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, WebP).');
    }

    if (folder === 'publications' && !allowedDocTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a PDF or Word document.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    setUploadProgress(`Uploading ${file.name}...`);

    try {
      const { error: uploadError } = await supabase.storage
        .from('research-publications')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from('research-publications')
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error('Failed to get public URL for uploaded file');
      }

      setUploadProgress('');
      return data.publicUrl;
    } catch (error) {
      setUploadProgress('');
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let thumbnailUrl = formData.thumbnail;
      let downloadUrl = formData.download_url;
      let viewUrl = formData.view_url;

      if (selectedThumbnail) {
        thumbnailUrl = await uploadFile(selectedThumbnail, 'thumbnails');
      }

      if (selectedDocument) {
        downloadUrl = await uploadFile(selectedDocument, 'publications');
        // Automatically set view_url to the same URL as download_url for document preview
        viewUrl = downloadUrl;
      }

      const publicationData = {
        title: formData.title,
        slug: formData.slug,
        authors: formData.authors ? formData.authors.split(',').map(author => author.trim()) : [],
        publish_date: formData.publish_date,
        category: formData.category,
        abstract: formData.abstract,
        thumbnail: thumbnailUrl,
        download_url: downloadUrl,
        view_url: viewUrl,
        citation_count: formData.citation_count ? parseInt(formData.citation_count) : 0,
        download_count: formData.download_count ? parseInt(formData.download_count) : 0,
        like_count: formData.like_count ? parseInt(formData.like_count) : 0,
        reshare_count: formData.reshare_count ? parseInt(formData.reshare_count) : 0,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (editingId === 'new') {
        const { error } = await supabase
          .from('research_publications')
          .insert([publicationData]);

        if (error) throw error;
        alert('Publication created successfully!');
      } else {
        const { error } = await supabase
          .from('research_publications')
          .update(publicationData)
          .eq('id', editingId);

        if (error) throw error;
        alert('Publication updated successfully!');
      }

      resetForm();
      fetchPublications();
    } catch (error: any) {
      console.error('Error saving publication:', error);
      alert(`Error saving publication: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleEdit = (publication: ResearchPublication) => {
    setEditingId(publication.id);
    setFormData({
      title: publication.title,
      slug: publication.slug,
      authors: publication.authors?.join(', ') || "",
      publish_date: publication.publish_date,
      category: publication.category,
      abstract: publication.abstract,
      thumbnail: publication.thumbnail,
      download_url: publication.download_url,
      view_url: publication.view_url,
      citation_count: publication.citation_count?.toString() || "",
      download_count: publication.download_count?.toString() || "",
      like_count: publication.like_count?.toString() || "",
      reshare_count: publication.reshare_count?.toString() || "",
      tags: publication.tags?.join(', ') || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research publication?')) return;

    try {
      const { error } = await supabase
        .from('research_publications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchPublications();
    } catch (error) {
      console.error('Error deleting research publication:', error);
      alert('Error deleting research publication. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      authors: "",
      publish_date: "",
      category: "",
      abstract: "",
      thumbnail: "",
      download_url: "",
      view_url: "",
      citation_count: "",
      download_count: "",
      like_count: "",
      reshare_count: "",
      tags: ""
    });
    setSelectedThumbnail(null);
    setSelectedDocument(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading research publications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Research Publications</h1>
            <p className="text-muted-foreground">Add, edit, and manage research publications and policy briefs</p>
          </div>
          <Button
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Publication
          </Button>
        </div>

        {/* Form */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId === 'new' ? 'Add New Publication' : 'Edit Publication'}</CardTitle>
              <CardDescription>
                Fill in the details for the research publication
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
                  <Label htmlFor="authors">Authors</Label>
                  <Input
                    id="authors"
                    name="authors"
                    value={formData.authors}
                    onChange={handleInputChange}
                    placeholder="Comma-separated list"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract">Abstract *</Label>
                  <Textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., POLICY BRIEF"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publish_date">Publish Date</Label>
                    <Input
                      id="publish_date"
                      name="publish_date"
                      type="date"
                      value={formData.publish_date}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citation_count">Citation Count</Label>
                    <Input
                      id="citation_count"
                      name="citation_count"
                      type="number"
                      value={formData.citation_count}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="download_count">Download Count</Label>
                    <Input
                      id="download_count"
                      name="download_count"
                      type="number"
                      value={formData.download_count}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="like_count">Like Count</Label>
                    <Input
                      id="like_count"
                      name="like_count"
                      type="number"
                      value={formData.like_count}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="reshare_count">Reshare Count</Label>
                    <Input
                      id="reshare_count"
                      name="reshare_count"
                      type="number"
                      value={formData.reshare_count}
                      onChange={handleInputChange}
                    />
                  </div>
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

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Media Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            accept="image/*"
                            name="thumbnail"
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
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">
                            Selected: {selectedThumbnail.name} ({(selectedThumbnail.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Supported formats: JPEG, PNG, GIF, WebP (Max: 10MB)
                          </p>
                          <div className="w-20 h-20 border border-border overflow-hidden">
                            <img
                              src={URL.createObjectURL(selectedThumbnail)}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">Publication Document</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="download_url"
                          name="download_url"
                          value={formData.download_url}
                          onChange={handleInputChange}
                          placeholder="Document URL or upload file"
                        />
                        <div className="relative">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            name="document"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Document
                          </Button>
                        </div>
                      </div>
                      {selectedDocument && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Selected: {selectedDocument.name} ({(selectedDocument.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: PDF, DOC, DOCX (Max: 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="view_url">View URL</Label>
                    <Input
                      id="view_url"
                      name="view_url"
                      value={formData.view_url}
                      onChange={handleInputChange}
                      placeholder="Auto-populated when document is uploaded, or enter custom URL"
                    />
                    <p className="text-xs text-muted-foreground">
                      When you upload a document above, this field will be automatically filled with the document URL for preview.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={uploading} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {uploading ? 'Saving...' : (editingId === 'new' ? 'Create Publication' : 'Update Publication')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} disabled={uploading}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>

                {uploadProgress && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-700">{uploadProgress}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* Publications List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-4 flex items-center justify-center">
                  {publication.thumbnail ? (
                    <img
                      src={publication.thumbnail}
                      alt={publication.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-lg">{publication.title}</CardTitle>
                <CardDescription>
                  {publication.category} • {publication.authors?.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {publication.abstract}
                </p>

                {publication.tags && publication.tags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {publication.tags.slice(0, 3).map((tag, index) => (
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
                    onClick={() => handleEdit(publication)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(publication.id)}
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

        {publications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No research publications found. Add your first publication!</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  publish_date: string;
  read_time: number;
  category: string;
  tags: string[];
  created_at: string;
}

export default function ManageBlogs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "",
    publish_date: "",
    read_time: "",
    category: "",
    tags: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchBlogs();
  }, [user, navigate]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        if (error.code === 'PGRST116') {
          alert('The blogs table does not exist. Please run the database setup script.');
        }
      } else {
        setBlogs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setBlogs([]);
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
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blogs')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('blogs')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.featured_image;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: imageUrl,
        author: formData.author,
        publish_date: formData.publish_date ? new Date(formData.publish_date).toISOString() : null,
        read_time: formData.read_time ? parseInt(formData.read_time) : null,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (editingId) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featured_image: blog.featured_image,
      author: blog.author,
      publish_date: blog.publish_date ? new Date(blog.publish_date).toISOString().split('T')[0] : "",
      read_time: blog.read_time?.toString() || "",
      category: blog.category,
      tags: blog.tags?.join(', ') || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      author: "",
      publish_date: "",
      read_time: "",
      category: "",
      tags: ""
    });
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-gray-600 mt-1">Manage and organize your blog content</p>
            </div>
            <Button
              onClick={() => setEditingId('new')}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Blog Post
            </Button>
          </div>
        </div>

        {/* Form Section */}
        {(editingId === 'new' || editingId) && (
          <Card className="mb-8 border-0 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl text-gray-900">
                {editingId === 'new' ? 'Add New Blog Post' : 'Edit Blog Post'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {editingId === 'new' ? 'Create a new blog post with all necessary details' : 'Update the blog post information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter blog post title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug *</Label>
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
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={8}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <Label htmlFor="read_time">Read Time (minutes)</Label>
                    <Input
                      id="read_time"
                      name="read_time"
                      type="number"
                      value={formData.read_time}
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
                  <Label htmlFor="featured_image">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="featured_image"
                      name="featured_image"
                      value={formData.featured_image}
                      onChange={handleInputChange}
                      placeholder="Image URL or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    {editingId === 'new' ? 'Create Blog Post' : 'Update Blog Post'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blogs List */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Blog Posts</h2>
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Get started by creating your first blog post</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="border border-gray-200 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="w-full h-32 bg-gray-100 mb-3 flex items-center justify-center overflow-hidden">
                      {blog.featured_image ? (
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl">📝</div>
                      )}
                    </div>
                    <CardTitle className="text-lg text-gray-900 line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {blog.category} • {blog.author} • {blog.read_time} min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                        className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
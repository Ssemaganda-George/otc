import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable, Column } from "@/components/ui/data-table";
import { ModalForm } from "@/components/ui/modal-form";
import { useCrud } from "@/hooks/useCrud";
import { useBulkOperations } from "@/hooks/useBulkOperations";
import { newsUpdateSchema } from "@/lib/schemas";
import { Plus, Edit, Trash2, Download, Heart, Share, Star } from "lucide-react";

interface NewsUpdate {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  pdf_url: string;
  gallery_images: string[];
  publish_date: string;
  is_featured: boolean;
  category: string;
  tags: string[];
  display_order: number;
  download_count: number;
  like_count: number;
  reshare_count: number;
  created_at: string;
}

const categories = [
  "ANNOUNCEMENT",
  "EVENT", 
  "NEWS",
  "POLICY BRIEF",
  "REPORT",
  "UPDATE"
];

export default function ManageNewsUpdates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NewsUpdate | null>(null);

  // Use CRUD hook
  const {
    data: news,
    loading,
    create,
    update,
    remove,
    fetchAll
  } = useCrud<NewsUpdate>({
    table: 'news_updates'
  });

  // Use bulk operations hook
  const {
    selectedIds,
    isProcessing: bulkProcessing,
    toggleSelection,
    clearSelection,
    bulkDelete
  } = useBulkOperations({
    table: 'news_updates',
    onSuccess: () => fetchAll()
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAll('display_order', false);
  }, [user, navigate, fetchAll]);

  const handleCreate = async (data: any) => {
    const formattedData = {
      ...data,
      gallery_images: data.gallery_images ? data.gallery_images.split(',').map((s: string) => s.trim()) : [],
      tags: data.tags ? data.tags.split(',').map((s: string) => s.trim()) : [],
      display_order: parseInt(data.display_order) || 0
    };
    await create(formattedData);
    setShowCreateModal(false);
  };

  const handleEdit = async (data: any) => {
    if (!selectedItem) return;
    const formattedData = {
      ...data,
      gallery_images: data.gallery_images ? data.gallery_images.split(',').map((s: string) => s.trim()) : [],
      tags: data.tags ? data.tags.split(',').map((s: string) => s.trim()) : [],
      display_order: parseInt(data.display_order) || 0
    };
    await update(selectedItem.id, formattedData);
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    await remove(selectedItem.id);
    setShowDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleBulkDelete = async () => {
    await bulkDelete();
  };

  const openEditModal = (item: NewsUpdate) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const openDeleteDialog = (item: NewsUpdate) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  const columns: Column<NewsUpdate>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (value, item) => (
        <div className="max-w-xs">
          <div className="font-medium truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.excerpt}</div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (value) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    {
      key: 'is_featured',
      header: 'Featured',
      sortable: true,
      render: (value) => value ? <Star className="w-4 h-4 text-yellow-500" /> : null
    },
    {
      key: 'publish_date',
      header: 'Published',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'download_count',
      header: 'Stats',
      render: (_, item) => (
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Download className="w-3 h-3 mr-1" />
            {item.download_count}
          </div>
          <div className="flex items-center">
            <Heart className="w-3 h-3 mr-1" />
            {item.like_count}
          </div>
          <div className="flex items-center">
            <Share className="w-3 h-3 mr-1" />
            {item.reshare_count}
          </div>
        </div>
      )
    }
  ];

  const renderForm = (form: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...form.register('title')}
            placeholder="Enter news title"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...form.register('slug')}
            placeholder="url-friendly-slug"
          />
          {form.formState.errors.slug && (
            <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          {...form.register('excerpt')}
          placeholder="Brief description"
          rows={3}
        />
        {form.formState.errors.excerpt && (
          <p className="text-sm text-red-600">{form.formState.errors.excerpt.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          {...form.register('content')}
          placeholder="Full content"
          rows={6}
        />
        {form.formState.errors.content && (
          <p className="text-sm text-red-600">{form.formState.errors.content.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select onValueChange={(value) => form.setValue('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.category && (
            <p className="text-sm text-red-600">{form.formState.errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="publish_date">Publish Date *</Label>
          <Input
            id="publish_date"
            type="date"
            {...form.register('publish_date')}
          />
          {form.formState.errors.publish_date && (
            <p className="text-sm text-red-600">{form.formState.errors.publish_date.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="featured_image">Featured Image URL</Label>
          <Input
            id="featured_image"
            {...form.register('featured_image')}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdf_url">PDF URL</Label>
          <Input
            id="pdf_url"
            {...form.register('pdf_url')}
            placeholder="https://example.com/document.pdf"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          {...form.register('tags')}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gallery_images">Gallery Images (comma-separated URLs)</Label>
        <Textarea
          id="gallery_images"
          {...form.register('gallery_images')}
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          rows={2}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_featured"
            {...form.register('is_featured')}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            {...form.register('display_order')}
            placeholder="0"
            className="w-20"
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage News Updates</h1>
          <p className="text-gray-600">Create and manage news articles, announcements, and updates</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkProcessing}
            >
              Delete Selected ({selectedIds.length})
            </Button>
          )}
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add News Update
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Updates</CardTitle>
          <CardDescription>
            {news.length} news update{news.length !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={news}
            columns={columns}
            loading={loading}
            selectable={true}
            selectedIds={selectedIds}
            onSelectionChange={(ids) => {
              clearSelection();
              ids.forEach(id => toggleSelection(id));
            }}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
            searchPlaceholder="Search news updates..."
            emptyMessage="No news updates found"
          />
        </CardContent>
      </Card>

      {/* Create Modal */}
      <ModalForm
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        title="Create News Update"
        description="Add a new news article or announcement"
        schema={newsUpdateSchema}
        onSubmit={handleCreate}
        size="xl"
      >
        {renderForm}
      </ModalForm>

      {/* Edit Modal */}
      <ModalForm
        open={showEditModal}
        onOpenChange={setShowEditModal}
        title="Edit News Update"
        description="Modify the news article details"
        schema={newsUpdateSchema}
        defaultValues={selectedItem ? {
          ...selectedItem,
          gallery_images: selectedItem.gallery_images?.join(', ') || '',
          tags: selectedItem.tags?.join(', ') || ''
        } : undefined}
        onSubmit={handleEdit}
        size="xl"
      >
        {renderForm}
      </ModalForm>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete News Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

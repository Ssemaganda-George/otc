import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import {
  Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff,
  Music, Disc, Film, Palette, Globe, Network, Play, Sparkles,
  Image as ImageIcon, Video, Clapperboard, Images, Layout,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Music, Disc, Film, Palette, Globe, Network, Play, Sparkles, Clapperboard, Images, Video,
};

const uploadImage = async (file: File, folder: string): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}-${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage.from("otc-media").upload(filePath, file);
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("otc-media").getPublicUrl(filePath);
  return data.publicUrl;
};

/* ------------------------------------------------------------------ */
/* Page Content (hero, why we exist, connection, CTA)                  */
/* ------------------------------------------------------------------ */

interface MediaPageContent {
  id: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  hero_image: string;
  why_we_exist: string;
  connection_text: string;
  cta_title: string;
  cta_subtitle: string;
}

function PageContentTab() {
  const [content, setContent] = useState<MediaPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    hero_eyebrow: "",
    hero_title: "",
    hero_intro: "",
    hero_image: "",
    why_we_exist: "",
    connection_text: "",
    cta_title: "",
    cta_subtitle: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("media_page_content")
        .select("*")
        .limit(1);
      if (error) throw error;
      if (data && data.length > 0) {
        setContent(data[0]);
        setForm({
          hero_eyebrow: data[0].hero_eyebrow || "",
          hero_title: data[0].hero_title || "",
          hero_intro: data[0].hero_intro || "",
          hero_image: data[0].hero_image || "",
          why_we_exist: data[0].why_we_exist || "",
          connection_text: data[0].connection_text || "",
          cta_title: data[0].cta_title || "",
          cta_subtitle: data[0].cta_subtitle || "",
        });
      }
    } catch (error) {
      console.error("Error fetching media page content:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let hero_image = form.hero_image;
      if (selectedImage) {
        hero_image = await uploadImage(selectedImage, "hero");
      }
      const payload = { ...form, hero_image };
      if (content) {
        const { error } = await supabase
          .from("media_page_content")
          .update(payload)
          .eq("id", content.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("media_page_content").insert([payload]);
        if (error) throw error;
      }
      setSelectedImage(null);
      fetchContent();
      alert("Media page content saved!");
    } catch (error) {
      console.error("Error saving media page content:", error);
      alert("Error saving. Please try again.");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8">Loading page content...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Page Content</CardTitle>
        <CardDescription>
          Hero (eyebrow, title, intro, background image), Why We Exist, Connection text and CTA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hero_eyebrow">Hero Eyebrow</Label>
            <Input id="hero_eyebrow" name="hero_eyebrow" value={form.hero_eyebrow} onChange={handleChange} placeholder="OTC Media Hub" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input id="hero_title" name="hero_title" value={form.hero_title} onChange={handleChange} placeholder="Creating. Telling. Entertaining. Inspiring." />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_intro">Hero Intro</Label>
          <Textarea id="hero_intro" name="hero_intro" value={form.hero_intro} onChange={handleChange} rows={4} placeholder="OTC Media is the creative and storytelling ecosystem of OTC..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_image">Hero Background Image</Label>
          <div className="flex items-center gap-4">
            <Input id="hero_image" name="hero_image" value={form.hero_image} onChange={handleChange} placeholder="Image URL or upload file" />
            <div className="relative">
              <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Image
              </Button>
            </div>
          </div>
          {selectedImage && <p className="text-sm text-muted-foreground">Selected: {selectedImage.name}</p>}
          {form.hero_image && !selectedImage && (
            <img src={form.hero_image} alt="Hero preview" className="mt-2 max-h-40 rounded-lg object-cover" />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="why_we_exist">Why We Exist</Label>
          <Textarea id="why_we_exist" name="why_we_exist" value={form.why_we_exist} onChange={handleChange} rows={4} placeholder="Ideas, talent and innovation need strong stories..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="connection_text">How This Product Connects to OTC</Label>
          <Textarea id="connection_text" name="connection_text" value={form.connection_text} onChange={handleChange} rows={4} placeholder="OTC Media amplifies research and innovation..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cta_title">CTA Title</Label>
            <Input id="cta_title" name="cta_title" value={form.cta_title} onChange={handleChange} placeholder="Ready to tell your story?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_subtitle">CTA Subtitle</Label>
            <Input id="cta_subtitle" name="cta_subtitle" value={form.cta_subtitle} onChange={handleChange} placeholder="Whether it's music, film, art..." />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Page Content"}
        </Button>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Image Gallery                                                       */
/* ------------------------------------------------------------------ */

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

function GalleryTab() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [form, setForm] = useState({ image_url: "", alt_text: "", display_order: "0", is_active: true });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("media_gallery_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let image_url = form.image_url;
      if (selectedImage) {
        image_url = await uploadImage(selectedImage, "gallery");
      }
      if (!image_url) {
        alert("Please provide an image URL or upload an image.");
        return;
      }
      const payload = {
        image_url,
        alt_text: form.alt_text || null,
        display_order: form.display_order ? parseInt(form.display_order) : 0,
        is_active: form.is_active,
      };
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("media_gallery_images").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("media_gallery_images").insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving gallery image:", error);
      alert("Error saving. Please try again.");
    }
  };

  const handleEdit = (item: GalleryImage) => {
    setEditingId(item.id);
    setForm({
      image_url: item.image_url,
      alt_text: item.alt_text || "",
      display_order: item.display_order?.toString() || "0",
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    try {
      const { error } = await supabase.from("media_gallery_images").delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      alert("Error deleting. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ image_url: "", alt_text: "", display_order: "0", is_active: true });
    setSelectedImage(null);
  };

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;

  return (
    <div className="space-y-8">
      {(editingId === "new" || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Gallery Image" : "Edit Gallery Image"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <div className="flex items-center gap-4">
                <Input id="image_url" name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL or upload file" />
                <div className="relative">
                  <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Image
                  </Button>
                </div>
              </div>
              {selectedImage && <p className="text-sm text-muted-foreground">Selected: {selectedImage.name}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input id="alt_text" name="alt_text" value={form.alt_text} onChange={handleChange} placeholder="OTC Media creative production" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" value={form.display_order} onChange={handleChange} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
              <Label htmlFor="is_active">Active</Label>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId === "new" ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-full h-40 bg-accent-light rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.alt_text || "Gallery image"} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-lg">{item.alt_text || "Gallery Image"}</CardTitle>
              <CardDescription>
                Order: {item.display_order}
                {item.is_active ? <Eye className="inline w-4 h-4 ml-2 text-green-500" /> : <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No gallery images found. Add your first image!</div>}

      {editingId === null && (
        <Button onClick={() => setEditingId("new")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Gallery Image
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Video Content                                                       */
/* ------------------------------------------------------------------ */

interface MediaVideo {
  id: string;
  title: string;
  thumbnail_url: string;
  category: string;
  duration: string;
  video_url: string;
  display_order: number;
  is_active: boolean;
}

function VideosTab() {
  const [items, setItems] = useState<MediaVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", thumbnail_url: "", category: "", duration: "", video_url: "", display_order: "0", is_active: true });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("media_videos")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let thumbnail_url = form.thumbnail_url;
      if (selectedImage) {
        thumbnail_url = await uploadImage(selectedImage, "videos");
      }
      if (!thumbnail_url) {
        alert("Please provide a thumbnail URL or upload an image.");
        return;
      }
      if (!form.title.trim()) {
        alert("Please provide a video title.");
        return;
      }
      const payload = {
        title: form.title,
        thumbnail_url,
        category: form.category || null,
        duration: form.duration || null,
        video_url: form.video_url || null,
        display_order: form.display_order ? parseInt(form.display_order) : 0,
        is_active: form.is_active,
      };
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("media_videos").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("media_videos").insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Error saving. Please try again.");
    }
  };

  const handleEdit = (item: MediaVideo) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      thumbnail_url: item.thumbnail_url,
      category: item.category || "",
      duration: item.duration || "",
      video_url: item.video_url || "",
      display_order: item.display_order?.toString() || "0",
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const { error } = await supabase.from("media_videos").delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", thumbnail_url: "", category: "", duration: "", video_url: "", display_order: "0", is_active: true });
    setSelectedImage(null);
  };

  if (loading) return <div className="text-center py-8">Loading videos...</div>;

  return (
    <div className="space-y-8">
      {(editingId === "new" || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Video" : "Edit Video"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Data Justice Stories" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail Image</Label>
              <div className="flex items-center gap-4">
                <Input id="thumbnail_url" name="thumbnail_url" value={form.thumbnail_url} onChange={handleChange} placeholder="Thumbnail URL or upload file" />
                <div className="relative">
                  <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Thumbnail
                  </Button>
                </div>
              </div>
              {selectedImage && <p className="text-sm text-muted-foreground">Selected: {selectedImage.name}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Documentary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" value={form.duration} onChange={handleChange} placeholder="3:45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL (optional)</Label>
                <Input id="video_url" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://youtube.com/..." />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" value={form.display_order} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId === "new" ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="relative w-full h-40 bg-accent-light rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <Video className="w-8 h-8 text-primary" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-primary">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>
                {item.category || "Video"} • {item.duration || "--:--"} • Order: {item.display_order}
                {item.is_active ? <Eye className="inline w-4 h-4 ml-2 text-green-500" /> : <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No videos found. Add your first video!</div>}

      {editingId === null && (
        <Button onClick={() => setEditingId("new")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Video
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* What We Do                                                          */
/* ------------------------------------------------------------------ */

interface WhatWeDoItem {
  id: string;
  icon_name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

function WhatWeDoTab() {
  const [items, setItems] = useState<WhatWeDoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ icon_name: "Music", description: "", display_order: "0", is_active: true });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("media_what_we_do")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching what we do items:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.description.trim()) {
        alert("Please provide a description.");
        return;
      }
      const payload = {
        icon_name: form.icon_name,
        description: form.description,
        display_order: form.display_order ? parseInt(form.display_order) : 0,
        is_active: form.is_active,
      };
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("media_what_we_do").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("media_what_we_do").insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving what we do item:", error);
      alert("Error saving. Please try again.");
    }
  };

  const handleEdit = (item: WhatWeDoItem) => {
    setEditingId(item.id);
    setForm({
      icon_name: item.icon_name || "Music",
      description: item.description,
      display_order: item.display_order?.toString() || "0",
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase.from("media_what_we_do").delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Error deleting what we do item:", error);
      alert("Error deleting. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ icon_name: "Music", description: "", display_order: "0", is_active: true });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-8">
      {(editingId === "new" || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add What We Do Item" : "Edit What We Do Item"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="icon_name">Icon</Label>
              <select
                id="icon_name"
                name="icon_name"
                value={form.icon_name}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {Object.keys(ICON_MAP).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {(() => {
                const Icon = ICON_MAP[form.icon_name] || Music;
                return (
                  <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center text-primary mt-2">
                    <Icon className="w-8 h-8" />
                  </div>
                );
              })()}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Produce music, audio, podcasts..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" value={form.display_order} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId === "new" ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon_name] || Music;
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg">{item.icon_name || "Icon"}</CardTitle>
                <CardDescription>
                  Order: {item.display_order}
                  {item.is_active ? <Eye className="inline w-4 h-4 ml-2 text-green-500" /> : <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No items found. Add your first What We Do item!</div>}

      {editingId === null && (
        <Button onClick={() => setEditingId("new")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add What We Do Item
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Explore Bars (with image + description)                             */
/* ------------------------------------------------------------------ */

interface ExploreBar {
  id: string;
  name: string;
  href: string;
  image_url: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

function ExploreBarsTab() {
  const [items, setItems] = useState<ExploreBar[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", href: "", image_url: "", description: "", display_order: "0", is_active: true });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("media_explore_bars")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching explore bars:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.trim() || !form.href.trim()) {
        alert("Please provide a name and link (href).");
        return;
      }
      let image_url = form.image_url;
      if (selectedImage) {
        image_url = await uploadImage(selectedImage, "explore");
      }
      const payload = {
        name: form.name,
        href: form.href,
        image_url: image_url || null,
        description: form.description || null,
        display_order: form.display_order ? parseInt(form.display_order) : 0,
        is_active: form.is_active,
      };
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("media_explore_bars").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("media_explore_bars").insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving explore bar:", error);
      alert("Error saving. Please try again.");
    }
  };

  const handleEdit = (item: ExploreBar) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      href: item.href,
      image_url: item.image_url || "",
      description: item.description || "",
      display_order: item.display_order?.toString() || "0",
      is_active: item.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this explore bar?")) return;
    try {
      const { error } = await supabase.from("media_explore_bars").delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Error deleting explore bar:", error);
      alert("Error deleting. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", href: "", image_url: "", description: "", display_order: "0", is_active: true });
    setSelectedImage(null);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-8">
      {(editingId === "new" || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Explore Bar" : "Edit Explore Bar"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Campaign Development" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="href">Link (href)</Label>
                <Input id="href" name="href" value={form.href} onChange={handleChange} placeholder="/media/campaign-development" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Creative campaigns that use art and digital media..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Card Image</Label>
              <div className="flex items-center gap-4">
                <Input id="image_url" name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL or upload file" />
                <div className="relative">
                  <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Image
                  </Button>
                </div>
              </div>
              {selectedImage && <p className="text-sm text-muted-foreground">Selected: {selectedImage.name}</p>}
              {form.image_url && !selectedImage && (
                <img src={form.image_url} alt="Preview" className="mt-2 max-h-40 rounded-lg object-cover" />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" value={form.display_order} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId === "new" ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="w-full h-40 bg-accent-light overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>
                {item.href} • Order: {item.display_order}
                {item.is_active ? <Eye className="inline w-4 h-4 ml-2 text-green-500" /> : <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No explore bars found. Add your first explore bar!</div>}

      {editingId === null && (
        <Button onClick={() => setEditingId("new")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Explore Bar
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Simple list tabs (focus areas, how we work)                   */
/* ------------------------------------------------------------------ */

function SimpleListTab({
  table,
  label,
  fields,
  renderItem,
}: {
  table: string;
  label: string;
  fields: { name: string; placeholder: string; label: string }[];
  renderItem: (item: any) => string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchItems();
  }, [table]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error(`Error fetching ${table}:`, error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload: Record<string, any> = {
        display_order: form.display_order ? parseInt(form.display_order) : 0,
        is_active: form.is_active !== "false",
      };
      for (const f of fields) {
        payload[f.name] = form[f.name] || "";
      }
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from(table).update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([payload]);
        if (error) throw error;
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error(`Error saving ${table}:`, error);
      alert("Error saving. Please try again.");
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    const next: Record<string, string> = {
      display_order: item.display_order?.toString() || "0",
      is_active: item.is_active ? "true" : "false",
    };
    for (const f of fields) {
      next[f.name] = item[f.name] || "";
    }
    setForm(next);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${label} item?`)) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error(`Error deleting ${table}:`, error);
      alert("Error deleting. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    const next: Record<string, string> = { display_order: "0", is_active: "true" };
    for (const f of fields) {
      next[f.name] = "";
    }
    setForm(next);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-8">
      {(editingId === "new" || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === "new" ? `Add ${label}` : `Edit ${label}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <Label htmlFor={f.name}>{f.label}</Label>
                <Input id={f.name} name={f.name} value={form[f.name] || ""} onChange={handleChange} placeholder={f.placeholder} />
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" value={form.display_order || "0"} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active !== "false"}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked ? "true" : "false" })}
                  className="rounded"
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId === "new" ? "Create" : "Update"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{renderItem(item)}</CardTitle>
              <CardDescription>
                Order: {item.display_order}
                {item.is_active ? <Eye className="inline w-4 h-4 ml-2 text-green-500" /> : <EyeOff className="inline w-4 h-4 ml-2 text-gray-400" />}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No items found. Add your first {label.toLowerCase()} item!</div>}

      {editingId === null && (
        <Button onClick={() => setEditingId("new")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add {label}
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

export default function ManageOtcMedia() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">OTC Media</h1>
          <p className="text-muted-foreground">
            Manage all content sections of the OTC Media Hub page (/media)
          </p>
        </div>

        <Tabs defaultValue="page-content" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 h-auto p-2">
            <TabsTrigger value="page-content" className="flex items-center gap-2">
              <Layout className="w-4 h-4" /> Page Content
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="w-4 h-4" /> Image Gallery
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Clapperboard className="w-4 h-4" /> Video Content
            </TabsTrigger>
            <TabsTrigger value="what-we-do" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> What We Do
            </TabsTrigger>
            <TabsTrigger value="focus-areas" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Areas of Focus
            </TabsTrigger>
            <TabsTrigger value="how-we-work" className="flex items-center gap-2">
              <Music className="w-4 h-4" /> How We Work
            </TabsTrigger>
            <TabsTrigger value="explore-bars" className="flex items-center gap-2">
              <Disc className="w-4 h-4" /> Explore Bars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="page-content">
            <PageContentTab />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryTab />
          </TabsContent>

          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>

          <TabsContent value="what-we-do">
            <WhatWeDoTab />
          </TabsContent>

          <TabsContent value="focus-areas">
            <SimpleListTab
              table="media_areas_of_focus"
              label="Focus Area"
              fields={[{ name: "label", label: "Label", placeholder: "Music and audio production" }]}
              renderItem={(item) => item.label}
            />
          </TabsContent>

          <TabsContent value="how-we-work">
            <SimpleListTab
              table="media_how_we_work"
              label="Step"
              fields={[{ name: "step", label: "Step", placeholder: "CREATE" }]}
              renderItem={(item) => item.step}
            />
          </TabsContent>

          <TabsContent value="explore-bars">
            <ExploreBarsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

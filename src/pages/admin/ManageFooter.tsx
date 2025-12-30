import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Save, Upload } from "lucide-react";

interface Footer {
  id: string;
  organization_name: string;
  organization_description: string;
  logo: string;
  social_media_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  quick_links: string[];
  services_links: string[];
  contact_info: {
    address?: string;
    phone?: string;
    email?: string;
  };
  newsletter_title: string;
  newsletter_description: string;
  copyright_text: string;
}

export default function ManageFooter() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [footer, setFooter] = useState<Footer | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    organization_name: "OneTechConnect",
    organization_description: "",
    logo: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    quick_links: "",
    services_links: "",
    address: "",
    phone: "",
    email: "",
    newsletter_title: "Stay Updated",
    newsletter_description: "",
    copyright_text: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchFooter();
  }, [user, navigate]);

  const fetchFooter = async () => {
    try {
      const { data, error } = await supabase
        .from('footer')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching footer:', error);
      } else if (data) {
        setFooter(data);
        setFormData({
          organization_name: data.organization_name || "OneTechConnect",
          organization_description: data.organization_description || "",
          logo: data.logo || "",
          facebook: data.social_media_links?.facebook || "",
          twitter: data.social_media_links?.twitter || "",
          linkedin: data.social_media_links?.linkedin || "",
          instagram: data.social_media_links?.instagram || "",
          quick_links: data.quick_links?.join('\n') || "",
          services_links: data.services_links?.join('\n') || "",
          address: data.contact_info?.address || "",
          phone: data.contact_info?.phone || "",
          email: data.contact_info?.email || "",
          newsletter_title: data.newsletter_title || "Stay Updated",
          newsletter_description: data.newsletter_description || "",
          copyright_text: data.copyright_text || ""
        });
      }
    } catch (error) {
      console.error('Error:', error);
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
      setSelectedLogo(file);
    }
  };

  const uploadLogo = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let logoUrl = formData.logo;

      if (selectedLogo) {
        logoUrl = await uploadLogo(selectedLogo);
      }

      const footerData = {
        organization_name: formData.organization_name,
        organization_description: formData.organization_description,
        logo: logoUrl,
        social_media_links: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          instagram: formData.instagram
        },
        quick_links: formData.quick_links ? formData.quick_links.split('\n').filter(link => link.trim()) : [],
        services_links: formData.services_links ? formData.services_links.split('\n').filter(link => link.trim()) : [],
        contact_info: {
          address: formData.address,
          phone: formData.phone,
          email: formData.email
        },
        newsletter_title: formData.newsletter_title,
        newsletter_description: formData.newsletter_description,
        copyright_text: formData.copyright_text
      };

      if (footer) {
        const { error } = await supabase
          .from('footer')
          .update(footerData)
          .eq('id', footer.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('footer')
          .insert([footerData]);

        if (error) throw error;
      }

      fetchFooter();
      alert('Footer information saved successfully!');
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Error saving footer information. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading footer information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Footer</h1>
            <p className="text-muted-foreground">Configure footer content and links</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Footer Configuration</CardTitle>
            <CardDescription>
              Set up the footer content, links, and social media
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organization_name">Organization Name</Label>
                  <Input
                    id="organization_name"
                    name="organization_name"
                    value={formData.organization_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletter_title">Newsletter Title</Label>
                  <Input
                    id="newsletter_title"
                    name="newsletter_title"
                    value={formData.newsletter_title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization_description">Organization Description</Label>
                <Textarea
                  id="organization_description"
                  name="organization_description"
                  value={formData.organization_description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter_description">Newsletter Description</Label>
                <Textarea
                  id="newsletter_description"
                  name="newsletter_description"
                  value={formData.newsletter_description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyright_text">Copyright Text</Label>
                <Input
                  id="copyright_text"
                  name="copyright_text"
                  value={formData.copyright_text}
                  onChange={handleInputChange}
                  placeholder="© 2024 OneTechConnect. All rights reserved."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Organization Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="Logo URL or upload file"
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
                      Upload Logo
                    </Button>
                  </div>
                </div>
                {selectedLogo && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedLogo.name}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/page"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/company/page"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quick_links">Quick Links (one per line)</Label>
                    <Textarea
                      id="quick_links"
                      name="quick_links"
                      value={formData.quick_links}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="About Us&#10;Contact&#10;Privacy Policy"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="services_links">Services Links (one per line)</Label>
                    <Textarea
                      id="services_links"
                      name="services_links"
                      value={formData.services_links}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Strategic Litigation&#10;Digital Justice&#10;Consultancy"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Footer Configuration
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
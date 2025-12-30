import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Save, MapPin, Phone, Mail, Globe, Clock } from "lucide-react";

interface ContactInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  social_media: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  office_hours: string;
}

export default function ManageContactInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    office_hours: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchContactInfo();
  }, [user, navigate]);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching contact info:', error);
      } else if (data) {
        setContactInfo(data);
        setFormData({
          title: data.title || "Contact Us",
          subtitle: data.subtitle || "Get in touch with our team",
          description: data.description || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          facebook: data.social_media?.facebook || "",
          twitter: data.social_media?.twitter || "",
          linkedin: data.social_media?.linkedin || "",
          instagram: data.social_media?.instagram || "",
          office_hours: data.office_hours || ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contactData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        social_media: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          instagram: formData.instagram
        },
        office_hours: formData.office_hours
      };

      if (contactInfo) {
        const { error } = await supabase
          .from('contact_info')
          .update(contactData)
          .eq('id', contactInfo.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([contactData]);

        if (error) throw error;
      }

      fetchContactInfo();
      alert('Contact information saved successfully!');
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Error saving contact information. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading contact information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Contact Information</h1>
            <p className="text-muted-foreground">Update contact details and social media links</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Configure the contact information displayed on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Page Subtitle</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Address & Contact Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office_hours" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Office Hours
                  </Label>
                  <Textarea
                    id="office_hours"
                    name="office_hours"
                    value={formData.office_hours}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g., Monday-Friday: 9AM-5PM"
                  />
                </div>
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
                      placeholder="https://facebook.com/username"
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
                      placeholder="https://linkedin.com/company/username"
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

              <div className="flex gap-4">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Contact Information
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
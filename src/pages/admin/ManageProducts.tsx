import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Scale, Lightbulb, Shield, Briefcase } from "lucide-react";

interface StrategicLitigationCase {
  id: string;
  case_number: number;
  case_name: string;
  issues: string;
  country: string;
  year_filed: string;
  status: string;
  status_type: string;
  display_order: number;
}

interface InnovationInitiative {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  is_coming_soon: boolean;
  display_order: number;
}

interface DigitalJusticeService {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  features: string[];
  display_order: number;
}

interface ConsultancyService {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  service_type: string;
  features: string[];
  pricing_info: string;
  contact_info: string;
  display_order: number;
}

export default function ManageProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for Strategic Litigation Cases
  const [litigationCases, setLitigationCases] = useState<StrategicLitigationCase[]>([]);
  const [editingLitigationId, setEditingLitigationId] = useState<string | null>(null);
  const [litigationFormData, setLitigationFormData] = useState({
    case_number: 0,
    case_name: "",
    issues: "",
    country: "",
    year_filed: "",
    status: "",
    status_type: "pending"
  });

  // State for Innovation Hub Initiatives
  const [innovationInitiatives, setInnovationInitiatives] = useState<InnovationInitiative[]>([]);
  const [editingInnovationId, setEditingInnovationId] = useState<string | null>(null);
  const [innovationFormData, setInnovationFormData] = useState({
    title: "",
    description: "",
    icon_name: "Lightbulb",
    is_coming_soon: false
  });

  // State for Digital Justice Services
  const [digitalJusticeServices, setDigitalJusticeServices] = useState<DigitalJusticeService[]>([]);
  const [editingDigitalJusticeId, setEditingDigitalJusticeId] = useState<string | null>(null);
  const [digitalJusticeFormData, setDigitalJusticeFormData] = useState({
    title: "",
    description: "",
    icon_name: "Shield",
    features: [] as string[]
  });
  const [newFeature, setNewFeature] = useState("");

  // State for Consultancy Services
  const [consultancyServices, setConsultancyServices] = useState<ConsultancyService[]>([]);
  const [editingConsultancyId, setEditingConsultancyId] = useState<string | null>(null);
  const [consultancyFormData, setConsultancyFormData] = useState({
    title: "",
    description: "",
    icon_name: "Briefcase",
    service_type: "training",
    features: [] as string[],
    pricing_info: "",
    contact_info: ""
  });
  const [newConsultancyFeature, setNewConsultancyFeature] = useState("");

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("litigation");

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [user, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchLitigationCases(),
      fetchInnovationInitiatives(),
      fetchDigitalJusticeServices(),
      fetchConsultancyServices()
    ]);
    setLoading(false);
  };

  // Strategic Litigation Cases CRUD
  const fetchLitigationCases = async () => {
    const { data, error } = await supabase
      .from('strategic_litigation_cases')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching litigation cases:', error);
    else setLitigationCases(data || []);
  };

  const handleLitigationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...litigationFormData };
    if (editingLitigationId) {
      await supabase.from('strategic_litigation_cases').update(data).eq('id', editingLitigationId);
    } else {
      await supabase.from('strategic_litigation_cases').insert([data]);
    }
    resetLitigationForm();
    fetchLitigationCases();
  };

  const handleLitigationEdit = (case_: StrategicLitigationCase) => {
    setEditingLitigationId(case_.id);
    setLitigationFormData({
      case_number: case_.case_number,
      case_name: case_.case_name,
      issues: case_.issues,
      country: case_.country,
      year_filed: case_.year_filed,
      status: case_.status,
      status_type: case_.status_type
    });
  };

  const handleLitigationDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this litigation case?')) {
      await supabase.from('strategic_litigation_cases').delete().eq('id', id);
      fetchLitigationCases();
    }
  };

  const resetLitigationForm = () => {
    setEditingLitigationId(null);
    setLitigationFormData({
      case_number: 0,
      case_name: "",
      issues: "",
      country: "",
      year_filed: "",
      status: "",
      status_type: "pending"
    });
  };

  // Innovation Hub Initiatives CRUD
  const fetchInnovationInitiatives = async () => {
    const { data, error } = await supabase
      .from('innovation_hub_initiatives')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching innovation initiatives:', error);
    else setInnovationInitiatives(data || []);
  };

  const handleInnovationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...innovationFormData };
    if (editingInnovationId) {
      await supabase.from('innovation_hub_initiatives').update(data).eq('id', editingInnovationId);
    } else {
      await supabase.from('innovation_hub_initiatives').insert([data]);
    }
    resetInnovationForm();
    fetchInnovationInitiatives();
  };

  const handleInnovationEdit = (initiative: InnovationInitiative) => {
    setEditingInnovationId(initiative.id);
    setInnovationFormData({
      title: initiative.title,
      description: initiative.description,
      icon_name: initiative.icon_name,
      is_coming_soon: initiative.is_coming_soon
    });
  };

  const handleInnovationDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this innovation initiative?')) {
      await supabase.from('innovation_hub_initiatives').delete().eq('id', id);
      fetchInnovationInitiatives();
    }
  };

  const resetInnovationForm = () => {
    setEditingInnovationId(null);
    setInnovationFormData({
      title: "",
      description: "",
      icon_name: "Lightbulb",
      is_coming_soon: false
    });
  };

  // Digital Justice Services CRUD
  const fetchDigitalJusticeServices = async () => {
    const { data, error } = await supabase
      .from('digital_justice_services')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching digital justice services:', error);
    else setDigitalJusticeServices(data || []);
  };

  const handleDigitalJusticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...digitalJusticeFormData };
    if (editingDigitalJusticeId) {
      await supabase.from('digital_justice_services').update(data).eq('id', editingDigitalJusticeId);
    } else {
      await supabase.from('digital_justice_services').insert([data]);
    }
    resetDigitalJusticeForm();
    fetchDigitalJusticeServices();
  };

  const handleDigitalJusticeEdit = (service: DigitalJusticeService) => {
    setEditingDigitalJusticeId(service.id);
    setDigitalJusticeFormData({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      features: service.features || []
    });
  };

  const handleDigitalJusticeDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this digital justice service?')) {
      await supabase.from('digital_justice_services').delete().eq('id', id);
      fetchDigitalJusticeServices();
    }
  };

  const addDigitalJusticeFeature = () => {
    if (newFeature.trim()) {
      setDigitalJusticeFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeDigitalJusticeFeature = (index: number) => {
    setDigitalJusticeFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const resetDigitalJusticeForm = () => {
    setEditingDigitalJusticeId(null);
    setDigitalJusticeFormData({
      title: "",
      description: "",
      icon_name: "Shield",
      features: []
    });
    setNewFeature("");
  };

  // Consultancy Services CRUD
  const fetchConsultancyServices = async () => {
    const { data, error } = await supabase
      .from('consultancy_services')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching consultancy services:', error);
    else setConsultancyServices(data || []);
  };

  const handleConsultancySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...consultancyFormData };
    if (editingConsultancyId) {
      await supabase.from('consultancy_services').update(data).eq('id', editingConsultancyId);
    } else {
      await supabase.from('consultancy_services').insert([data]);
    }
    resetConsultancyForm();
    fetchConsultancyServices();
  };

  const handleConsultancyEdit = (service: ConsultancyService) => {
    setEditingConsultancyId(service.id);
    setConsultancyFormData({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      service_type: service.service_type,
      features: service.features || [],
      pricing_info: service.pricing_info,
      contact_info: service.contact_info
    });
  };

  const handleConsultancyDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this consultancy service?')) {
      await supabase.from('consultancy_services').delete().eq('id', id);
      fetchConsultancyServices();
    }
  };

  const addConsultancyFeature = () => {
    if (newConsultancyFeature.trim()) {
      setConsultancyFormData(prev => ({
        ...prev,
        features: [...prev.features, newConsultancyFeature.trim()]
      }));
      setNewConsultancyFeature("");
    }
  };

  const removeConsultancyFeature = (index: number) => {
    setConsultancyFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const resetConsultancyForm = () => {
    setEditingConsultancyId(null);
    setConsultancyFormData({
      title: "",
      description: "",
      icon_name: "Briefcase",
      service_type: "training",
      features: [],
      pricing_info: "",
      contact_info: ""
    });
    setNewConsultancyFeature("");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="litigation" className="flex items-center space-x-2">
              <Scale className="w-4 h-4" />
              <span>Strategic Litigation</span>
            </TabsTrigger>
            <TabsTrigger value="innovation" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Innovation Hub</span>
            </TabsTrigger>
            <TabsTrigger value="digital-justice" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Digital Justice</span>
            </TabsTrigger>
            <TabsTrigger value="consultancy" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Consultancy</span>
            </TabsTrigger>
          </TabsList>

          {/* Strategic Litigation Tab */}
          <TabsContent value="litigation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Strategic Litigation Cases</h2>
              <Button onClick={() => setEditingLitigationId('new')} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Case</span>
              </Button>
            </div>

            {(editingLitigationId === 'new' || editingLitigationId) && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingLitigationId === 'new' ? 'Add New Case' : 'Edit Case'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLitigationSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="case_number">Case Number</Label>
                        <Input
                          id="case_number"
                          type="number"
                          value={litigationFormData.case_number}
                          onChange={(e) => setLitigationFormData({ ...litigationFormData, case_number: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="status_type">Status Type</Label>
                        <Select value={litigationFormData.status_type} onValueChange={(value) => setLitigationFormData({ ...litigationFormData, status_type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="case_name">Case Name</Label>
                      <Input
                        id="case_name"
                        value={litigationFormData.case_name}
                        onChange={(e) => setLitigationFormData({ ...litigationFormData, case_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="issues">Issues</Label>
                      <Textarea
                        id="issues"
                        value={litigationFormData.issues}
                        onChange={(e) => setLitigationFormData({ ...litigationFormData, issues: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={litigationFormData.country}
                          onChange={(e) => setLitigationFormData({ ...litigationFormData, country: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="year_filed">Year Filed</Label>
                        <Input
                          id="year_filed"
                          value={litigationFormData.year_filed}
                          onChange={(e) => setLitigationFormData({ ...litigationFormData, year_filed: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Input
                          id="status"
                          value={litigationFormData.status}
                          onChange={(e) => setLitigationFormData({ ...litigationFormData, status: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button type="button" variant="outline" onClick={resetLitigationForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {litigationCases.map((case_) => (
                <Card key={case_.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">Case #{case_.case_number}: {case_.case_name}</CardTitle>
                    <CardDescription>{case_.country} - {case_.year_filed}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2"><strong>Issues:</strong> {case_.issues}</p>
                    <p className="text-sm text-gray-600 mb-4"><strong>Status:</strong> {case_.status}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleLitigationEdit(case_)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleLitigationDelete(case_.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Innovation Hub Tab */}
          <TabsContent value="innovation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Innovation Hub Initiatives</h2>
              <Button onClick={() => setEditingInnovationId('new')} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Initiative</span>
              </Button>
            </div>

            {(editingInnovationId === 'new' || editingInnovationId) && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingInnovationId === 'new' ? 'Add New Initiative' : 'Edit Initiative'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInnovationSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="initiative_title">Title</Label>
                      <Input
                        id="initiative_title"
                        value={innovationFormData.title}
                        onChange={(e) => setInnovationFormData({ ...innovationFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="initiative_description">Description</Label>
                      <Textarea
                        id="initiative_description"
                        value={innovationFormData.description}
                        onChange={(e) => setInnovationFormData({ ...innovationFormData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_coming_soon"
                        checked={innovationFormData.is_coming_soon}
                        onChange={(e) => setInnovationFormData({ ...innovationFormData, is_coming_soon: e.target.checked })}
                      />
                      <Label htmlFor="is_coming_soon">Coming Soon</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button type="button" variant="outline" onClick={resetInnovationForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {innovationInitiatives.map((initiative) => (
                <Card key={initiative.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{initiative.title}</CardTitle>
                    {initiative.is_coming_soon && (
                      <CardDescription className="text-orange-600">Coming Soon</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleInnovationEdit(initiative)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleInnovationDelete(initiative.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Digital Justice Tab */}
          <TabsContent value="digital-justice" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Digital Justice Services</h2>
              <Button onClick={() => setEditingDigitalJusticeId('new')} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </Button>
            </div>

            {(editingDigitalJusticeId === 'new' || editingDigitalJusticeId) && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingDigitalJusticeId === 'new' ? 'Add New Service' : 'Edit Service'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDigitalJusticeSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="dj_title">Title</Label>
                      <Input
                        id="dj_title"
                        value={digitalJusticeFormData.title}
                        onChange={(e) => setDigitalJusticeFormData({ ...digitalJusticeFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dj_description">Description</Label>
                      <Textarea
                        id="dj_description"
                        value={digitalJusticeFormData.description}
                        onChange={(e) => setDigitalJusticeFormData({ ...digitalJusticeFormData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Features</Label>
                      <div className="flex space-x-2 mb-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Add a feature"
                        />
                        <Button type="button" onClick={addDigitalJusticeFeature}>
                          Add
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {digitalJusticeFormData.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{feature}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeDigitalJusticeFeature(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button type="button" variant="outline" onClick={resetDigitalJusticeForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {digitalJusticeServices.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <div className="mb-4">
                      <strong className="text-sm">Features:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {service.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleDigitalJusticeEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDigitalJusticeDelete(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Consultancy Tab */}
          <TabsContent value="consultancy" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Consultancy Services</h2>
              <Button onClick={() => setEditingConsultancyId('new')} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </Button>
            </div>

            {(editingConsultancyId === 'new' || editingConsultancyId) && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingConsultancyId === 'new' ? 'Add New Service' : 'Edit Service'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConsultancySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="consultancy_title">Title</Label>
                        <Input
                          id="consultancy_title"
                          value={consultancyFormData.title}
                          onChange={(e) => setConsultancyFormData({ ...consultancyFormData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="service_type">Service Type</Label>
                        <Select value={consultancyFormData.service_type} onValueChange={(value) => setConsultancyFormData({ ...consultancyFormData, service_type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="advisory">Advisory</SelectItem>
                            <SelectItem value="research">Research</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="consultancy_description">Description</Label>
                      <Textarea
                        id="consultancy_description"
                        value={consultancyFormData.description}
                        onChange={(e) => setConsultancyFormData({ ...consultancyFormData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Features</Label>
                      <div className="flex space-x-2 mb-2">
                        <Input
                          value={newConsultancyFeature}
                          onChange={(e) => setNewConsultancyFeature(e.target.value)}
                          placeholder="Add a feature"
                        />
                        <Button type="button" onClick={addConsultancyFeature}>
                          Add
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {consultancyFormData.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{feature}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeConsultancyFeature(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pricing_info">Pricing Info</Label>
                        <Input
                          id="pricing_info"
                          value={consultancyFormData.pricing_info}
                          onChange={(e) => setConsultancyFormData({ ...consultancyFormData, pricing_info: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact_info">Contact Info</Label>
                        <Input
                          id="contact_info"
                          value={consultancyFormData.contact_info}
                          onChange={(e) => setConsultancyFormData({ ...consultancyFormData, contact_info: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button type="button" variant="outline" onClick={resetConsultancyForm}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultancyServices.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="capitalize">{service.service_type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <div className="mb-2">
                      <strong className="text-sm">Features:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {service.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    {service.pricing_info && (
                      <p className="text-sm text-gray-600 mb-1"><strong>Pricing:</strong> {service.pricing_info}</p>
                    )}
                    {service.contact_info && (
                      <p className="text-sm text-gray-600"><strong>Contact:</strong> {service.contact_info}</p>
                    )}
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleConsultancyEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleConsultancyDelete(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

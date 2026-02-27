import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/admin-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, X, Target, Users, BookOpen } from "lucide-react";

interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  created_at: string;
}

interface Department {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
}

interface Programme {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  created_at: string;
}

export default function ManageWhatWeDo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("focus-areas");

  // Focus Area form state
  const [focusAreaEditingId, setFocusAreaEditingId] = useState<string | null>(null);
  const [focusAreaFormData, setFocusAreaFormData] = useState({
    title: "",
    description: "",
    icon: "Heart",
    color: "text-red-600"
  });

  // Department form state
  const [departmentEditingId, setDepartmentEditingId] = useState<string | null>(null);
  const [departmentFormData, setDepartmentFormData] = useState({
    title: "",
    description: "",
    icon: "BookOpen"
  });

  // Programme form state
  const [programmeEditingId, setProgrammeEditingId] = useState<string | null>(null);
  const [programmeFormData, setProgrammeFormData] = useState({
    title: "",
    description: "",
    objectives: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [user, navigate]);

  const fetchAllData = async () => {
    try {
      const [focusAreasRes, departmentsRes, programmesRes] = await Promise.all([
        supabase.from('what_we_do_focus_areas').select('*').order('created_at', { ascending: false }),
        supabase.from('what_we_do_departments').select('*').order('created_at', { ascending: false }),
        supabase.from('what_we_do_programmes').select('*').order('created_at', { ascending: false })
      ]);

      if (focusAreasRes.error) throw focusAreasRes.error;
      if (departmentsRes.error) throw departmentsRes.error;
      if (programmesRes.error) throw programmesRes.error;

      setFocusAreas(focusAreasRes.data || []);
      setDepartments(departmentsRes.data || []);
      setProgrammes(programmesRes.data || []);
    } catch (error) {
      console.error('Error fetching What We Do data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Focus Area handlers
  const handleFocusAreaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title: focusAreaFormData.title,
        description: focusAreaFormData.description,
        icon: focusAreaFormData.icon,
        color: focusAreaFormData.color
      };

      if (focusAreaEditingId) {
        const { error } = await supabase
          .from('what_we_do_focus_areas')
          .update(data)
          .eq('id', focusAreaEditingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('what_we_do_focus_areas')
          .insert([data]);
        if (error) throw error;
      }

      resetFocusAreaForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving focus area:', error);
      alert('Error saving focus area. Please try again.');
    }
  };

  const handleEditFocusArea = (area: FocusArea) => {
    setFocusAreaEditingId(area.id);
    setFocusAreaFormData({
      title: area.title,
      description: area.description,
      icon: area.icon,
      color: area.color
    });
  };

  const handleDeleteFocusArea = async (id: string) => {
    if (!confirm('Are you sure you want to delete this focus area?')) return;
    try {
      const { error } = await supabase
        .from('what_we_do_focus_areas')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting focus area:', error);
      alert('Error deleting focus area. Please try again.');
    }
  };

  const resetFocusAreaForm = () => {
    setFocusAreaEditingId(null);
    setFocusAreaFormData({
      title: "",
      description: "",
      icon: "Heart",
      color: "text-red-600"
    });
  };

  // Department handlers
  const handleDepartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title: departmentFormData.title,
        description: departmentFormData.description,
        icon: departmentFormData.icon
      };

      if (departmentEditingId) {
        const { error } = await supabase
          .from('what_we_do_departments')
          .update(data)
          .eq('id', departmentEditingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('what_we_do_departments')
          .insert([data]);
        if (error) throw error;
      }

      resetDepartmentForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving department:', error);
      alert('Error saving department. Please try again.');
    }
  };

  const handleEditDepartment = (dept: Department) => {
    setDepartmentEditingId(dept.id);
    setDepartmentFormData({
      title: dept.title,
      description: dept.description,
      icon: dept.icon
    });
  };

  const handleDeleteDepartment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this department?')) return;
    try {
      const { error } = await supabase
        .from('what_we_do_departments')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Error deleting department. Please try again.');
    }
  };

  const resetDepartmentForm = () => {
    setDepartmentEditingId(null);
    setDepartmentFormData({
      title: "",
      description: "",
      icon: "BookOpen"
    });
  };

  // Programme handlers
  const handleProgrammeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const objectives = programmeFormData.objectives.split('\n').filter(obj => obj.trim());
      const data = {
        title: programmeFormData.title,
        description: programmeFormData.description,
        objectives: objectives
      };

      if (programmeEditingId) {
        const { error } = await supabase
          .from('what_we_do_programmes')
          .update(data)
          .eq('id', programmeEditingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('what_we_do_programmes')
          .insert([data]);
        if (error) throw error;
      }

      resetProgrammeForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving programme:', error);
      alert('Error saving programme. Please try again.');
    }
  };

  const handleEditProgramme = (prog: Programme) => {
    setProgrammeEditingId(prog.id);
    setProgrammeFormData({
      title: prog.title,
      description: prog.description,
      objectives: prog.objectives.join('\n')
    });
  };

  const handleDeleteProgramme = async (id: string) => {
    if (!confirm('Are you sure you want to delete this programme?')) return;
    try {
      const { error } = await supabase
        .from('what_we_do_programmes')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting programme:', error);
      alert('Error deleting programme. Please try again.');
    }
  };

  const resetProgrammeForm = () => {
    setProgrammeEditingId(null);
    setProgrammeFormData({
      title: "",
      description: "",
      objectives: ""
    });
  };

  const handleInputChange = <T extends Record<string, unknown>>(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<T>>) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = <T extends Record<string, unknown>>(name: string, value: string, setter: React.Dispatch<React.SetStateAction<T>>) => {
    setter(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading What We Do content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">What We Do Manager</h1>
            <p className="text-muted-foreground">Manage focus areas, departments, and programmes content</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="focus-areas" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Focus Areas
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="programmes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Programmes
            </TabsTrigger>
          </TabsList>

          {/* Focus Areas Tab */}
          <TabsContent value="focus-areas" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Focus Areas</h2>
              <Button
                onClick={() => setFocusAreaEditingId('new')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Focus Area
              </Button>
            </div>

            {/* Focus Area modal */}
            <Dialog open={!!focusAreaEditingId} onOpenChange={(open) => { if (!open) resetFocusAreaForm(); }}>
              <DialogContent className="max-w-lg bg-white rounded-lg shadow-md p-6">
                <div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{focusAreaEditingId === 'new' ? 'Add Focus Area' : 'Edit Focus Area'}</h3>
                    <p className="text-sm text-gray-500 mt-1">Create or edit focus areas for the What We Do page.</p>
                  </div>

                  <form onSubmit={handleFocusAreaSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={focusAreaFormData.title}
                          onChange={(e) => handleInputChange(e, setFocusAreaFormData)}
                          required
                          autoFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Select value={focusAreaFormData.icon} onValueChange={(value) => handleSelectChange('icon', value, setFocusAreaFormData)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Heart">Heart</SelectItem>
                            <SelectItem value="Leaf">Leaf</SelectItem>
                            <SelectItem value="DollarSign">Dollar Sign</SelectItem>
                            <SelectItem value="Laptop">Laptop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Select value={focusAreaFormData.color} onValueChange={(value) => handleSelectChange('color', value, setFocusAreaFormData)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text-red-600">Red</SelectItem>
                            <SelectItem value="text-green-600">Green</SelectItem>
                            <SelectItem value="text-yellow-600">Yellow</SelectItem>
                            <SelectItem value="text-blue-600">Blue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={focusAreaFormData.description}
                        onChange={(e) => handleInputChange(e, setFocusAreaFormData)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetFocusAreaForm} className="h-9 px-4 text-sm">Cancel</Button>
                      <Button type="submit" className="h-9 px-4 text-sm">{focusAreaEditingId === 'new' ? 'Create' : 'Save'}</Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {focusAreas.map((area) => (
                <Card key={area.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                    <CardDescription>{area.icon} • {area.color}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFocusArea(area)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteFocusArea(area.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {focusAreas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No focus areas found. Add your first focus area!</p>
              </div>
            )}
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Departments</h2>
              <Button
                onClick={() => setDepartmentEditingId('new')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Department
              </Button>
            </div>

            {/* Department modal */}
            <Dialog open={!!departmentEditingId} onOpenChange={(open) => { if (!open) resetDepartmentForm(); }}>
              <DialogContent className="max-w-lg bg-white rounded-lg shadow-md p-6">
                <div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{departmentEditingId === 'new' ? 'Add Department' : 'Edit Department'}</h3>
                    <p className="text-sm text-gray-500 mt-1">Create or edit departments for the What We Do page.</p>
                  </div>

                  <form onSubmit={handleDepartmentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={departmentFormData.title}
                          onChange={(e) => handleInputChange(e, setDepartmentFormData)}
                          required
                          autoFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Select value={departmentFormData.icon} onValueChange={(value) => handleSelectChange('icon', value, setDepartmentFormData)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BookOpen">Book Open</SelectItem>
                            <SelectItem value="Users">Users</SelectItem>
                            <SelectItem value="Megaphone">Megaphone</SelectItem>
                            <SelectItem value="Lightbulb">Lightbulb</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={departmentFormData.description}
                        onChange={(e) => handleInputChange(e, setDepartmentFormData)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetDepartmentForm} className="h-9 px-4 text-sm">Cancel</Button>
                      <Button type="submit" className="h-9 px-4 text-sm">{departmentEditingId === 'new' ? 'Create' : 'Save'}</Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{dept.title}</CardTitle>
                    <CardDescription>{dept.icon}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{dept.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditDepartment(dept)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDepartment(dept.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {departments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No departments found. Add your first department!</p>
              </div>
            )}
          </TabsContent>

          {/* Programmes Tab */}
          <TabsContent value="programmes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Programmes</h2>
              <Button
                onClick={() => setProgrammeEditingId('new')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Programme
              </Button>
            </div>

            {/* Programme modal */}
            <Dialog open={!!programmeEditingId} onOpenChange={(open) => { if (!open) resetProgrammeForm(); }}>
              <DialogContent className="max-w-lg bg-white rounded-lg shadow-md p-6">
                <div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{programmeEditingId === 'new' ? 'Add Programme' : 'Edit Programme'}</h3>
                    <p className="text-sm text-gray-500 mt-1">Create or edit programmes for the What We Do page.</p>
                  </div>

                  <form onSubmit={handleProgrammeSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={programmeFormData.title}
                        onChange={(e) => handleInputChange(e, setProgrammeFormData)}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={programmeFormData.description}
                        onChange={(e) => handleInputChange(e, setProgrammeFormData)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objectives">Objectives (one per line) *</Label>
                      <Textarea
                        id="objectives"
                        name="objectives"
                        value={programmeFormData.objectives}
                        onChange={(e) => handleInputChange(e, setProgrammeFormData)}
                        rows={6}
                        placeholder="Enter each objective on a new line"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetProgrammeForm} className="h-9 px-4 text-sm">Cancel</Button>
                      <Button type="submit" className="h-9 px-4 text-sm">{programmeEditingId === 'new' ? 'Create' : 'Save'}</Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>

            <div className="space-y-6">
              {programmes.map((programme) => (
                <Card key={programme.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{programme.title}</CardTitle>
                    <CardDescription>{programme.objectives.length} objectives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{programme.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Objectives:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {programme.objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{objective}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProgramme(programme)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProgramme(programme.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {programmes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No programmes found. Add your first programme!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
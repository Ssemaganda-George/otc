import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Trash2, Copy, Search, Mail } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  source: string;
  is_active: boolean;
  subscribed_at: string;
}

export default function ManageNewsletter() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/admin');
      return;
    }
    fetchSubscribers();
  }, [user, navigate]);

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) console.error(error);
    else setSubscribers(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove this subscriber?')) {
      try {
        const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
        if (error) throw error;
        fetchSubscribers();
      } catch (error) {
        console.error('Error removing subscriber:', error);
        alert('Error removing subscriber. Please try again.');
      }
    }
  };

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const copyEmails = async () => {
    const emails = filtered.map(s => s.email).join(', ');
    try {
      await navigator.clipboard.writeText(emails);
      alert(`${filtered.length} email(s) copied to clipboard.`);
    } catch {
      prompt('Copy emails:', emails);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-sm text-gray-500 mt-1">{subscribers.length} total subscriber(s)</p>
        </div>
        <Button onClick={copyEmails} className="flex items-center space-x-2" disabled={filtered.length === 0}>
          <Copy className="w-4 h-4" />
          <span>Copy All Emails</span>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Subscribers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No subscribers found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Subscribed</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">{subscriber.email}</td>
                      <td className="py-3 pr-4 text-gray-600">{subscriber.first_name || "—"}</td>
                      <td className="py-3 pr-4 text-gray-600 capitalize">{subscriber.source || "website"}</td>
                      <td className="py-3 pr-4 text-gray-600">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="outline" onClick={() => handleDelete(subscriber.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Mail, Eye, EyeOff, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  created_at: string;
}

export default function ManageMessages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        if (error.code === 'PGRST116') {
          alert('The contact_messages table does not exist. Please run the database setup script.');
        }
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages([]);
    }
    setLoading(false);
  };

  const updateMessageStatus = async (id: string, status: 'unread' | 'read' | 'responded') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, status } : msg
      ));

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Unread</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'responded':
        return <Badge variant="default">Responded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <Mail className="w-4 h-4" />;
      case 'read':
        return <Eye className="w-4 h-4" />;
      case 'responded':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Messages</h1>
          <p className="text-muted-foreground">Manage and respond to contact form submissions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Messages ({messages.length})
                </CardTitle>
                <CardDescription>
                  All contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedMessage?.id === message.id ? 'bg-muted' : ''
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {message.first_name} {message.last_name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {message.email}
                              </p>
                            </div>
                            {getStatusBadge(message.status)}
                          </div>
                          <p className="text-sm font-medium truncate mb-1">
                            {message.subject}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(message.created_at), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(selectedMessage.status)}
                        {selectedMessage.subject}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        From {selectedMessage.first_name} {selectedMessage.last_name}
                        {selectedMessage.organization && ` at ${selectedMessage.organization}`}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedMessage.status)}
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(selectedMessage.created_at), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="bg-muted/50 p-4 space-y-2">
                      <p><strong>Name:</strong> {selectedMessage.first_name} {selectedMessage.last_name}</p>
                      <p><strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a></p>
                      {selectedMessage.organization && (
                        <p><strong>Organization:</strong> {selectedMessage.organization}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Message</h4>
                    <div className="bg-muted/50 p-4">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    {selectedMessage.status === 'unread' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                    {selectedMessage.status === 'read' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateMessageStatus(selectedMessage.id, 'responded')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Responded
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply via Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a message to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
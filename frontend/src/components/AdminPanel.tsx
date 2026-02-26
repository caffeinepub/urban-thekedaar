import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useGetAllQueryForms, useGetAllCalculatorLeads } from '@/hooks/useQueries';

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'urbanadmin2024';

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid username or password. Please try again.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <p className="text-sm text-muted-foreground">Urban Thekedaar — Restricted Access</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-4">
            This panel is for authorized personnel only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function QueryFormsTable() {
  const { data: queryForms, isLoading, isError, refetch, isFetching } = useGetAllQueryForms();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load query forms. You may need to be logged in as an admin on the main site.
        </AlertDescription>
      </Alert>
    );
  }

  const forms = queryForms ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total submissions:</span>
          <Badge variant="secondary">{forms.length}</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No query submissions yet</p>
          <p className="text-sm mt-1">Submissions will appear here once users fill out the query form.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-medium">{form.name}</TableCell>
                  <TableCell>{form.phone}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{form.serviceType}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate text-sm text-muted-foreground" title={form.message}>
                      {form.message}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function CalculatorLeadsTable() {
  const { data: leads, isLoading, isError, refetch, isFetching } = useGetAllCalculatorLeads();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load calculator leads. You may need to be logged in as an admin on the main site.
        </AlertDescription>
      </Alert>
    );
  }

  const allLeads = leads ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total leads:</span>
          <Badge variant="secondary">{allLeads.length}</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {allLeads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No calculator leads yet</p>
          <p className="text-sm mt-1">Leads will appear here once users submit the estimate calculator.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Area (sq.ft)</TableHead>
                <TableHead>Floors</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allLeads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.mobile}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.projectType}</Badge>
                  </TableCell>
                  <TableCell>{lead.areaInSqFt.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{lead.numFloors.toString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lead.qualityTier === 'Luxury'
                          ? 'default'
                          : lead.qualityTier === 'Premium'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {lead.qualityTier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.address.city}
                    {lead.address.street ? `, ${lead.address.street}` : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground leading-none">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Urban Thekedaar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onBack}>
                ← Back to Site
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground text-sm mt-1">
            View all query form submissions and calculator leads.
          </p>
        </div>

        <Tabs defaultValue="queries">
          <TabsList className="mb-6">
            <TabsTrigger value="queries">📋 Query Submissions</TabsTrigger>
            <TabsTrigger value="leads">🧮 Calculator Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Query Form Submissions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All queries submitted via the chatbot query form.
                </p>
              </CardHeader>
              <CardContent>
                <QueryFormsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calculator Leads</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All leads captured from the estimate calculator.
                </p>
              </CardHeader>
              <CardContent>
                <CalculatorLeadsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useState } from 'react';
import {
  Shield, LogOut, Users, FileText, Loader2, Mail, Phone,
  MessageSquare, Tag, MapPin, Calculator, AlertTriangle, Eye, EyeOff, Lock, User
} from 'lucide-react';
import { useGetAllQueryForms, useGetAllCalculatorLeads, useGetAllContactForms } from '../hooks/useQueries';
import type { QueryForm, CalculatorLead, ContactForm } from '../backend';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const SESSION_KEY = 'ut_admin_session';

type TabType = 'queries' | 'contacts' | 'leads';

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
      <div>
        <span className="text-gray-500 text-xs">{label}: </span>
        <span className="text-gray-800 font-medium">{value}</span>
      </div>
    </div>
  );
}

function QueryCard({ form, index }: { form: QueryForm; index: number }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          #{index + 1}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{form.serviceType}</span>
      </div>
      <h4 className="font-bold text-gray-900 mb-3">{form.name}</h4>
      <div className="space-y-1.5">
        <InfoRow icon={Phone} label="Phone" value={form.phone} />
        <InfoRow icon={Mail} label="Email" value={form.email} />
        <InfoRow icon={Tag} label="Service" value={form.serviceType} />
        <InfoRow icon={MessageSquare} label="Message" value={form.message} />
      </div>
    </div>
  );
}

function ContactCard({ form, index }: { form: ContactForm; index: number }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          #{index + 1}
        </span>
      </div>
      <h4 className="font-bold text-gray-900 mb-3">{form.name}</h4>
      <div className="space-y-1.5">
        <InfoRow icon={Phone} label="Phone" value={form.phone} />
        <InfoRow icon={Mail} label="Email" value={form.email} />
        <InfoRow icon={MessageSquare} label="Message" value={form.message} />
      </div>
    </div>
  );
}

function LeadCard({ lead, index }: { lead: CalculatorLead; index: number }) {
  const formatArea = (area: number) => `${area.toLocaleString('en-IN')} sq ft`;
  const formatAddress = (lead: CalculatorLead) =>
    [lead.address.street, `#${lead.address.number}`, lead.address.city, lead.address.postalCode]
      .filter(Boolean)
      .join(', ');

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
          #{index + 1}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{lead.qualityTier}</span>
      </div>
      <h4 className="font-bold text-gray-900 mb-3">{lead.name}</h4>
      <div className="space-y-1.5">
        <InfoRow icon={Phone} label="Mobile" value={lead.mobile} />
        <InfoRow icon={Tag} label="Project" value={lead.projectType} />
        <InfoRow icon={Calculator} label="Area" value={formatArea(lead.areaInSqFt)} />
        <InfoRow icon={Users} label="Floors" value={`${lead.numFloors} floor(s)`} />
        <InfoRow icon={MapPin} label="Location" value={formatAddress(lead)} />
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief loading state for UX
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        onLogin();
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <section id="admin" className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-gray-500 mt-1 text-sm">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('queries');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  const queryFormsQuery = useGetAllQueryForms(isAdminLoggedIn);
  const contactFormsQuery = useGetAllContactForms(isAdminLoggedIn);
  const calculatorLeadsQuery = useGetAllCalculatorLeads(isAdminLoggedIn);

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdminLoggedIn(false);
  };

  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const tabs: { id: TabType; label: string; icon: React.ElementType; count: number | undefined; color: string }[] = [
    {
      id: 'queries',
      label: 'Query Forms',
      icon: FileText,
      count: queryFormsQuery.data?.length,
      color: 'text-primary',
    },
    {
      id: 'contacts',
      label: 'Contact Forms',
      icon: Mail,
      count: contactFormsQuery.data?.length,
      color: 'text-blue-600',
    },
    {
      id: 'leads',
      label: 'Calculator Leads',
      icon: Calculator,
      count: calculatorLeadsQuery.data?.length,
      color: 'text-green-600',
    },
  ];

  return (
    <section id="admin" className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
              <p className="text-gray-500 text-sm">Manage all inquiries and leads</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map(tab => (
            <div key={tab.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  tab.id === 'queries' ? 'bg-primary/10' :
                  tab.id === 'contacts' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <tab.icon className={`w-5 h-5 ${tab.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {tab.id === 'queries' && (queryFormsQuery.isLoading ? '...' : (queryFormsQuery.data?.length ?? 0))}
                    {tab.id === 'contacts' && (contactFormsQuery.isLoading ? '...' : (contactFormsQuery.data?.length ?? 0))}
                    {tab.id === 'leads' && (calculatorLeadsQuery.isLoading ? '...' : (calculatorLeadsQuery.data?.length ?? 0))}
                  </p>
                  <p className="text-sm text-gray-500">{tab.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? `${tab.color} border-b-2 border-current bg-gray-50`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === tab.id ? 'bg-current/10' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Query Forms Tab */}
            {activeTab === 'queries' && (
              <div>
                {queryFormsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : queryFormsQuery.isError ? (
                  <div className="text-center py-12 text-red-500">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                    <p>Failed to load query forms.</p>
                  </div>
                ) : !queryFormsQuery.data?.length ? (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No query form submissions yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {queryFormsQuery.data.map((form, i) => (
                      <QueryCard key={i} form={form} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact Forms Tab */}
            {activeTab === 'contacts' && (
              <div>
                {contactFormsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                ) : contactFormsQuery.isError ? (
                  <div className="text-center py-12 text-red-500">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                    <p>Failed to load contact forms.</p>
                  </div>
                ) : !contactFormsQuery.data?.length ? (
                  <div className="text-center py-12 text-gray-400">
                    <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No contact form submissions yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactFormsQuery.data.map((form, i) => (
                      <ContactCard key={i} form={form} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Calculator Leads Tab */}
            {activeTab === 'leads' && (
              <div>
                {calculatorLeadsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                  </div>
                ) : calculatorLeadsQuery.isError ? (
                  <div className="text-center py-12 text-red-500">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                    <p>Failed to load calculator leads.</p>
                  </div>
                ) : !calculatorLeadsQuery.data?.length ? (
                  <div className="text-center py-12 text-gray-400">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No calculator leads yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {calculatorLeadsQuery.data.map((lead, i) => (
                      <LeadCard key={i} lead={lead} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

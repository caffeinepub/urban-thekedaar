import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown, Loader2 } from 'lucide-react';
import { useSubmitQueryForm } from '../hooks/useQueries';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'price': 'Our construction rates start from ₹1,350/sq ft for Standard, ₹1,450/sq ft for Premium, and ₹1,550/sq ft for Luxury quality. Use our calculator for a detailed estimate!',
  'cost': 'Our construction rates start from ₹1,350/sq ft for Standard, ₹1,450/sq ft for Premium, and ₹1,550/sq ft for Luxury quality. Use our calculator for a detailed estimate!',
  'rate': 'Our construction rates start from ₹1,350/sq ft for Standard, ₹1,450/sq ft for Premium, and ₹1,550/sq ft for Luxury quality. Use our calculator for a detailed estimate!',
  'time': 'Project timelines depend on scope. Typically: small homes (800-1200 sq ft) take 6-8 months, medium homes (1200-2000 sq ft) take 8-12 months, and larger projects take 12-18 months.',
  'duration': 'Project timelines depend on scope. Typically: small homes (800-1200 sq ft) take 6-8 months, medium homes (1200-2000 sq ft) take 8-12 months, and larger projects take 12-18 months.',
  'material': 'We use premium quality materials including AAC blocks, TMT steel, OPC/PPC cement, and vitrified tiles. All materials are sourced from reputed brands.',
  'quality': 'We offer three quality tiers: Standard (₹1,350/sq ft), Premium (₹1,450/sq ft), and Luxury (₹1,550/sq ft). Each tier uses progressively better materials and finishes.',
  'contact': 'You can reach us at +91 9910801994 or email pulkithans5@gmail.com. We\'re located at DLF City Phase 2, Gurugram.',
  'phone': 'Call us at +91 9910801994. We\'re available Monday to Saturday, 9 AM to 7 PM.',
  'location': 'We are based in DLF City Phase 2, Gurugram and serve the entire NCR region.',
  'gurugram': 'Yes, we operate across Gurugram and the entire NCR region including Delhi, Noida, and Faridabad.',
  'track': 'We provide live project tracking through our dedicated app. You can monitor progress, view photos, and get real-time updates from anywhere!',
  'app': 'Our live project tracking app lets you monitor construction progress, view daily photos, and communicate with your site engineer in real time.',
  'engineer': 'Every project is supervised by a qualified civil engineer. We also provide dedicated site managers for larger projects.',
  'permit': 'Yes, we handle all necessary permits and approvals as part of our Planning & Permits phase. Our team manages all paperwork.',
  'hello': 'Hello! Welcome to Urban Thekedaar. I\'m here to help you with any questions about our construction services. What would you like to know?',
  'hi': 'Hi there! Welcome to Urban Thekedaar. How can I assist you today?',
  'help': 'I can help you with information about our construction services, pricing, timelines, materials, and more. What would you like to know?',
};

const QUICK_REPLIES = [
  'What are your rates?',
  'How long does construction take?',
  'Do you handle permits?',
  'How can I track my project?',
  'Contact information',
];

const SERVICE_TYPES = ['Residential', 'Commercial', 'Farm House'];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) {
      return response;
    }
  }
  return "Thank you for your question! For detailed information, please use our Query Form tab or call us at +91 9910801994. Our team will be happy to assist you.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'query'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Urban Thekedaar. I'm here to help you with questions about our construction services. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Query form state
  const [queryForm, setQueryForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Residential',
    message: '',
  });
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const submitQueryMutation = useSubmitQueryForm();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(text),
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitQueryMutation.mutateAsync({
        name: queryForm.name,
        phone: queryForm.phone,
        email: queryForm.email,
        serviceType: queryForm.serviceType,
        message: queryForm.message,
      });
      setQuerySubmitted(true);
      setQueryForm({ name: '', phone: '', email: '', serviceType: 'Residential', message: '' });
    } catch (error) {
      // error shown in UI
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: '#ea580c' }}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: '520px', backgroundColor: '#ffffff', border: '2px solid #ea580c' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: '#ea580c' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Urban Thekedaar</p>
                <p className="text-white/80 text-xs">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: '#ea580c' }}>
            <button
              onClick={() => setActiveTab('chat')}
              className="flex-1 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: activeTab === 'chat' ? '#fff7ed' : '#ffffff',
                color: '#ea580c',
                borderBottom: activeTab === 'chat' ? '2px solid #ea580c' : '2px solid transparent',
              }}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveTab('query')}
              className="flex-1 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: activeTab === 'query' ? '#fff7ed' : '#ffffff',
                color: '#ea580c',
                borderBottom: activeTab === 'query' ? '2px solid #ea580c' : '2px solid transparent',
              }}
            >
              📋 Query Form
            </button>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="flex flex-col flex-1 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className="max-w-[80%] rounded-xl px-3 py-2 text-sm"
                      style={
                        msg.isBot
                          ? { backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' }
                          : { backgroundColor: '#ea580c', color: '#ffffff' }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                {QUICK_REPLIES.map(reply => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-xs px-2 py-1 rounded-full border transition-colors hover:bg-orange-50"
                    style={{ borderColor: '#ea580c', color: '#ea580c', backgroundColor: '#ffffff' }}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div
                className="flex items-center gap-2 px-3 py-2 border-t"
                style={{ borderColor: '#fed7aa', backgroundColor: '#ffffff' }}
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 text-sm outline-none bg-transparent"
                  style={{ color: '#ea580c' }}
                />
                <button
                  onClick={() => sendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                  style={{ backgroundColor: '#ea580c' }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Query Form Tab */}
          {activeTab === 'query' && (
            <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#ffffff' }}>
              {querySubmitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#fff7ed' }}
                  >
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#ea580c' }}>
                    Query Submitted!
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#c2410c' }}>
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setQuerySubmitted(false)}
                    className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#ea580c', color: '#ffffff' }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuerySubmit} className="space-y-3">
                  <h3 className="font-bold text-base mb-1" style={{ color: '#ea580c' }}>
                    Send Us a Query
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#ea580c' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={queryForm.name}
                      onChange={e => setQueryForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none border"
                      style={{ borderColor: '#fed7aa', color: '#ea580c', backgroundColor: '#fff7ed' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#ea580c' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={queryForm.phone}
                      onChange={e => setQueryForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none border"
                      style={{ borderColor: '#fed7aa', color: '#ea580c', backgroundColor: '#fff7ed' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#ea580c' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={queryForm.email}
                      onChange={e => setQueryForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none border"
                      style={{ borderColor: '#fed7aa', color: '#ea580c', backgroundColor: '#fff7ed' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#ea580c' }}>
                      Service Type *
                    </label>
                    <select
                      required
                      value={queryForm.serviceType}
                      onChange={e => setQueryForm(p => ({ ...p, serviceType: e.target.value }))}
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none border"
                      style={{ borderColor: '#fed7aa', color: '#ea580c', backgroundColor: '#fff7ed' }}
                    >
                      {SERVICE_TYPES.map(type => (
                        <option key={type} value={type} style={{ color: '#ea580c', backgroundColor: '#fff7ed' }}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#ea580c' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      value={queryForm.message}
                      onChange={e => setQueryForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your project..."
                      rows={3}
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none border resize-none"
                      style={{ borderColor: '#fed7aa', color: '#ea580c', backgroundColor: '#fff7ed' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitQueryMutation.isPending}
                    className="w-full py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#ea580c', color: '#ffffff' }}
                  >
                    {submitQueryMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Query'
                    )}
                  </button>

                  {submitQueryMutation.isError && (
                    <p className="text-xs text-red-600 text-center">
                      Failed to submit. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

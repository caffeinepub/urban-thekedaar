import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, X, CheckCircle2, Loader2 } from 'lucide-react';
import { useSubmitQueryForm } from '@/hooks/useQueries';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SERVICE_TYPES = [
  'Construction',
  'Renovation',
  'Interior Design',
  'Architectural Planning',
  'Other',
];

const quickResponses: Record<string, string> = {
  hello: 'Hello! Welcome to Urban Thekedaar. How can I assist you with your construction needs today?',
  hi: 'Hi there! How can I help you with your construction project?',
  hey: 'Hey! Welcome to Urban Thekedaar. What can I help you with today?',
  pricing:
    'Our construction pricing is transparent and competitive. Use our Estimate Calculator on this page to get an instant quote based on your project type, area, floors, and quality tier. No hidden charges.',
  price:
    'Our construction pricing is transparent and competitive. Use our Estimate Calculator on this page to get an instant quote based on your project type, area, floors, and quality tier. No hidden charges.',
  cost: 'Construction costs depend on project type, area, number of floors, quality tier, and location. Use our Estimate Calculator for an instant estimate. Standard starts from ₹1,350/sq.ft.',
  rate: 'Our rates vary by quality tier — Standard, Premium, and Luxury. Use the Estimate Calculator on this page for a detailed quote tailored to your project.',
  estimate:
    'You can get an instant construction estimate using our Estimate Calculator on this page. Just provide your project type, area in sq. ft., number of floors, quality tier, and location.',
  budget:
    'We work with various budgets. Our Standard tier is the most economical, while Premium and Luxury tiers offer higher-end finishes. Use the Estimate Calculator for a precise figure.',
  services:
    'Urban Thekedaar offers: 1) Residential Construction, 2) Commercial Construction, 3) Industrial Construction, and 4) Mixed-Use Construction. We handle the full construction execution from foundation to handover.',
  service:
    'We offer Residential, Commercial, Industrial, and Mixed-Use construction services. We focus purely on construction execution based on approved plans.',
  construction:
    'We specialize in full construction execution — residential, commercial, industrial, and mixed-use projects. Our team of skilled labourers and site engineers ensures quality at every stage.',
  renovation:
    'We handle renovation and remodelling projects. Whether it\'s a partial renovation or a complete overhaul, our team can execute it with precision. Submit a query form for a detailed discussion.',
  residential:
    'We build high-quality residential properties — individual homes, villas, and apartment buildings. Our residential projects are known for quality materials and on-time delivery.',
  commercial:
    'We construct commercial spaces including offices, retail outlets, and business complexes. Our commercial projects are built to meet industry standards and client specifications.',
  booking:
    'To book a consultation or start your project: 1) Fill out our Query Form (click the "Query Form" tab above), 2) Our team will contact you within 24 hours, 3) We\'ll schedule a site visit and provide a detailed proposal.',
  book: 'To get started, fill out our Query Form in the "Query Form" tab above. Our team will reach out within 24 hours to schedule a consultation.',
  appointment:
    'To schedule an appointment, please fill out the Query Form in the "Query Form" tab above with your details and preferred service. We\'ll contact you within 24 hours.',
  schedule:
    'To schedule a site visit or consultation, fill out the Query Form in the "Query Form" tab. Our team will get back to you within 24 hours.',
  process:
    'Our construction process has 4 stages: 1) Site Assessment — we evaluate your site and requirements, 2) Planning & Permits — we help with approvals, 3) Construction Execution — skilled team builds your project, 4) Quality Handover — final inspection and handover.',
  timeline:
    'We are committed to on-time delivery. Our site management methodology ensures timely completion. We set realistic timelines and maintain a 95% on-time record. Specific timelines depend on project size and complexity.',
  time: 'Project timelines vary by size and complexity. A typical residential home takes 8–18 months. We provide a detailed schedule during the planning phase.',
  quality:
    'We use only the finest building materials and employ skilled, experienced labourers supervised by qualified site engineers. Every structure is built to last for generations.',
  materials:
    'We use high-grade construction materials sourced from reputed suppliers. Material quality varies by tier — Standard uses good-quality materials, Premium uses high-grade, and Luxury uses ultra-premium materials.',
  warranty:
    'We provide a structural warranty on all our construction projects. Specific warranty terms are discussed and documented in the project agreement.',
  guarantee:
    'We stand behind our work with a structural warranty. Details are outlined in your project contract. Contact us at +91 9910801994 for specifics.',
  permit:
    'We assist with obtaining necessary construction permits and approvals as part of our Planning & Permits stage. Our team is familiar with local regulations in the NCR region.',
  approval:
    'We help navigate the permit and approval process during the Planning & Permits stage. Our team handles the paperwork and liaisons with local authorities.',
  contact:
    'You can reach us at: 📞 +91 9910801994 | 📧 pulkithans5@gmail.com | 📍 DLF City Phase 2, Gurugram. Or fill out the Query Form in the "Query Form" tab above.',
  phone:
    'Our phone number is +91 9910801994. You can call or WhatsApp us. We\'re available Monday–Saturday, 9 AM–7 PM.',
  email:
    'You can email us at pulkithans5@gmail.com. We typically respond within 24 hours.',
  address:
    'Our office is at DLF City Phase 2, Gurugram, Haryana. We serve projects across the NCR region.',
  location:
    'We are based in DLF City Phase 2, Gurugram, and serve construction projects across the NCR region including Delhi, Noida, Faridabad, and Ghaziabad.',
  gurugram:
    'Yes, we operate in Gurugram and across the NCR region. Our office is at DLF City Phase 2, Gurugram.',
  delhi: 'Yes, we take on construction projects in Delhi and across the NCR region.',
  floors:
    'We construct buildings up to 5 floors. Our Estimate Calculator supports 1 to 5 floor projects. Contact us for larger or multi-storey commercial projects.',
  design:
    'We are a pure construction company — we do not offer design or architecture services. We execute construction based on approved plans provided by you or your architect.',
  architect:
    'We do not provide architecture or design services. Our expertise is in construction execution. You\'ll need to engage a separate architect for design work, and we\'ll build based on the approved drawings.',
  interior:
    'We do not offer interior design services. We focus on structural construction. For interior work, you\'d need a separate interior designer. We can execute construction as per their specifications.',
  faq: 'Common questions: 1) Do you offer design? No, construction only. 2) What areas do you serve? NCR region. 3) How to get a quote? Use our Estimate Calculator. 4) How to book? Fill the Query Form. 5) Contact: +91 9910801994.',
  help: 'I can help you with: services info, pricing estimates, booking process, project timelines, materials, permits, and contact details. What would you like to know?',
  thank: 'You\'re welcome! Feel free to ask if you have more questions. You can also fill out our Query Form for a personalized consultation.',
  thanks: 'You\'re welcome! Don\'t hesitate to reach out if you need anything else. Our team is here to help.',
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the Urban Thekedaar assistant. Ask me about our services, pricing, booking process, or FAQs. You can also submit a query using the Query Form tab.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Query form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formServiceType, setFormServiceType] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitQueryForm = useSubmitQueryForm();

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(quickResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "Thank you for your question! For detailed information, please explore our website or contact us at +91 9910801994 / pulkithans5@gmail.com. You can also submit a Query Form (click the 'Query Form' tab) and our team will get back to you within 24 hours.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(currentInput),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formPhone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formServiceType) {
      toast.error('Please select a service type');
      return;
    }
    if (!formMessage.trim()) {
      toast.error('Please enter your message');
      return;
    }

    submitQueryForm.mutate(
      {
        name: formName.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim(),
        serviceType: formServiceType,
        message: formMessage.trim(),
      },
      {
        onSuccess: () => {
          setFormSubmitted(true);
          setFormName('');
          setFormPhone('');
          setFormEmail('');
          setFormServiceType('');
          setFormMessage('');
        },
        onError: () => {
          toast.error('Failed to submit query. Please try again.');
        },
      }
    );
  };

  const handleNewQuery = () => {
    setFormSubmitted(false);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[520px] h-[640px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-5 pb-3 border-b shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-bold">Urban Thekedaar Assistant</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Ask questions or submit a query for a callback
            </p>
          </DialogHeader>

          <Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
            <TabsList className="mx-5 mt-3 shrink-0">
              <TabsTrigger value="chat" className="flex-1">💬 Chat</TabsTrigger>
              <TabsTrigger value="query" className="flex-1">📋 Query Form</TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex flex-col flex-1 min-h-0 mt-0 data-[state=active]:flex">
              <ScrollArea className="flex-1 px-5 py-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted rounded-bl-sm'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t shrink-0">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about services, pricing, booking..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['Pricing', 'Services', 'Booking', 'Process', 'Contact'].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => {
                        setInputValue(hint);
                        setTimeout(() => {
                          const userMsg: Message = {
                            id: Date.now().toString(),
                            text: hint,
                            sender: 'user',
                            timestamp: new Date(),
                          };
                          setMessages((prev) => [...prev, userMsg]);
                          setTimeout(() => {
                            const botMsg: Message = {
                              id: (Date.now() + 1).toString(),
                              text: getBotResponse(hint),
                              sender: 'bot',
                              timestamp: new Date(),
                            };
                            setMessages((prev) => [...prev, botMsg]);
                          }, 400);
                          setInputValue('');
                        }, 0);
                      }}
                      className="text-xs px-2.5 py-1 rounded-full border border-border hover:bg-accent transition-colors"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Query Form Tab */}
            <TabsContent value="query" className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col">
              <ScrollArea className="flex-1 px-5 py-4">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <CheckCircle2 className="h-14 w-14 text-green-500" />
                    <h3 className="text-lg font-bold text-foreground">Query Submitted!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Thank you! Our team will contact you within 24 hours to discuss your project.
                    </p>
                    <Button variant="outline" size="sm" onClick={handleNewQuery}>
                      Submit Another Query
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="qf-name">Full Name *</Label>
                      <Input
                        id="qf-name"
                        placeholder="Your full name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="qf-phone">Phone Number *</Label>
                      <Input
                        id="qf-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="qf-email">Email Address *</Label>
                      <Input
                        id="qf-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="qf-service">Service Type *</Label>
                      <Select value={formServiceType} onValueChange={setFormServiceType}>
                        <SelectTrigger id="qf-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_TYPES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="qf-message">Message *</Label>
                      <Textarea
                        id="qf-message"
                        placeholder="Describe your project or query..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitQueryForm.isPending}
                    >
                      {submitQueryForm.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Query'
                      )}
                    </Button>
                  </form>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

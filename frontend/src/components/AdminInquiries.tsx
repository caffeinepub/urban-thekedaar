import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllContactForms, useIsCallerAdmin } from '@/hooks/useQueries';
import { Mail, Phone, User, MessageSquare, ShieldAlert, Inbox, Tag } from 'lucide-react';

const AdminInquiries = forwardRef<HTMLElement>((props, ref) => {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: inquiries, isLoading: inquiriesLoading, error } = useGetAllContactForms();

  if (adminLoading) {
    return (
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <ShieldAlert className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              Only administrators can view submitted inquiries.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                Submitted Inquiries
              </h2>
              <p className="text-muted-foreground">
                All contact form submissions from potential clients.
              </p>
            </div>
            {inquiries && (
              <Badge variant="secondary" className="text-base px-4 py-2">
                {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'}
              </Badge>
            )}
          </div>

          {inquiriesLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          )}

          {error && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <p className="text-destructive font-medium">
                  Failed to load inquiries. Please try again.
                </p>
              </CardContent>
            </Card>
          )}

          {!inquiriesLoading && !error && inquiries && inquiries.length === 0 && (
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <Inbox className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Inquiries Yet
                </h3>
                <p className="text-muted-foreground">
                  Contact form submissions will appear here once clients reach out.
                </p>
              </CardContent>
            </Card>
          )}

          {!inquiriesLoading && !error && inquiries && inquiries.length > 0 && (
            <div className="space-y-4">
              {inquiries.map((inquiry, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-lg">{inquiry.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="break-all">{inquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{inquiry.phone}</span>
                      </div>
                    </div>
                    {inquiry.serviceType && inquiry.serviceType !== 'General Inquiry' && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                        <Badge variant="secondary" className="text-xs">{inquiry.serviceType}</Badge>
                      </div>
                    )}
                    <div className="flex items-start space-x-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground leading-relaxed">{inquiry.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

AdminInquiries.displayName = 'AdminInquiries';

export default AdminInquiries;

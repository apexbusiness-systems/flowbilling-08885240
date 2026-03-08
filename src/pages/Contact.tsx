import { Mail, MessageSquare, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { SupportChat } from '@/components/support/SupportChat';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(t('contact.thankYou'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <BreadcrumbNav className="mb-4" />
        <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          {t('contact.subtitle')}
        </p>

        <Card className="mb-12">
          <CardContent className="pt-6">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {t('contact.aiChat')}
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('contact.email')}
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t('contact.phone')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('contact.aiChatTitle')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('contact.aiChatDesc')}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('contact.alwaysAvailable')}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {t('contact.instantResponse')}
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-semibold">{t('contact.aiCanHelp')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[1,2,3,4].map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{t(`contact.aiHelp${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => setIsChatMinimized(false)} 
                  className="w-full"
                  size="lg"
                >
                  {t('contact.startChatNow')}
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('contact.emailSupport')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('contact.emailSupportDesc')}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('contact.businessDayResponse')}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Mail className="h-8 w-8 text-primary mb-3 mx-auto" />
                      <h4 className="font-semibold mb-2">{t('contact.generalInquiries')}</h4>
                      <a href="mailto:hello@flowbills.ca" className="text-sm text-primary hover:underline">
                        hello@flowbills.ca
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <MessageSquare className="h-8 w-8 text-primary mb-3 mx-auto" />
                      <h4 className="font-semibold mb-2">{t('contact.technicalSupport')}</h4>
                      <a href="mailto:support@flowbills.ca" className="text-sm text-primary hover:underline">
                        support@flowbills.ca
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Phone className="h-8 w-8 text-primary mb-3 mx-auto" />
                      <h4 className="font-semibold mb-2">{t('contact.salesTeam')}</h4>
                      <a href="mailto:sales@flowbills.ca" className="text-sm text-primary hover:underline">
                        sales@flowbills.ca
                      </a>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CASL:</strong> {t('contact.caslNotice')}
                    </span>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('contact.phoneSupport')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('contact.phoneSupportDesc')}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('contact.phoneHours')}
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t('contact.callTollFree')}</p>
                    <a href="tel:1-800-FLOWBILL" className="text-3xl font-bold text-primary hover:underline">
                      1-800-FLOWBILL
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.afterHours')}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-semibold">{t('contact.whenToCall')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[1,2,3,4].map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{t(`contact.callReason${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <section className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{t('contact.sendMessage')}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t('contact.consentNotice')}
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contact.yourEmail')}</label>
                    <Input type="email" required placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contact.subject')}</label>
                    <Input required placeholder={t('contact.subjectPlaceholder')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contact.message')}</label>
                    <Textarea required placeholder={t('contact.messagePlaceholder')} rows={6} />
                  </div>
                  <Button type="submit" className="w-full">{t('contact.sendButton')}</Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('contact.messageSent')}</h3>
                  <p className="text-muted-foreground">{t('contact.messageResponse')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <SupportChat 
        isMinimized={isChatMinimized} 
        onMinimize={() => setIsChatMinimized(!isChatMinimized)} 
      />
    </div>
  );
}

import { useState } from "react";
import { Check, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrackLink } from "@/components/ui/TrackLink";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { useTranslation } from "react-i18next";
import { 
  PRICING_PLANS, 
  calculateMonthlyBill, 
  formatCurrency,
  getRecommendedPlan 
} from "@/lib/constants/pricing";

export default function Pricing() {
  const { t } = useTranslation();
  const [invoiceVolume, setInvoiceVolume] = useState(2000);
  
  const starterCalc = calculateMonthlyBill('STARTER', invoiceVolume);
  const growthCalc = calculateMonthlyBill('GROWTH', invoiceVolume);
  const recommended = getRecommendedPlan(invoiceVolume);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <BreadcrumbNav className="mb-6" />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Calculator Section */}
        <Card className="mb-16 border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">{t('pricing.calculator')}</CardTitle>
            </div>
            <CardDescription>
              {t('pricing.calculatorDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="volume" className="text-base">
                  {t('pricing.expectedMonthly')}
                </Label>
                <Input
                  id="volume"
                  type="number"
                  value={invoiceVolume}
                  onChange={(e) => setInvoiceVolume(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-32 text-right"
                  min="0"
                  step="100"
                />
              </div>
              <Slider
                value={[invoiceVolume]}
                onValueChange={(value) => setInvoiceVolume(value[0])}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>

            {/* Calculator Results */}
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {t('pricing.starterPlan')}
                  {recommended.plan_id === 'STARTER' && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {t('pricing.recommended')}
                    </span>
                  )}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('pricing.basePrice')}</span>
                    <span className="font-medium">{formatCurrency(starterCalc.base_price_cents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('pricing.includedInvoices')}</span>
                    <span>{PRICING_PLANS.STARTER.included_invoices.toLocaleString()}</span>
                  </div>
                  {starterCalc.overage_count > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pricing.overage')} ({starterCalc.overage_count}):</span>
                      <span className="font-medium">{formatCurrency(starterCalc.overage_price_cents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t font-bold text-base">
                    <span>{t('pricing.total')}</span>
                    <span className="text-primary">{formatCurrency(starterCalc.total_price_cents)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {t('pricing.growthPlan')}
                  {recommended.plan_id === 'GROWTH' && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {t('pricing.recommended')}
                    </span>
                  )}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('pricing.basePrice')}</span>
                    <span className="font-medium">{formatCurrency(growthCalc.base_price_cents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('pricing.includedInvoices')}</span>
                    <span>{PRICING_PLANS.GROWTH.included_invoices.toLocaleString()}</span>
                  </div>
                  {growthCalc.overage_count > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pricing.overage')} ({growthCalc.overage_count}):</span>
                      <span className="font-medium">{formatCurrency(growthCalc.overage_price_cents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t font-bold text-base">
                    <span>{t('pricing.total')}</span>
                    <span className="text-primary">{formatCurrency(growthCalc.total_price_cents)}</span>
                  </div>
                </div>
              </div>
            </div>

            {recommended.plan_id && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm">
                  <strong>💡 {t('pricing.recommendation')}</strong> {recommended.reason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Starter Plan */}
          <Card className="relative flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl">{t('pricing.starter')}</CardTitle>
              <CardDescription className="text-base">
                {t('pricing.starterDesc')}
              </CardDescription>
              <div className="pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{formatCurrency(PRICING_PLANS.STARTER.base_price_cents)}</span>
                  <span className="text-muted-foreground">{t('pricing.perMonth')}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {String(t('pricing.includesUpTo', { count: PRICING_PLANS.STARTER.included_invoices.toLocaleString() }))}
                </p>
                <p className="text-sm text-muted-foreground">
                  {String(t('pricing.perAdditional', { price: formatCurrency(PRICING_PLANS.STARTER.overage_price_per_invoice_cents) }))}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{t(`pricing.starterFeature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <TrackLink to="/auth" source="pricing-starter">
                <Button className="w-full" size="lg" variant="outline">
                  {t('pricing.startFreeTrial')}
                </Button>
              </TrackLink>
            </CardFooter>
          </Card>

          {/* Growth Plan */}
          <Card className="relative flex flex-col border-2 border-primary shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                {t('pricing.mostPopular')}
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-3xl">{t('pricing.growth')}</CardTitle>
              <CardDescription className="text-base">
                {t('pricing.growthDesc')}
              </CardDescription>
              <div className="pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{formatCurrency(PRICING_PLANS.GROWTH.base_price_cents)}</span>
                  <span className="text-muted-foreground">{t('pricing.perMonth')}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('pricing.includesUpTo', { count: PRICING_PLANS.GROWTH.included_invoices.toLocaleString() } as any)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('pricing.perAdditional', { price: formatCurrency(PRICING_PLANS.GROWTH.overage_price_per_invoice_cents) } as any)}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{i === 1 ? <strong>{t(`pricing.growthFeature${i}`)}</strong> : t(`pricing.growthFeature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <TrackLink to="/contact" source="pricing-growth">
                <Button className="w-full" size="lg">
                  {t('pricing.contactSales')}
                </Button>
              </TrackLink>
            </CardFooter>
          </Card>
        </div>

        {/* Enterprise Section */}
        <Card className="mb-16 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{t('pricing.enterprise')}</CardTitle>
            <CardDescription className="text-base">
              {t('pricing.enterpriseDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">{t('pricing.volumeDiscounts')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('pricing.volumeDiscountsDesc')}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">{t('pricing.customIntegrations')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('pricing.customIntegrationsDesc')}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">{t('pricing.whiteGlove')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('pricing.whiteGloveDesc')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <TrackLink to="/contact" source="pricing-enterprise">
                <Button size="lg" variant="outline">
                  {t('pricing.scheduleDemo')}
                </Button>
              </TrackLink>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t('pricing.faqTitle')}</h2>
          <div className="space-y-6">
            {[1,2,3,4,5].map(i => (
              <div key={i}>
                <h3 className="font-semibold text-lg mb-2">{t(`pricing.faq${i}q`)}</h3>
                <p className="text-muted-foreground">{t(`pricing.faq${i}a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import { CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <BreadcrumbNav className="mb-8" />
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t("features.pageTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {t("features.pageSubtitle")}
            <span className="text-foreground font-medium"> {t("features.canadianResidency")}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-4">{t("features.ocr.title")}</CardTitle>
              <CardDescription className="text-base leading-relaxed text-foreground/70">
                {t("features.ocr.pageDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.ocr.feature1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.ocr.feature2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.ocr.feature3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-4">{t("features.duplicate.title")}</CardTitle>
              <CardDescription className="text-base leading-relaxed text-foreground/70">
                {t("features.duplicate.pageDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.duplicate.feature1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.duplicate.feature2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.duplicate.feature3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-4">{t("features.hil.title")}</CardTitle>
              <CardDescription className="text-base leading-relaxed text-foreground/70">
                {t("features.hil.pageDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.hil.feature1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.hil.feature2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t("features.hil.feature3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-12 md:p-16 border border-primary/10">
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.compliance.sectionTitle")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("features.compliance.sectionSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-background/60 backdrop-blur rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t("features.compliance.pipeda")}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t("features.compliance.pipedaDesc")}</p>
              </div>
              <div className="bg-background/60 backdrop-blur rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t("features.compliance.casl")}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t("features.compliance.caslDesc")}</p>
              </div>
              <div className="bg-background/60 backdrop-blur rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t("features.compliance.rls")}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t("features.compliance.rlsDesc")}</p>
              </div>
              <div className="bg-background/60 backdrop-blur rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t("features.compliance.audit")}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t("features.compliance.auditDesc")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

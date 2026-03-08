import { Building2, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <BreadcrumbNav className="mb-4" />
        <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          {t("about.subtitle")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t("about.builtForEnergy")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.builtForEnergyDesc")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t("about.edmontonBased")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.edmontonBasedDesc")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t("about.customerFirst")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.customerFirstDesc")}</p>
            </CardContent>
          </Card>
        </div>

        <section className="bg-muted/50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("about.missionTitle")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("about.missionDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("about.whyTitle")}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">{t("about.dataResidency")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.dataResidencyDesc")}</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">{t("about.industryExpertise")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.industryExpertiseDesc")}</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">{t("about.productionSecurity")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.productionSecurityDesc")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { TrackLink } from "@/components/ui/TrackLink";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card text-card-foreground relative z-50 pointer-events-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <div className="font-semibold text-lg mb-2">FlowBills.ca</div>
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          
          <div>
            <div className="font-semibold mb-2">{t("footer.product")}</div>
            <ul className="space-y-2 text-sm">
              <li><TrackLink to="/features" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.features")}</TrackLink></li>
              <li><TrackLink to="/pricing" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.pricing")}</TrackLink></li>
              <li><TrackLink to="/api-docs" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.api", "API")}</TrackLink></li>
              <li><TrackLink to="/blog" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.blog", "Blog")}</TrackLink></li>
            </ul>
          </div>
          
          <div>
            <div className="font-semibold mb-2">{t("footer.company")}</div>
            <ul className="space-y-2 text-sm">
              <li><TrackLink to="/about" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.about")}</TrackLink></li>
              <li><TrackLink to="/contact" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.contact")}</TrackLink></li>
              <li><TrackLink to="/help" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.helpCenter")}</TrackLink></li>
              <li><TrackLink to="/security" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.security")}</TrackLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="font-semibold mb-2">{t("footer.legal")}</div>
          <ul className="space-y-2 text-sm flex gap-6">
            <li><TrackLink to="/privacy" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</TrackLink></li>
            <li><TrackLink to="/terms" source="footer" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</TrackLink></li>
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            {t("footer.location")}
          </p>
        </div>
      </div>
    </footer>
  );
};

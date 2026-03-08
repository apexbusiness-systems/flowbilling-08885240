import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', shortCode: 'CA', flag: '🇨🇦' },
  { code: 'fr', name: 'Français', shortCode: 'FR', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', shortCode: 'DE', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', shortCode: 'SA', flag: '🇸🇦' },
  { code: 'zh', name: '中文', shortCode: 'CN', flag: '🇨🇳' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Set RTL direction for Arabic
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLanguage.shortCode}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-xs font-medium text-muted-foreground w-5">{lang.shortCode}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

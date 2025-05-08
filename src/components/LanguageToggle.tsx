
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Toggle } from "@/components/ui/toggle";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Toggle 
        pressed={language === 'am'} 
        onPressedChange={toggleLanguage}
        aria-label="Toggle language"
        className="data-[state=on]:bg-primary"
      >
        <span className="text-xs font-medium">
          {language === 'en' ? 'EN' : 'አማ'}
        </span>
      </Toggle>
    </div>
  );
};

export default LanguageToggle;

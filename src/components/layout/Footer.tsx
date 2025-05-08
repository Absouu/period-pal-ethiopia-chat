
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LilyPadLogo from "@/components/LilyPadLogo";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-sm text-gray-500 flex flex-col items-center footer-spacing">
      <div className="flex items-center justify-center mb-4 footer-text">
        <LilyPadLogo size="tiny" className="mr-2" />
        <p>{t('footer.copyright')}</p>
      </div>
      <p className="mt-2 footer-text">{t('footer.privacy')}</p>
    </footer>
  );
};

export default Footer;

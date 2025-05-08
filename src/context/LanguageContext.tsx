
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'am';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Chat Interface
    'chat.welcome': "Hi there! 👋 I'm Selam, your friendly period pal. What would you like to chat about today?",
    'chat.placeholder': "Ask me anything about periods...",
    'chat.send': "Send",
    'chat.powered': "Powered by Lily Pad AI",
    'chat.error': "Sorry, I can't respond right now. Let's try again in a moment! 😊",
    'chat.typing': "Typing...",
    
    // Tabs
    'tabs.chat': "Chat with Selam",
    'tabs.learn': "Learn More",
    'tabs.track': "Track Cycle",
    
    // Header
    'header.title': "Period Pal Ethiopia",
    'header.subtitle': "Your friendly menstrual health companion",
    
    // Buttons
    'button.products': "Products",
    'button.calendar': "Calendar",
    'button.signOut': "Sign Out",
    
    // Footer
    'footer.copyright': "© 2025 Period Pal Ethiopia - In partnership with Lily Pad",
    'footer.privacy': "Your data is securely stored and protected",
    
    // Language
    'language.en': "English",
    'language.am': "አማርኛ",
  },
  am: {
    // Chat Interface
    'chat.welcome': "ሰላም! 👋 እኔ ሰላም ነኝ፣ የወር አበባ ጓደኛዎ። ዛሬ ስለ ምን መወያየት ይፈልጋሉ?",
    'chat.placeholder': "ስለ ወር አበባ ማንኛውንም ጥያቄ ይጠይቁኝ...",
    'chat.send': "ላክ",
    'chat.powered': "በ ሊሊ ፓድ AI የተጎላበተ",
    'chat.error': "ይቅርታ፣ አሁን መመለስ አልችልም። ትንሽ ቆይተን እንሞክር! 😊",
    'chat.typing': "በመጻፍ ላይ...",
    
    // Tabs
    'tabs.chat': "ከሰላም ጋር ይወያዩ",
    'tabs.learn': "ተጨማሪ ይወቁ",
    'tabs.track': "የወር አበባን ይከታተሉ",
    
    // Header
    'header.title': "የወር አበባ ጓደኛ ኢትዮጵያ",
    'header.subtitle': "የጤናማ የወር አበባ ጓደኛዎ",
    
    // Buttons
    'button.products': "ምርቶች",
    'button.calendar': "የቀን መቁጠሪያ",
    'button.signOut': "ውጣ",
    
    // Footer
    'footer.copyright': "© 2025 የወር አበባ ጓደኛ ኢትዮጵያ - ከሊሊ ፓድ ጋር በትብብር",
    'footer.privacy': "የእርስዎ ዳታ በደህንነት የተከማቸ እና የተጠበቀ ነው",
    
    // Language
    'language.en': "English",
    'language.am': "አማርኛ",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

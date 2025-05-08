
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'header.title': 'Lilly',
    'header.subtitle': 'Your Menstrual Health Guide',
    'button.signIn': 'Sign In',
    'button.signUp': 'Sign Up',
    'button.signOut': 'Sign Out',
    'button.products': 'Products',
    'button.calendar': 'Calendar',
    'navigation.menu': 'Menu',
    'tabs.chat': 'Chat with Lilly',
    'tabs.learn': 'Learn More',
    'tabs.track': 'Track Cycle',
    'chat.welcome': 'Hi there! 👋 Welcome to Period Pal Ethiopia. I\'m Lilly. How can I help you today?',
    'chat.typing': 'Lilly is typing...',
    'chat.placeholder': 'Type your message...',
    'chat.error': 'Sorry, I couldn\'t process your request. Please try again.',
    'chat.powered': 'Powered by',
    'form.title': 'Track Your Cycle',
    'form.startDate': 'Period Start Date',
    'form.symptoms': 'Symptoms',
    'form.mood': 'Mood',
    'form.submit': 'Save',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    'auth.forgotPassword': 'Forgot password?',
    'auth.error': 'Authentication failed. Please try again.',
    'footer.copyright': '© 2025 Period Pal Ethiopia',
    'footer.privacy': 'Privacy Policy',
    'tips.title': 'Helpful Tips',
    'tips.periods': 'About Periods',
    'tips.products': 'Menstrual Products',
    'tips.health': 'Menstrual Health',
    'reminder.title': 'Period Reminder',
    'reminder.message': 'Your period may be starting soon. Stock up on supplies!'
  },
  am: {
    'header.title': 'ሊሊ',
    'header.subtitle': 'የወር አበባ ጤና መመሪያዎ',
    'button.signIn': 'ግባ',
    'button.signUp': 'ይመዝገቡ',
    'button.signOut': 'ውጣ',
    'button.products': 'ምርቶች',
    'button.calendar': 'ቀን መቁጠሪያ',
    'navigation.menu': 'ምናሌ',
    'tabs.chat': 'ከሊሊ ጋር ያውራ',
    'tabs.learn': 'ተጨማሪ እወቅ',
    'tabs.track': 'ዑደትዎን ይከታተሉ',
    'chat.welcome': 'ሰላም! 👋 ወደ ፒሪየድ ፓል ኢትዮጵያ እንኳን በደህና መጡ። እኔ ሊሊ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?',
    'chat.typing': 'ሊሊ በመጻፍ ላይ...',
    'chat.placeholder': 'መልእክትዎን ይጻፉ...',
    'chat.error': 'ይቅርታ፣ ጥያቄዎን ማቀናበር አልቻልኩም። እባክዎ እንደገና ይሞክሩ።',
    'chat.powered': 'በሚያስሰራው',
    'form.title': 'ዑደትዎን ይከታተሉ',
    'form.startDate': 'የወር አበባ መጀመሪያ ቀን',
    'form.symptoms': 'ምልክቶች',
    'form.mood': 'ስሜት',
    'form.submit': 'አስቀምጥ',
    'auth.email': 'ኢሜይል',
    'auth.password': 'የይለፍ ቃል',
    'auth.signIn': 'ግባ',
    'auth.signUp': 'ይመዝገቡ',
    'auth.noAccount': 'መለያ የለዎትም?',
    'auth.haveAccount': 'አስቀድሞ መለያ አለዎት?',
    'auth.forgotPassword': 'የይለፍ ቃልዎን ረሱ?',
    'auth.error': 'ማረጋገጫው አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
    'footer.copyright': '© 2025 ፒሪየድ ፓል ኢትዮጵያ',
    'footer.privacy': 'የግል መብት ፖሊሲ',
    'tips.title': 'ጠቃሚ ምክሮች',
    'tips.periods': 'ስለ የወር አበባ',
    'tips.products': 'የወር አበባ ምርቶች',
    'tips.health': 'የወር አበባ ጤና',
    'reminder.title': 'የወር አበባ ማስታወሻ',
    'reminder.message': 'የወር አበባዎ በቅርቡ ሊጀምር ይችላል። አቅርቦቶችን ያከማቹ!'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>("en");

  const t = (key: string) => {
    return translations[language as keyof typeof translations][key as keyof (typeof translations)["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

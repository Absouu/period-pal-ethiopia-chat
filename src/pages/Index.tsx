import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, ShoppingBag } from "lucide-react";
import { CharacterMood } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

// Lazy-loaded components
const CharacterDisplay = lazy(() => import("@/components/CharacterDisplay"));
const ChatInterface = lazy(() => import("@/components/ChatInterface"));
const EducationalContent = lazy(() => import("@/components/EducationalContent"));
const CycleDataForm = lazy(() => import("@/components/CycleDataForm"));
const Auth = lazy(() => import("@/components/Auth"));

// Loading placeholder components
const CharacterSkeleton = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Skeleton className="h-32 w-32 rounded-full" />
    <Skeleton className="h-4 w-48 mt-4" />
  </div>
);

const ContentSkeleton = () => (
  <div className="space-y-4 py-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const Index = () => {
  const [characterMood, setCharacterMood] = useState<CharacterMood>("neutral");
  const { authState, signOut } = useAuth();
  const { user, isLoading } = authState;
  const [activeTab, setActiveTab] = useState<string>("chat");
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-slate-200 h-24 w-24 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center relative">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{t('header.title')}</h1>
          <p className="text-lg text-gray-600">{t('header.subtitle')}</p>
          
          <div className="absolute right-0 top-0 flex gap-2 items-center">
            <LanguageToggle />
            
            {user && (
              <>
                <Link to="/products">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('button.products')}</span>
                  </Button>
                </Link>
                <Link to="/calendar">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('button.calendar')}</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('button.signOut')}</span>
                </Button>
              </>
            )}
          </div>
        </header>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <Suspense fallback={<CharacterSkeleton />}>
            <CharacterDisplay mood={characterMood} />
          </Suspense>
          
          {!user ? (
            <Suspense fallback={<ContentSkeleton />}>
              <Auth />
            </Suspense>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="chat">{t('tabs.chat')}</TabsTrigger>
                <TabsTrigger value="learn">{t('tabs.learn')}</TabsTrigger>
                <TabsTrigger value="track">{t('tabs.track')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="focus:outline-none">
                <Suspense fallback={<ContentSkeleton />}>
                  {activeTab === "chat" && (
                    <ChatInterface onMoodChange={setCharacterMood} />
                  )}
                </Suspense>
              </TabsContent>
              
              <TabsContent value="learn" className="focus:outline-none">
                <Suspense fallback={<ContentSkeleton />}>
                  {activeTab === "learn" && <EducationalContent />}
                </Suspense>
              </TabsContent>
              
              <TabsContent value="track" className="focus:outline-none">
                <Suspense fallback={<ContentSkeleton />}>
                  {activeTab === "track" && (
                    <>
                      <CycleDataForm />
                      
                      <div className="mt-8 text-center">
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Link to="/calendar" className="inline-flex items-center">
                            <Button className="flex items-center gap-2 w-full">
                              <CalendarIcon className="w-5 h-5" />
                              {t('button.calendar')}
                            </Button>
                          </Link>
                          <Link to="/products" className="inline-flex items-center">
                            <Button className="flex items-center gap-2 w-full">
                              <ShoppingBag className="w-5 h-5" />
                              {t('button.products')}
                            </Button>
                          </Link>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {language === 'en' 
                            ? 'Track your cycle and access quality menstrual products'
                            : 'የወር አበባዎ�� ይከታተሉ እና ጥራት ያላቸው የወር አበባ ምርቶችን ይጠቀሙ'}
                        </p>
                      </div>
                    </>
                  )}
                </Suspense>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <footer className="text-center text-sm text-gray-500">
          <p>{t('footer.copyright')}</p>
          <p className="mt-1">{t('footer.privacy')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

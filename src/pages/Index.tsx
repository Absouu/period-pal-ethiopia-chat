import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, ShoppingBag, LogOut, Menu, Star } from "lucide-react";
import { CharacterMood } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LilyPadLogo from "@/components/LilyPadLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
        <header className="mb-8 relative">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-4 sm:mb-0 flex items-center">
              <LilyPadLogo className="hidden sm:flex mr-3" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary flex items-center">
                  <LilyPadLogo size="small" className="sm:hidden mr-2" />
                  {t('header.title')}
                </h1>
                <p className="text-lg text-gray-600">{t('header.subtitle')}</p>
              </div>
            </div>
            
            {user && (
              <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                <LanguageToggle />
                
                <div className="hidden sm:block">
                  <Link to="/products">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('button.products')}</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="hidden sm:block">
                  <Link to="/calendar">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>{t('button.calendar')}</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="hidden sm:block">
                  <Link to="/rewards">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                    >
                      <Star className="w-4 h-4" />
                      <span>Rewards</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="hidden sm:block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={signOut}
                    className="flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('button.signOut')}</span>
                  </Button>
                </div>
                
                {/* Mobile navigation menu */}
                <div className="sm:hidden">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-white">
                          <Menu className="w-4 h-4 mr-1" />
                          {t('navigation.menu')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[200px] bg-white p-2 rounded-md shadow-md">
                            <Link to="/products" className="block p-2 hover:bg-muted rounded-md">
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                {t('button.products')}
                              </div>
                            </Link>
                            <Link to="/calendar" className="block p-2 hover:bg-muted rounded-md">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {t('button.calendar')}
                              </div>
                            </Link>
                            <Link to="/rewards" className="block p-2 hover:bg-muted rounded-md">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Rewards
                              </div>
                            </Link>
                            <button 
                              onClick={signOut}
                              className="w-full text-left p-2 hover:bg-muted rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                {t('button.signOut')}
                              </div>
                            </button>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            )}
            
            {!user && (
              <div className="flex items-center">
                <LanguageToggle />
              </div>
            )}
          </div>
        </header>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <Suspense fallback={<CharacterSkeleton />}>
            <div className="flex items-center justify-center">
              <CharacterDisplay mood={characterMood} />
            </div>
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
                            : 'የወር አበባዎን ይከታተሉ እና ጥራት ያላቸው የወር አበባ ምርቶችን ይጠቀሙ'}
                        </p>
                      </div>
                    </>
                  )}
                </Suspense>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <footer className="text-center text-sm text-gray-500 flex flex-col items-center footer-spacing">
          <div className="flex items-center justify-center mb-4 footer-text">
            <LilyPadLogo size="tiny" className="mr-2" />
            <p>{t('footer.copyright')}</p>
          </div>
          <p className="mt-2 footer-text">{t('footer.privacy')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

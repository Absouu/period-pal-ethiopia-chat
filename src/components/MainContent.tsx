
import React, { lazy, Suspense, useState } from "react";
import { CharacterMood } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import ChatTabContent from "./TabsContent/ChatTabContent";
import LearnTabContent from "./TabsContent/LearnTabContent";
import TrackTabContent from "./TabsContent/TrackTabContent";
import AuthTabContent from "./TabsContent/AuthTabContent";

// Lazy-loaded components
const CharacterDisplay = lazy(() => import("@/components/CharacterDisplay"));

// Loading placeholder components
const CharacterSkeleton = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Skeleton className="h-32 w-32 rounded-full" />
    <Skeleton className="h-4 w-48 mt-4" />
  </div>
);

const MainContent: React.FC = () => {
  const [characterMood, setCharacterMood] = useState<CharacterMood>("neutral");
  const [activeTab, setActiveTab] = useState<string>("chat");
  const { t } = useLanguage();
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <Suspense fallback={<CharacterSkeleton />}>
        <div className="flex items-center justify-center">
          <CharacterDisplay mood={characterMood} />
        </div>
      </Suspense>
      
      {!user ? (
        <AuthTabContent />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat">{t('tabs.chat')}</TabsTrigger>
            <TabsTrigger value="learn">{t('tabs.learn')}</TabsTrigger>
            <TabsTrigger value="track">{t('tabs.track')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="focus:outline-none">
            <ChatTabContent onMoodChange={setCharacterMood} isActive={activeTab === "chat"} />
          </TabsContent>
          
          <TabsContent value="learn" className="focus:outline-none">
            <LearnTabContent isActive={activeTab === "learn"} />
          </TabsContent>
          
          <TabsContent value="track" className="focus:outline-none">
            <TrackTabContent isActive={activeTab === "track"} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MainContent;


import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterDisplay from "@/components/CharacterDisplay";
import ChatInterface from "@/components/ChatInterface";
import EducationalContent from "@/components/EducationalContent";
import CycleDataForm from "@/components/CycleDataForm";
import { CharacterMood } from "@/types";

const Index = () => {
  const [characterMood, setCharacterMood] = useState<CharacterMood>("neutral");

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Period Pal Ethiopia</h1>
          <p className="text-lg text-gray-600">Your friendly menstrual health companion</p>
        </header>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <CharacterDisplay mood={characterMood} />
          
          <Tabs defaultValue="chat" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="chat">Chat with Selam</TabsTrigger>
              <TabsTrigger value="learn">Learn More</TabsTrigger>
              <TabsTrigger value="track">Track Cycle</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="focus:outline-none">
              <ChatInterface onMoodChange={setCharacterMood} />
            </TabsContent>
            
            <TabsContent value="learn" className="focus:outline-none">
              <EducationalContent />
            </TabsContent>
            
            <TabsContent value="track" className="focus:outline-none">
              <CycleDataForm />
            </TabsContent>
          </Tabs>
        </div>
        
        <footer className="text-center text-sm text-gray-500">
          <p>© 2025 Period Pal Ethiopia - Educational menstrual health app</p>
          <p className="mt-1">This app stores data locally on your device only</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

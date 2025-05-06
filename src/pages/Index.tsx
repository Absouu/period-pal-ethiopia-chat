
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import ChatInterface from "@/components/ChatInterface";
import EducationalContent from "@/components/EducationalContent";
import CycleDataForm from "@/components/CycleDataForm";
import Auth from "@/components/Auth";
import { CharacterMood } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const [characterMood, setCharacterMood] = useState<CharacterMood>("neutral");
  const { authState, signOut } = useAuth();
  const { user, isLoading } = authState;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center relative">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Period Pal Ethiopia</h1>
          <p className="text-lg text-gray-600">Your friendly menstrual health companion</p>
          
          <div className="absolute right-0 top-0 flex gap-2">
            {user && (
              <>
                <Link to="/calendar">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Calendar</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            )}
          </div>
        </header>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <CharacterDisplay mood={characterMood} />
          
          {!user ? (
            <Auth />
          ) : (
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
                
                <div className="mt-8 text-center">
                  <Link to="/calendar" className="inline-flex items-center">
                    <Button className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      View Full Calendar
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">
                    See your complete cycle history and predictions
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <footer className="text-center text-sm text-gray-500">
          <p>© 2025 Period Pal Ethiopia - Educational menstrual health app</p>
          <p className="mt-1">Your data is securely stored and protected</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

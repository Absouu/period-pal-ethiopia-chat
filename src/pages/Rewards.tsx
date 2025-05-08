
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BadgeCard from "@/components/rewards/BadgeCard";
import PointsCounter from "@/components/rewards/PointsCounter";
import DiscountBanner from "@/components/rewards/DiscountBanner";
import LilyPadLogo from "@/components/LilyPadLogo";
import { getUserRewards } from "@/data/rewardsData";
import { Badge } from "@/types";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { authState } = useAuth();
  const { user } = authState;
  const userRewards = getUserRewards();

  const filteredBadges = activeTab === "all" 
    ? userRewards.badges 
    : userRewards.badges.filter(badge => badge.category === activeTab || (activeTab === "unlocked" && badge.isUnlocked));

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted py-8 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <LilyPadLogo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-4">Sign In Required</h1>
          <p className="text-lg text-gray-600 mb-6">
            Please sign in to view your rewards and achievements.
          </p>
          <Link to="/" className="mt-4 inline-block">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center relative">
          <Link to="/" className="absolute left-0 top-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </Link>
          
          <div className="flex items-center justify-center mb-2">
            <LilyPadLogo />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary ml-3">Your Rewards</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">Track your achievements and earn rewards</p>
          
          <div className="flex justify-center my-6">
            <PointsCounter points={userRewards.points} />
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <DiscountBanner />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="focus:outline-none">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBadges.map((badge: Badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
              
              {filteredBadges.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No badges found in this category yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">How to Earn More Points</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Track your cycle consistently</li>
              <li>Read educational articles in the Learn section</li>
              <li>Chat with Period Pal and ask questions</li>
              <li>Explore sustainable period products</li>
              <li>Complete your profile information</li>
            </ul>
          </div>
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8 flex flex-col items-center footer-spacing">
          <div className="flex items-center justify-center mb-4 footer-text">
            <LilyPadLogo size="tiny" className="mr-2" />
            <p>© 2025 Period Pal Ethiopia - In partnership with Lily Pad</p>
          </div>
          <p className="mt-2 footer-text">Your data is securely stored and protected</p>
        </footer>
      </div>
    </div>
  );
};

export default Rewards;


import React, { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterMood } from "@/types";

const ChatInterface = lazy(() => import("@/components/ChatInterface"));

interface ChatTabContentProps {
  onMoodChange: (mood: CharacterMood) => void;
  isActive: boolean;
}

const ContentSkeleton = () => (
  <div className="space-y-4 py-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const ChatTabContent: React.FC<ChatTabContentProps> = ({ onMoodChange, isActive }) => {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      {isActive && (
        <ChatInterface onMoodChange={onMoodChange} />
      )}
    </Suspense>
  );
};

export default ChatTabContent;


import { Badge } from "@/types";

export const mockBadges: Badge[] = [
  {
    id: "cycle-star",
    name: "Cycle Star",
    description: "Track your cycle for 3 consecutive months",
    icon: "🌟",
    isUnlocked: true,
    points: 50,
    category: "tracking"
  },
  {
    id: "myth-buster",
    name: "Myth Buster",
    description: "Read 5 educational articles about menstrual health",
    icon: "🔍",
    isUnlocked: true,
    points: 30,
    category: "education"
  },
  {
    id: "chat-champion",
    name: "Chat Champion",
    description: "Ask 10 questions to Period Pal",
    icon: "💬",
    isUnlocked: false,
    points: 25,
    category: "education"
  },
  {
    id: "sustainable-supporter",
    name: "Sustainable Supporter",
    description: "Explore eco-friendly period products",
    icon: "🌱",
    isUnlocked: false,
    points: 40,
    category: "community"
  },
  {
    id: "period-pioneer",
    name: "Period Pioneer",
    description: "Complete your profile and personalize your experience",
    icon: "star",
    isUnlocked: true,
    points: 20,
    category: "general"
  }
];

export const getUserRewards = () => {
  // In a real application, this would fetch from a database
  return {
    points: 100,
    badges: mockBadges
  };
};

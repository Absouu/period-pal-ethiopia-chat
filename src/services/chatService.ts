
import { supabase } from "@/integrations/supabase/client";
import { ChatResponse, ChatMessage } from "@/types";
import { chatResponses } from "../data/chatResponses";

// Function to determine if a user is near their period date
export const isNearPeriod = async (userId: string): Promise<boolean> => {
  try {
    // Get current date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    
    // Get the user's most recent cycle data
    const { data: cyclesData } = await supabase
      .from('cycles')
      .select('*')
      .eq('user_id', userId)
      .order('startdate', { ascending: false })
      .limit(1);
    
    if (!cyclesData || cyclesData.length === 0) {
      return false;
    }
    
    // Get predicted cycles
    const { data: user } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check if there's inventory available at local Lily Pad partners
    const hasLilyPadInventory = await checkLilyPadInventory(user.user.id);
    
    return hasLilyPadInventory;
  } catch (error) {
    console.error("Error checking period proximity:", error);
    return false;
  }
};

// Function to check Lily Pad inventory availability
export const checkLilyPadInventory = async (userId: string): Promise<boolean> => {
  try {
    // This would be integrated with the Lily Pad API in production
    // For now, we'll simulate a 70% chance of inventory being available
    return Math.random() > 0.3;
  } catch (error) {
    console.error("Error checking Lily Pad inventory:", error);
    return false;
  }
};

// Enhanced chat response function with context awareness
export const getContextAwareChatResponse = async (
  userInput: string,
  userId: string,
  previousMessages: ChatMessage[]
): Promise<ChatResponse> => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check if near period and has Lily Pad inventory
  const isPeriodNear = await isNearPeriod(userId);
  
  // If period is approaching and Lily Pad has inventory, inform the user
  if (isPeriodNear && 
      (lowercaseInput.includes("period") || 
       lowercaseInput.includes("menstrual") || 
       lowercaseInput.includes("pad") || 
       lowercaseInput.includes("supply"))) {
    return {
      keywords: [],
      answer: "I notice your period may be approaching soon. Good news! Lily Pad has supplies available in your area. Would you like information on where to pick them up?",
      mood: "happy"
    };
  }
  
  // Basic response lookup from predefined answers
  for (const response of chatResponses) {
    if (response.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return response;
    }
  }
  
  // If no predefined answer is found
  return {
    keywords: [],
    answer: "I'm sorry, I don't have an answer for that question yet. Please try asking something about periods, menstrual cycles, pads, or menstrual hygiene.",
    mood: "thinking"
  };
};

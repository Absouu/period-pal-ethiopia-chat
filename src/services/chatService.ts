
import { supabase } from "@/integrations/supabase/client";

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

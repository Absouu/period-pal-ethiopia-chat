
import { supabase } from "@/utils/supabase";
import { CycleData } from "@/types";

export const saveCycleData = async (cycleData: CycleData): Promise<CycleData | null> => {
  try {
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Add user_id to the cycle data
    const dataWithUser = {
      ...cycleData,
      user_id: user.id,
    };

    // Insert the data into the cycles table
    const { data, error } = await supabase
      .from('cycles')
      .insert([dataWithUser])
      .select();

    if (error) {
      throw error;
    }

    return data[0] as CycleData;
  } catch (error) {
    console.error('Error saving cycle data:', error);
    return null;
  }
};

export const getUserCycleData = async (): Promise<CycleData[]> => {
  try {
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    // Get cycle data for the current user
    const { data, error } = await supabase
      .from('cycles')
      .select('*')
      .eq('user_id', user.id)
      .order('startDate', { ascending: false });

    if (error) {
      throw error;
    }

    return data as CycleData[];
  } catch (error) {
    console.error('Error fetching cycle data:', error);
    return [];
  }
};

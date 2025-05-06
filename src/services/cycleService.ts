
import { supabase } from "@/integrations/supabase/client";
import { CycleData } from "@/types";
import { toast } from "@/components/ui/sonner";

export const saveCycleData = async (cycleData: CycleData): Promise<CycleData | null> => {
  try {
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Format data to match database schema (convert startDate to startdate)
    const dataForDb = {
      startdate: cycleData.startDate,
      symptoms: cycleData.symptoms,
      user_id: user.id,
    };

    // Check if entry already exists for this date and user
    const { data: existingData, error: fetchError } = await supabase
      .from('cycles')
      .select('id')
      .eq('user_id', user.id)
      .eq('startdate', cycleData.startDate)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected for new entries
      console.error('Error checking for existing data:', fetchError);
    }

    let data;
    let error;

    if (existingData?.id) {
      // Update existing entry
      const result = await supabase
        .from('cycles')
        .update(dataForDb)
        .eq('id', existingData.id)
        .select();
      
      data = result.data;
      error = result.error;
    } else {
      // Insert new entry
      const result = await supabase
        .from('cycles')
        .insert(dataForDb)
        .select();
      
      data = result.data;
      error = result.error;
    }

    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist
        toast.error(
          "Database table 'cycles' doesn't exist", 
          { description: "Please create the necessary table in your Supabase project" }
        );
      }
      throw error;
    }

    // Transform data from database format back to app format
    if (data && data.length > 0) {
      return {
        id: data[0].id,
        startDate: data[0].startdate,
        symptoms: data[0].symptoms || "",
        user_id: data[0].user_id,
        created_at: data[0].created_at
      };
    }
    
    return null;
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
      .order('startdate', { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist - return empty array instead of showing error
        console.log("Database table 'cycles' doesn't exist. Please create it in your Supabase project.");
        return [];
      }
      throw error;
    }

    // Transform data from database format to app format
    return data.map(item => ({
      id: item.id,
      startDate: item.startdate,
      symptoms: item.symptoms || "",
      user_id: item.user_id,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error('Error fetching cycle data:', error);
    return [];
  }
};

// New function to delete cycle data
export const deleteCycleData = async (cycleId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cycles')
      .delete()
      .eq('id', cycleId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting cycle data:', error);
    return false;
  }
};

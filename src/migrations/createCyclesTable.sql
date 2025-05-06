
-- Create the cycles table
CREATE TABLE public.cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  startDate TEXT NOT NULL,
  symptoms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Add an index on user_id and startDate for faster queries
  CONSTRAINT cycles_user_id_startdate_key UNIQUE (user_id, startDate)
);

-- Set up Row Level Security
ALTER TABLE public.cycles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own cycle data
CREATE POLICY "Users can insert their own cycle data" 
  ON public.cycles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to view their own cycle data
CREATE POLICY "Users can view their own cycle data" 
  ON public.cycles FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to update their own cycle data
CREATE POLICY "Users can update their own cycle data" 
  ON public.cycles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own cycle data
CREATE POLICY "Users can delete their own cycle data" 
  ON public.cycles FOR DELETE 
  USING (auth.uid() = user_id);

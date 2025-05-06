
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { CycleData } from "../types";
import { useAuth } from "../context/AuthContext";
import { saveCycleData, getUserCycleData } from "../services/cycleService";

const CycleDataForm = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string>("");
  const [cycleHistory, setCycleHistory] = useState<CycleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.user) {
      fetchCycleData();
    }
  }, [authState.user]);

  const fetchCycleData = async () => {
    if (!authState.user) return;

    try {
      const data = await getUserCycleData();
      setCycleHistory(data);
    } catch (error) {
      console.error("Error fetching cycle data:", error);
      toast.error("Failed to load your cycle history");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      toast.error("Please enter a start date");
      return;
    }

    if (!authState.user) {
      toast.error("Please sign in to save your cycle data");
      return;
    }
    
    const newEntry: CycleData = {
      startDate,
      symptoms
    };
    
    setLoading(true);
    try {
      const savedData = await saveCycleData(newEntry);
      
      if (savedData) {
        toast.success("Your cycle data has been saved", {
          description: "This information is stored securely"
        });
        
        // Reset form
        setStartDate("");
        setSymptoms("");
        
        // Refresh cycle history
        fetchCycleData();
      } else {
        throw new Error("Failed to save cycle data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save your cycle data");
    } finally {
      setLoading(false);
    }
  };

  if (!authState.user) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-secondary/30 rounded-t-lg">
          <CardTitle className="text-primary">Track Your Cycle</CardTitle>
          <CardDescription>
            Please sign in to track your menstrual cycle
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 text-center py-10">
          <p className="text-muted-foreground mb-4">
            Sign in or create an account to track your menstrual cycle and symptoms
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary/30 rounded-t-lg">
        <CardTitle className="text-primary">Track Your Cycle</CardTitle>
        <CardDescription>
          Record information about your menstrual cycle
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Period Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms (Optional)</Label>
            <Textarea
              id="symptoms"
              placeholder="Cramps, headache, mood changes, etc."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          {cycleHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Recent Cycle History</h3>
              <div className="max-h-[200px] overflow-y-auto space-y-2">
                {cycleHistory.slice(0, 3).map((cycle, index) => (
                  <div key={cycle.id || index} className="bg-secondary/10 p-3 rounded-md">
                    <p className="font-medium">Start Date: {new Date(cycle.startDate).toLocaleDateString()}</p>
                    {cycle.symptoms && <p className="text-sm text-muted-foreground">Symptoms: {cycle.symptoms}</p>}
                  </div>
                ))}
                {cycleHistory.length > 3 && (
                  <p className="text-sm text-center text-muted-foreground">
                    + {cycleHistory.length - 3} more entries
                  </p>
                )}
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            Your data is stored securely. We respect your privacy and only use anonymized data to improve our services.
          </p>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/80"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Data"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CycleDataForm;

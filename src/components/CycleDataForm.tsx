
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/chatUtils";
import { toast } from "@/components/ui/sonner";
import { CycleData } from "../types";

const CycleDataForm = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      toast.error("Please enter a start date");
      return;
    }
    
    const newEntry: CycleData = {
      startDate,
      symptoms
    };
    
    // Get existing data or initialize empty array
    const existingData = getFromLocalStorage("cycleData") || [];
    const updatedData = [...existingData, newEntry];
    
    // Save to local storage
    saveToLocalStorage("cycleData", updatedData);
    
    toast.success("Your cycle data has been saved", {
      description: "This information is stored only on your device"
    });
    
    // Reset form
    setStartDate("");
    setSymptoms("");
  };

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
          
          <p className="text-xs text-muted-foreground">
            Your data helps improve health resources anonymously.
            All information is stored locally on your device only.
          </p>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
            Save Data
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CycleDataForm;

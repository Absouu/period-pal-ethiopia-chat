
import React, { useState } from 'react';
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CycleData } from "@/types";
import { saveCycleData, deleteCycleData } from "@/services/cycleService";
import { toast } from "@/components/ui/sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Smile, Frown, Meh } from "lucide-react";

interface CycleDetailProps {
  date: Date;
  existingData?: CycleData;
  isPredicted?: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CycleDetail: React.FC<CycleDetailProps> = ({
  date,
  existingData,
  isPredicted = false,
  onClose,
  onSave,
}) => {
  const [symptoms, setSymptoms] = useState<string>(existingData?.symptoms || "");
  const [mood, setMood] = useState<string>(existingData?.mood || "neutral");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      
      await saveCycleData({
        id: existingData?.id,
        startDate: formattedDate,
        symptoms,
        mood
      });
      
      toast.success("Cycle data saved successfully");
      onSave();
    } catch (error) {
      console.error("Error saving cycle data:", error);
      toast.error("Failed to save cycle data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingData?.id) {
      toast.error("Cannot delete: No ID found");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await deleteCycleData(existingData.id);
      
      if (success) {
        toast.success("Cycle data deleted successfully");
        onSave(); // This will refresh the calendar
      } else {
        toast.error("Failed to delete cycle data");
      }
    } catch (error) {
      console.error("Error deleting cycle data:", error);
      toast.error("Failed to delete cycle data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {isPredicted ? "Predicted Period" : "Period Details"} - {format(date, "PPP")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mood">How are you feeling?</Label>
            <ToggleGroup type="single" value={mood} onValueChange={(value) => setMood(value || "neutral")} className="justify-center">
              <ToggleGroupItem value="happy" aria-label="Happy">
                <Smile className="h-5 w-5 mr-1" />
                Good
              </ToggleGroupItem>
              <ToggleGroupItem value="neutral" aria-label="Neutral">
                <Meh className="h-5 w-5 mr-1" />
                Okay
              </ToggleGroupItem>
              <ToggleGroupItem value="sad" aria-label="Sad">
                <Frown className="h-5 w-5 mr-1" />
                Not Great
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms & Notes</Label>
            <Textarea
              id="symptoms"
              placeholder="Add any symptoms or notes for this day"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
          
          {isPredicted && (
            <div className="text-sm text-muted-foreground">
              <p>This is a predicted period date based on your cycle history.</p>
              <p>You can confirm this date by saving it or update it later.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
        {existingData && !isPredicted && existingData.id && (
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CycleDetail;

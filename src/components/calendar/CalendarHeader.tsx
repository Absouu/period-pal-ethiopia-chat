
import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentMonth, 
  onPreviousMonth, 
  onNextMonth 
}) => {
  return (
    <CardHeader className="bg-secondary/30 rounded-t-lg flex flex-row items-center justify-between">
      <CardTitle className="text-primary">Your Cycle Calendar</CardTitle>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onPreviousMonth} aria-label="Previous month">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <Button variant="outline" size="icon" onClick={onNextMonth} aria-label="Next month">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default CalendarHeader;

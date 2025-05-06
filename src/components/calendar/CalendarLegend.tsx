
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CalendarLegendProps {
  averageCycleLength: number;
}

const CalendarLegend: React.FC<CalendarLegendProps> = ({ averageCycleLength }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-center space-x-3">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
          <span className="text-sm">Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-200 mr-1"></div>
          <span className="text-sm">Predicted Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-200 mr-1"></div>
          <span className="text-sm">Fertile Window</span>
        </div>
      </div>
      <div className="mt-2 text-center text-sm">
        <Badge variant="secondary" className="font-normal">Average Cycle: {averageCycleLength} days</Badge>
      </div>
    </div>
  );
};

export default CalendarLegend;

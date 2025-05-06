
import React from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CyclePhase } from "@/services/cyclePredictionService";

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  cyclePhase?: CyclePhase;
  isToday?: boolean;
  isPredicted?: boolean;
  onClick?: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  cyclePhase = 'none',
  isToday = false,
  isPredicted = false,
  onClick,
}) => {
  const dayClasses = cn(
    "h-10 w-10 rounded-full flex items-center justify-center text-sm relative",
    {
      "opacity-40": !isCurrentMonth,
      "font-bold": isToday,
      "border-2 border-primary": isToday,
      "bg-red-400 text-white hover:bg-red-500": cyclePhase === 'period' && !isPredicted,
      "bg-red-200 text-gray-700 hover:bg-red-300": cyclePhase === 'period' && isPredicted,
      "bg-amber-200 text-gray-700 hover:bg-amber-300": cyclePhase === 'fertile',
      "hover:bg-gray-100": cyclePhase === 'regular' || cyclePhase === 'none',
      "cursor-pointer": onClick,
    }
  );

  return (
    <button 
      className={dayClasses} 
      onClick={onClick}
      disabled={!isCurrentMonth}
    >
      {format(date, "d")}
      {isPredicted && (
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gray-400" />
      )}
    </button>
  );
};

export default CalendarDay;


import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { CyclePhase, determineCyclePhase } from "@/services/cyclePredictionService";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  currentMonth: Date;
  averageCycleLength: number;
  averagePeriodDuration: number;
  cycleData: any[];
  isPredictedCycle: (date: Date) => boolean;
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  averageCycleLength,
  averagePeriodDuration,
  cycleData,
  isPredictedCycle,
  onDateClick
}) => {
  // Create calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  // Create weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekdays.map((day) => (
        <div key={day} className="text-center font-medium text-sm text-muted-foreground">
          {day}
        </div>
      ))}
      
      {days.map((day, dayIdx) => {
        const isCurrentMonthDay = isSameMonth(day, currentMonth);
        const isToday = isSameDay(day, new Date());
        const cyclePhase = determineCyclePhase(day, cycleData, averagePeriodDuration, averageCycleLength);
        const isPredicted = isPredictedCycle(day);
        
        return (
          <div key={dayIdx} className="flex justify-center">
            <CalendarDay
              date={day}
              isCurrentMonth={isCurrentMonthDay}
              cyclePhase={cyclePhase}
              isToday={isToday}
              isPredicted={isPredicted}
              onClick={() => isCurrentMonthDay && onDateClick(day)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;

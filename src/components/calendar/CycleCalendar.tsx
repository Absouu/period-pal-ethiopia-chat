
import React, { useState, useEffect } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CycleData } from "@/types";
import { getUserCycleData } from "@/services/cycleService";
import { 
  calculateAverageCycleLength, 
  calculateAveragePeriodDuration,
  determineCyclePhase,
  predictNextCycles
} from "@/services/cyclePredictionService";
import CalendarDay from "./CalendarDay";
import CycleDetail from "./CycleDetail";

const CycleCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [cycleData, setCycleData] = useState<CycleData[]>([]);
  const [predictedCycles, setPredictedCycles] = useState<CycleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [averageCycleLength, setAverageCycleLength] = useState<number>(28);
  const [averagePeriodDuration, setAveragePeriodDuration] = useState<number>(5);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCycleData();
  }, []);

  const fetchCycleData = async () => {
    setLoading(true);
    try {
      const data = await getUserCycleData();
      setCycleData(data);
      
      const avgCycleLength = calculateAverageCycleLength(data);
      setAverageCycleLength(avgCycleLength);
      
      const avgPeriodDuration = calculateAveragePeriodDuration(data);
      setAveragePeriodDuration(avgPeriodDuration);
      
      const predicted = predictNextCycles(data, 3);
      setPredictedCycles(predicted);
    } catch (error) {
      console.error("Error fetching cycle data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setDetailOpen(true);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Create calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  // Find cycle data for the selected date
  const getExistingCycleData = (date: Date): CycleData | undefined => {
    const formatted = format(date, 'yyyy-MM-dd');
    return [...cycleData, ...predictedCycles].find(cycle => cycle.startDate === formatted);
  };

  // Check if a date is a predicted date
  const isPredictedCycle = (date: Date): boolean => {
    const formatted = format(date, 'yyyy-MM-dd');
    return predictedCycles.some(cycle => cycle.startDate === formatted);
  };

  // Create weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-64">
            <p>Loading calendar data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary/30 rounded-t-lg flex flex-row items-center justify-between">
        <CardTitle className="text-primary">Your Cycle Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth} aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          <Button variant="outline" size="icon" onClick={nextMonth} aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
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
                  onClick={() => isCurrentMonthDay && handleDateClick(day)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          {selectedDate && (
            <CycleDetail
              date={selectedDate}
              existingData={getExistingCycleData(selectedDate)}
              isPredicted={isPredictedCycle(selectedDate)}
              onClose={() => setDetailOpen(false)}
              onSave={() => {
                setDetailOpen(false);
                fetchCycleData();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CycleCalendar;

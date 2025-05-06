
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CalendarHeader from './CalendarHeader';
import CalendarLegend from './CalendarLegend';
import CalendarGrid from './CalendarGrid';
import CycleDetail from "./CycleDetail";
import { useCycleData } from './hooks/useCycleData';

const CycleCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  
  const {
    loading,
    cycleData,
    predictedCycles,
    averageCycleLength,
    averagePeriodDuration,
    fetchCycleData,
    getExistingCycleData,
    isPredictedCycle
  } = useCycleData();

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
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />
      <CardContent className="pt-6">
        <CalendarLegend averageCycleLength={averageCycleLength} />
        
        <CalendarGrid
          currentMonth={currentMonth}
          averageCycleLength={averageCycleLength}
          averagePeriodDuration={averagePeriodDuration}
          cycleData={[...cycleData, ...predictedCycles]}
          isPredictedCycle={isPredictedCycle}
          onDateClick={handleDateClick}
        />
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

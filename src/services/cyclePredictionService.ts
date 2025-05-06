
import { CycleData } from "@/types";
import { addDays, differenceInDays, parseISO } from "date-fns";

/**
 * Calculate the average cycle length from historical data
 */
export const calculateAverageCycleLength = (cycles: CycleData[]): number => {
  if (cycles.length < 2) {
    return 28; // Default cycle length if not enough historical data
  }

  // Sort cycles by date in descending order
  const sortedCycles = [...cycles].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  let totalDays = 0;
  let count = 0;

  // Calculate differences between consecutive cycle start dates
  for (let i = 0; i < sortedCycles.length - 1; i++) {
    const currentCycleStart = parseISO(sortedCycles[i].startDate);
    const previousCycleStart = parseISO(sortedCycles[i + 1].startDate);

    const daysDifference = differenceInDays(currentCycleStart, previousCycleStart);
    
    // Only include realistic cycle lengths (21-45 days)
    if (daysDifference >= 21 && daysDifference <= 45) {
      totalDays += daysDifference;
      count++;
    }
  }

  // If no valid differences found, return default
  if (count === 0) return 28;
  
  return Math.round(totalDays / count);
};

/**
 * Calculate the average period duration from historical data
 */
export const calculateAveragePeriodDuration = (cycles: CycleData[]): number => {
  // Default to 5 days if no period duration data available
  return 5;
};

/**
 * Predict the next three cycles based on historical data
 */
export const predictNextCycles = (cycles: CycleData[], count: number = 3): CycleData[] => {
  if (cycles.length === 0) {
    return [];
  }

  // Sort cycles by date in descending order to get the most recent one
  const sortedCycles = [...cycles].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const lastCycleStartDate = parseISO(sortedCycles[0].startDate);
  const averageCycleLength = calculateAverageCycleLength(cycles);
  
  const predictedCycles: CycleData[] = [];
  
  for (let i = 1; i <= count; i++) {
    const predictedStartDate = addDays(lastCycleStartDate, averageCycleLength * i);
    
    predictedCycles.push({
      startDate: predictedStartDate.toISOString().split('T')[0],
      symptoms: "Predicted", // Mark as predicted
      user_id: cycles[0].user_id,
    });
  }
  
  return predictedCycles;
};

/**
 * Calculate the fertile window for a given cycle
 */
export const calculateFertileWindow = (cycleStartDate: string, cycleLength: number) => {
  const startDate = parseISO(cycleStartDate);
  
  // Typical fertile window is around 11-17 days before the next period
  const fertileStart = addDays(startDate, cycleLength - 17);
  const fertileEnd = addDays(startDate, cycleLength - 11);
  
  return { fertileStart, fertileEnd };
};

/**
 * Determine the cycle phase for a given date
 */
export type CyclePhase = 'period' | 'fertile' | 'regular' | 'none';

export const determineCyclePhase = (
  date: Date, 
  cycles: CycleData[],
  averagePeriodDuration: number = 5,
  averageCycleLength: number = 28
): CyclePhase => {
  // Sort cycles by date in descending order
  const sortedCycles = [...cycles].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  
  // Check if the date is during a period
  for (const cycle of sortedCycles) {
    const cycleStartDate = parseISO(cycle.startDate);
    const periodEndDate = addDays(cycleStartDate, averagePeriodDuration);
    
    if (date >= cycleStartDate && date <= periodEndDate) {
      return 'period';
    }
    
    // Calculate fertile window for this cycle
    const { fertileStart, fertileEnd } = calculateFertileWindow(cycle.startDate, averageCycleLength);
    
    if (date >= fertileStart && date <= fertileEnd) {
      return 'fertile';
    }
  }
  
  // Check predicted cycles too
  const predictedCycles = predictNextCycles(cycles);
  for (const cycle of predictedCycles) {
    const cycleStartDate = parseISO(cycle.startDate);
    const periodEndDate = addDays(cycleStartDate, averagePeriodDuration);
    
    if (date >= cycleStartDate && date <= periodEndDate) {
      return 'period';
    }
    
    // Calculate fertile window for this cycle
    const { fertileStart, fertileEnd } = calculateFertileWindow(cycle.startDate, averageCycleLength);
    
    if (date >= fertileStart && date <= fertileEnd) {
      return 'fertile';
    }
  }
  
  return 'regular';
};


import { useState, useEffect } from 'react';
import { CycleData } from "@/types";
import { getUserCycleData } from "@/services/cycleService";
import { 
  calculateAverageCycleLength, 
  calculateAveragePeriodDuration,
  predictNextCycles
} from "@/services/cyclePredictionService";

export const useCycleData = () => {
  const [cycleData, setCycleData] = useState<CycleData[]>([]);
  const [predictedCycles, setPredictedCycles] = useState<CycleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [averageCycleLength, setAverageCycleLength] = useState<number>(28);
  const [averagePeriodDuration, setAveragePeriodDuration] = useState<number>(5);

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

  useEffect(() => {
    fetchCycleData();
  }, []);
  
  // Find cycle data for the selected date
  const getExistingCycleData = (date: Date): CycleData | undefined => {
    const formattedDate = date.toISOString().split('T')[0];
    return [...cycleData, ...predictedCycles].find(cycle => cycle.startDate === formattedDate);
  };

  // Check if a date is a predicted date
  const isPredictedCycle = (date: Date): boolean => {
    const formattedDate = date.toISOString().split('T')[0];
    return predictedCycles.some(cycle => cycle.startDate === formattedDate);
  };

  return {
    cycleData,
    predictedCycles,
    loading,
    averageCycleLength,
    averagePeriodDuration,
    fetchCycleData,
    getExistingCycleData,
    isPredictedCycle,
  };
};

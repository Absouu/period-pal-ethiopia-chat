
import React from "react";
import { Star } from "lucide-react";

interface PointsCounterProps {
  points: number;
}

const PointsCounter = ({ points }: PointsCounterProps) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10 rounded-full py-3 px-6 shadow-md border border-primary/30 animate-fade-in">
      <Star className="w-7 h-7 text-primary mr-3" />
      <span className="font-semibold text-primary">
        You have <span className="text-xl font-bold">{points}</span> points
      </span>
    </div>
  );
};

export default PointsCounter;

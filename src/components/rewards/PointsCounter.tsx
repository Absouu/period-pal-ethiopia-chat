
import React from "react";
import { Star } from "lucide-react";

interface PointsCounterProps {
  points: number;
}

const PointsCounter = ({ points }: PointsCounterProps) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-full py-2 px-4 shadow-sm border border-primary/20 animate-fade-in">
      <Star className="w-5 h-5 text-primary mr-2" />
      <span className="font-semibold text-primary">
        You have <span className="text-lg">{points}</span> points
      </span>
    </div>
  );
};

export default PointsCounter;

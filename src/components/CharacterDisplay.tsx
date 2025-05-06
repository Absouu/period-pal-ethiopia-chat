
import React, { useEffect, useState } from "react";
import { CharacterMood } from "../types";

interface CharacterDisplayProps {
  mood: CharacterMood;
}

const CharacterDisplay = ({ mood }: CharacterDisplayProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [mood]);

  const getCharacterImage = () => {
    switch (mood) {
      case "happy":
        return (
          <div className="bg-primary rounded-full p-8 w-28 h-28 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute w-full h-2 bg-white rounded-full top-3"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full left-4 top-8"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full right-4 top-8"></div>
              <div className="absolute w-12 h-6 border-b-4 border-white rounded-full left-1/2 transform -translate-x-1/2 bottom-3"></div>
            </div>
          </div>
        );
      case "thinking":
        return (
          <div className="bg-primary rounded-full p-8 w-28 h-28 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute w-full h-2 bg-white rounded-full top-3"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full left-4 top-8"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full right-4 top-8"></div>
              <div className="absolute w-8 h-1 bg-white rounded-full left-1/2 transform -translate-x-1/2 bottom-5"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-primary rounded-full p-8 w-28 h-28 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute w-full h-2 bg-white rounded-full top-3"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full left-4 top-8"></div>
              <div className="absolute w-3 h-3 bg-white rounded-full right-4 top-8"></div>
              <div className="absolute w-10 h-1 bg-white rounded-full left-1/2 transform -translate-x-1/2 bottom-5"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className={`${animate ? 'animate-character-bounce' : ''} transition-all duration-300`}>
        {getCharacterImage()}
      </div>
      <h2 className="text-xl font-bold mt-2 text-primary">Selam</h2>
      <p className="text-sm text-gray-600">Your Menstrual Health Guide</p>
    </div>
  );
};

export default CharacterDisplay;


import React from "react";
import { CharacterMood } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface CharacterDisplayProps {
  mood?: CharacterMood;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  mood = "neutral",
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <div className={`mood-indicator mood-${mood}`}>
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/3b21855f-9bdd-481b-b65b-d3f3eefc4bb8.png" 
              alt="Lilly flower" 
              className="w-3/4 h-3/4 object-contain"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-1">Lilly</h2>
        <p className="text-gray-600">{t('header.subtitle')}</p>
      </div>
    </div>
  );
};

export default CharacterDisplay;

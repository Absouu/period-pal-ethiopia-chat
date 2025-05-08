
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
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <circle cx="50" cy="50" r="45" fill="currentColor" />
            {mood === "happy" && (
              <g stroke="white" strokeWidth="3" fill="none">
                <path d="M30 40 Q45 60 50 40" />
                <path d="M70 40 Q55 60 50 40" />
                <path d="M30 65 Q50 85 70 65" strokeLinecap="round" />
              </g>
            )}
            {mood === "neutral" && (
              <g stroke="white" strokeWidth="3" fill="none">
                <path d="M30 40 Q45 60 50 40" />
                <path d="M70 40 Q55 60 50 40" />
                <path d="M30 70 L70 70" strokeLinecap="round" />
              </g>
            )}
            {mood === "thinking" && (
              <g stroke="white" strokeWidth="3" fill="none">
                <path d="M30 40 Q45 60 50 40" />
                <path d="M70 40 Q55 60 50 40" />
                <path d="M35 75 Q50 65 65 75" strokeLinecap="round" />
              </g>
            )}
          </svg>
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

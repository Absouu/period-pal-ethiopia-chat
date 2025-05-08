
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
  const lilyEmoji = "🪷"; // Water lily emoji
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <div className={`mood-indicator mood-${mood}`}>
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <div className="text-6xl">
              {lilyEmoji}
            </div>
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

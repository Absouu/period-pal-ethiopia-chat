
import React from 'react';

interface LilyPadLogoProps {
  size?: "small" | "normal" | "large" | "tiny";
  className?: string;
  withBackground?: boolean;
}

const LilyPadLogo: React.FC<LilyPadLogoProps> = ({ 
  size = "normal",
  className = "",
  withBackground = true
}) => {
  const sizeClasses = 
    size === "large" ? "w-20 h-20" : 
    size === "small" ? "w-8 h-8" : 
    size === "tiny" ? "w-5 h-5" :
    "w-16 h-16";
  
  const lilyEmoji = "🪷"; // Water lily emoji
  
  if (withBackground) {
    return (
      <div className={`${sizeClasses} bg-green-100 rounded-full flex items-center justify-center ${className}`}>
        <div className="text-4xl">
          {lilyEmoji}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses} flex items-center justify-center ${className}`}>
      <div className={
        size === "large" ? "text-5xl" : 
        size === "small" ? "text-xl" : 
        size === "tiny" ? "text-sm" :
        "text-4xl"
      }>
        {lilyEmoji}
      </div>
    </div>
  );
};

export default LilyPadLogo;

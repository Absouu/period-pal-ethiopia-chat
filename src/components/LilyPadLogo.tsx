
import React from 'react';

interface LilyPadLogoProps {
  size?: "small" | "normal" | "large";
  className?: string;
}

const LilyPadLogo: React.FC<LilyPadLogoProps> = ({ 
  size = "normal",
  className = ""
}) => {
  const sizeClasses = 
    size === "large" ? "w-20 h-20" : 
    size === "small" ? "w-8 h-8" : 
    "w-16 h-16";
  
  return (
    <div className={`${sizeClasses} bg-green-100 rounded-full flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
        alt="Lily Pad Logo" 
        className="w-3/4 h-3/4 object-contain"
      />
    </div>
  );
};

export default LilyPadLogo;

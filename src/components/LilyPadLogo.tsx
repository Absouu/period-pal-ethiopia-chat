
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
  
  if (withBackground) {
    return (
      <div className={`${sizeClasses} bg-green-100 rounded-full flex items-center justify-center ${className}`}>
        <img 
          src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
          alt="Lily Pad Logo" 
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
    );
  }
  
  return (
    <img 
      src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
      alt="Lily Pad Logo" 
      className={`${sizeClasses} object-contain ${className}`}
    />
  );
};

export default LilyPadLogo;

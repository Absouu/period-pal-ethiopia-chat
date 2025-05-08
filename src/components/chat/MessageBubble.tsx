
import React from "react";
import { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  // Format the timestamp
  const formattedTime = message.timestamp ? 
    format(new Date(message.timestamp), 'h:mm a') : '';
    
  return (
    <div
      className={cn(
        "mb-4 transition-all duration-300 animate-fade-in relative",
        message.sender === "user" ? "text-right" : "text-left"
      )}
    >
      <div className="flex flex-col">
        <div
          className={cn(
            "inline-block max-w-[85%] px-4 py-3 rounded-2xl shadow-sm",
            message.sender === "user"
              ? "bg-primary text-white rounded-tr-none ml-auto animate-slide-in-left"
              : message.id === "typing"
                ? "bg-muted text-gray-500 rounded-tl-none"
                : "bg-blue-100 text-foreground rounded-tl-none animate-slide-in-right"
          )}
        >
          <div className="text-md leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        {/* Timestamp - positioned below the bubble */}
        <div 
          className={cn(
            "text-xs mt-1 text-gray-500",
            message.sender === "user" ? "text-right mr-1" : "text-left ml-1"
          )}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;


import React from "react";
import { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "mb-3 transition-all duration-300 animate-fade-in",
        message.sender === "user" ? "text-right" : "text-left"
      )}
    >
      <div
        className={cn(
          "inline-block max-w-[85%] px-4 py-2 rounded-2xl shadow-sm",
          message.sender === "user"
            ? "bg-primary text-white rounded-tr-none animate-slide-in-left"
            : message.id === "typing"
              ? "bg-muted text-gray-500 rounded-tl-none italic"
              : "bg-accent text-foreground rounded-tl-none animate-slide-in-right"
        )}
      >
        <div className="text-md leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

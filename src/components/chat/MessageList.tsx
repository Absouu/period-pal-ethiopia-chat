
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: ChatMessage[];
  showScrollButton: boolean;
  onScrollToBottom: () => void;
}

const MessageList = ({ messages, showScrollButton, onScrollToBottom }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesContainerRef.current) {
      const handleScroll = () => {
        // Scroll handling logic is now in the parent component
      };
      
      const container = messagesContainerRef.current;
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative flex-1">
      <div
        ref={messagesContainerRef}
        className="h-full overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <Button
          size="icon"
          onClick={onScrollToBottom}
          variant="secondary"
          className="absolute bottom-2 right-4 rounded-full shadow-md animate-bounce"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default MessageList;

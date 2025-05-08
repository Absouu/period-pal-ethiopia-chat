
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import TipsButton from "./TipsButton";

interface MessageListProps {
  messages: ChatMessage[];
  showScrollButton: boolean;
  onScrollToBottom: () => void;
}

const MessageList = ({ messages, showScrollButton, onScrollToBottom }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative flex-1">
      <div className="flex justify-between items-center mb-2">
        <TipsButton className="z-10" />
      </div>
      
      <div
        ref={messagesContainerRef}
        className="h-full overflow-y-auto pr-2 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
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

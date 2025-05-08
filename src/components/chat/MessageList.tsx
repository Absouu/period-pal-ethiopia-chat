
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import TipsButton from "./TipsButton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: ChatMessage[];
  showScrollButton: boolean;
  onScrollToBottom: () => void;
}

const MessageList = ({ messages, showScrollButton, onScrollToBottom }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <TipsButton className="z-10" />
      </div>
      
      <ScrollArea 
        className="flex-1 h-[calc(100%-40px)]"
        ref={messagesContainerRef as React.RefObject<HTMLDivElement>}
      >
        <div className="pr-2 pb-4 space-y-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
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

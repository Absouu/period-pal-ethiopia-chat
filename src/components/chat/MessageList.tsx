
import React, { useRef } from "react";
import { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: ChatMessage[];
  showScrollButton: boolean;
  onScrollToBottom: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  showScrollButton,
  onScrollToBottom,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex-1 overflow-hidden mb-4">
      <ScrollArea className="h-72 pr-4 relative" data-radix-scroll-area-viewport="">
        <div className="space-y-4 relative">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Empty div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {showScrollButton && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-2 right-2 rounded-full h-8 w-8 shadow-md"
          onClick={onScrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default MessageList;

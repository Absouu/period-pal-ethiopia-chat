
import { useCallback, useEffect, RefObject } from "react";

interface UseScrollHandlerProps {
  messagesContainerRef: RefObject<HTMLDivElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
  messages?: any[]; // Optional array of messages to watch for changes
}

export const useScrollHandler = ({ 
  messagesContainerRef, 
  messagesEndRef,
  messages = [] 
}: UseScrollHandlerProps) => {
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesEndRef]);
  
  const checkScroll = useCallback(() => {
    if (!messagesContainerRef.current) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 60;
    return isScrolledUp;
  }, [messagesContainerRef]);

  // Auto-scroll when messages change (new message or typing indicator)
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  return {
    scrollToBottom,
    checkScroll,
  };
};


import { useCallback, useEffect, RefObject, useState } from "react";

interface UseScrollHandlerProps {
  messagesContainerRef: RefObject<HTMLDivElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
  messages?: any[]; // Optional array of messages to watch for changes
  isTyping?: boolean; // Optional typing indicator status
}

export const useScrollHandler = ({ 
  messagesContainerRef, 
  messagesEndRef,
  messages = [],
  isTyping = false
}: UseScrollHandlerProps) => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesEndRef]);
  
  const checkScroll = useCallback(() => {
    if (!messagesContainerRef.current) return false;
    
    const container = messagesContainerRef.current;
    const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
    if (!viewport) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = viewport as HTMLElement;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isScrolledUp = distanceFromBottom > 60;
    
    // Update auto-scroll behavior based on user's scroll position
    setShouldAutoScroll(!isScrolledUp);
    
    return isScrolledUp;
  }, [messagesContainerRef]);

  // Auto-scroll when messages change or typing indicator changes
  useEffect(() => {
    if (shouldAutoScroll) {
      // Use a setTimeout to ensure the DOM has been updated
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, scrollToBottom, shouldAutoScroll]);

  return {
    scrollToBottom,
    checkScroll,
    shouldAutoScroll,
    setShouldAutoScroll
  };
};


import { useCallback, RefObject } from "react";

interface UseScrollHandlerProps {
  messagesContainerRef: RefObject<HTMLDivElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
}

export const useScrollHandler = ({ 
  messagesContainerRef, 
  messagesEndRef 
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

  return {
    scrollToBottom,
    checkScroll,
  };
};

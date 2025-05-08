
import { useRef, useEffect, RefObject } from "react";
import { CharacterMood } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollHandler } from "./useScrollHandler";
import { useMessageState } from "./useMessageState";
import { useChatApiService } from "@/services/chatApiService";

interface UseChatProps {
  onMoodChange: (mood: CharacterMood) => void;
  messagesEndRef?: RefObject<HTMLDivElement>;
  messagesContainerRef?: RefObject<HTMLDivElement>;
}

export const useChat = ({ onMoodChange, messagesEndRef: externalEndRef, messagesContainerRef: externalContainerRef }: UseChatProps) => {
  const { t, language } = useLanguage();
  const internalMessagesEndRef = useRef<HTMLDivElement>(null);
  const internalMessagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Use external refs if provided, otherwise use internal refs
  const messagesEndRef = externalEndRef || internalMessagesEndRef;
  const messagesContainerRef = externalContainerRef || internalMessagesContainerRef;

  // Use our custom hooks
  const { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    showScrollButton, 
    setShowScrollButton 
  } = useMessageState();
  
  const { scrollToBottom, checkScroll, shouldAutoScroll } = useScrollHandler({ 
    messagesContainerRef, 
    messagesEndRef,
    messages, // Pass messages to trigger auto-scrolling when messages change
    isTyping  // Also watch typing indicator changes
  });
  
  const { sendMessageToApi } = useChatApiService({ 
    language, 
    t, 
    onMoodChange 
  });

  // Handle checking scroll position
  const handleScroll = () => {
    setShowScrollButton(checkScroll());
  };
  
  // Handle sending messages
  const handleSendMessage = (inputValue: string) => {
    if (isTyping) return;
    sendMessageToApi(inputValue, messages, setMessages, setIsTyping);
    // Scroll down immediately when user sends a message
    setTimeout(scrollToBottom, 50);
  };

  // Ensure we scroll when typing state changes too
  useEffect(() => {
    if (isTyping && shouldAutoScroll) {
      setTimeout(scrollToBottom, 50);
    }
  }, [isTyping, scrollToBottom, shouldAutoScroll]);

  return {
    messages,
    isTyping,
    showScrollButton,
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    checkScroll: handleScroll,
    handleSendMessage
  };
};

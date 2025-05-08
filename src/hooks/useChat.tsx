
import { useRef, useEffect } from "react";
import { CharacterMood } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollHandler } from "./useScrollHandler";
import { useMessageState } from "./useMessageState";
import { useChatApiService } from "@/services/chatApiService";

interface UseChatProps {
  onMoodChange: (mood: CharacterMood) => void;
}

export const useChat = ({ onMoodChange }: UseChatProps) => {
  const { t, language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Use our custom hooks
  const { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    showScrollButton, 
    setShowScrollButton 
  } = useMessageState();
  
  const { scrollToBottom, checkScroll } = useScrollHandler({ 
    messagesContainerRef, 
    messagesEndRef,
    messages // Pass messages to trigger auto-scrolling when messages change
  });
  
  const { sendMessageToApi } = useChatApiService({ 
    language, 
    t, 
    onMoodChange 
  });

  // Set up scroll event listener
  const handleScroll = () => {
    setShowScrollButton(checkScroll());
  };
  
  // Handle sending messages
  const handleSendMessage = (inputValue: string) => {
    if (isTyping) return;
    sendMessageToApi(inputValue, messages, setMessages, setIsTyping);
    // Scroll down immediately when user sends a message
    setTimeout(scrollToBottom, 100);
  };

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

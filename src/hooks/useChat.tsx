
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
    messagesEndRef 
  });
  
  const { sendMessageToApi } = useChatApiService({ 
    language, 
    t, 
    onMoodChange 
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Set up scroll event listener
  const handleScroll = () => {
    setShowScrollButton(checkScroll());
  };
  
  // Handle sending messages
  const handleSendMessage = (inputValue: string) => {
    if (isTyping) return;
    sendMessageToApi(inputValue, messages, setMessages, setIsTyping);
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

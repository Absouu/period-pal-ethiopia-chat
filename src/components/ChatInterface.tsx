
import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CharacterMood } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/hooks/useChat";
import MessageList from "@/components/chat/MessageList";
import ChatInputForm from "@/components/chat/ChatInputForm";
import PeriodReminder from "@/components/chat/PeriodReminder";
import LilyPadLogo from "@/components/LilyPadLogo";

interface ChatInterfaceProps {
  onMoodChange: (mood: CharacterMood) => void;
}

const ChatInterface = ({ onMoodChange }: ChatInterfaceProps) => {
  const { t } = useLanguage();
  const { authState } = useAuth();
  
  const {
    messages,
    isTyping,
    showScrollButton,
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    checkScroll,
    handleSendMessage
  } = useChat({ onMoodChange });

  // Set up scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      // Use the ScrollArea's viewport for scroll events
      const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.addEventListener("scroll", checkScroll);
        return () => viewport.removeEventListener("scroll", checkScroll);
      }
    }
  }, [checkScroll, messagesContainerRef]);

  return (
    <div className="flex flex-col bg-gradient-to-br from-white to-muted rounded-2xl shadow-lg p-4 h-[400px] max-h-[400px] border border-muted relative">
      <MessageList 
        messages={messages}
        showScrollButton={showScrollButton}
        onScrollToBottom={scrollToBottom}
        containerRef={messagesContainerRef}
      />
      
      <ChatInputForm 
        onSend={handleSendMessage}
        isTyping={isTyping}
      />
      
      <div className="mt-4 text-center">
        <span className="text-xs text-muted-foreground flex items-center justify-center gap-1 footer-text">
          <Sparkles className="h-3 w-3 text-primary/70" />
          <span>{t('chat.powered')}</span>
          <LilyPadLogo size="tiny" withBackground={false} className="ml-1" />
        </span>
      </div>
      
      {/* Period reminder notification */}
      <PeriodReminder />
    </div>
  );
};

export default ChatInterface;

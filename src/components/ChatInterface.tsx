
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage, CharacterMood } from "../types";
import { generateId } from "../utils/chatUtils";
import { Send, ArrowDown, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  onMoodChange: (mood: CharacterMood) => void;
}

const ChatInterface = ({ onMoodChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hi there! 👋 I'm Selam, your friendly period pal. What would you like to chat about today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { authState } = useAuth();
  
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Check scroll position to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 60;
      setShowScrollButton(isScrolledUp);
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);
  
  const handleSend = async () => {
    if (inputValue.trim() === "" || isTyping) return;
    
    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    try {
      // Add typing indicator
      setMessages(prev => [
        ...prev, 
        {
          id: "typing",
          content: "Typing...",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
      
      // Format messages for the OpenAI API (excluding typing indicators)
      const messageHistory = messages
        .filter(msg => msg.id !== "typing")
        .concat(userMessage)
        .map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content
        }));

      // Set up timeout for the API call
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 15000);
      });
      
      // Call the Supabase Edge Function
      const responsePromise = supabase.functions.invoke('chat-with-selam', {
        body: { 
          messages: messageHistory,
          userId: authState.user?.id || null
        }
      });
      
      // Race the API call against the timeout
      const { data, error } = await Promise.race([
        responsePromise,
        timeoutPromise.then(() => {
          throw new Error("Request timed out");
        })
      ]) as any;
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Remove typing indicator and add actual response
      setMessages(prev => 
        prev.filter(msg => msg.id !== "typing").concat({
          id: generateId(),
          content: data.answer,
          sender: "bot",
          timestamp: new Date()
        })
      );
      
      // Update character mood
      onMoodChange(data.mood || "neutral");
      
    } catch (error) {
      console.error("Error getting chat response:", error);
      
      // Show error toast
      toast.error("Oops! Something went wrong. Please try again.");
      
      // Remove typing indicator and add error message
      setMessages(prev => 
        prev.filter(msg => msg.id !== "typing").concat({
          id: generateId(),
          content: "Sorry, I can't respond right now. Let's try again in a moment! 😊",
          sender: "bot",
          timestamp: new Date()
        })
      );
      
      onMoodChange("thinking");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-white to-muted rounded-2xl shadow-lg p-4 h-[400px] max-h-[400px] border border-muted relative">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-3 transition-all duration-300 animate-fade-in",
              message.sender === "user" ? "text-right" : "text-left"
            )}
          >
            <div
              className={cn(
                "inline-block max-w-[85%] px-4 py-2 rounded-2xl shadow-sm",
                message.sender === "user"
                  ? "bg-primary text-white rounded-tr-none animate-slide-in-left"
                  : message.id === "typing"
                    ? "bg-muted text-gray-500 rounded-tl-none italic"
                    : "bg-accent text-foreground rounded-tl-none animate-slide-in-right"
              )}
            >
              <div className="text-md leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <Button
          size="icon"
          onClick={scrollToBottom}
          variant="secondary"
          className="absolute bottom-20 right-4 rounded-full shadow-md animate-bounce"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex items-center space-x-2 bg-white/50 p-2 rounded-xl backdrop-blur-sm border border-accent/20">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about periods..."
          className="flex-1 bg-white border-muted focus-visible:ring-primary/30 rounded-lg pl-4 py-2 shadow-inner"
          disabled={isTyping}
        />
        <Button
          onClick={handleSend}
          size="icon"
          className={cn(
            "bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 shadow-md",
            isTyping ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          )}
          disabled={isTyping}
        >
          {isTyping ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3 text-primary/70" />
          Powered by Lily Pad AI
        </span>
      </div>
    </div>
  );
};

export default ChatInterface;


import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage, CharacterMood } from "../types";
import { generateId } from "../utils/chatUtils";
import { Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { authState } = useAuth();
  
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 h-[400px] max-h-[400px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : message.id === "typing"
                    ? "bg-gray-100 text-gray-500 rounded-tl-none italic"
                    : "bg-accent text-foreground rounded-tl-none"
              }`}
            >
              <div className="text-md leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about periods..."
          className="flex-1"
          disabled={isTyping}
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-primary hover:bg-primary/80"
          disabled={isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

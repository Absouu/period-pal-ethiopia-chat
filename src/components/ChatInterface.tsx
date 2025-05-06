
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage, CharacterMood } from "../types";
import { findResponse, generateId } from "../utils/chatUtils";
import { ArrowUp, Send } from "lucide-react";

interface ChatInterfaceProps {
  onMoodChange: (mood: CharacterMood) => void;
}

const ChatInterface = ({ onMoodChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm Selam, your menstrual health assistant. What would you like to know about menstrual health?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    
    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Small delay to simulate thinking
    setTimeout(() => {
      const response = findResponse(inputValue);
      onMoodChange(response.mood);
      
      const botMessage: ChatMessage = {
        id: generateId(),
        content: response.answer,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 h-[400px] max-h-[400px]">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-accent text-foreground rounded-tl-none"
              }`}
            >
              {message.content}
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
          placeholder="Ask about menstrual health..."
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-primary hover:bg-primary/80"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

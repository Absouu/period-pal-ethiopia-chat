
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ChatInputFormProps {
  onSend: (message: string) => void;
  isTyping: boolean;
}

const ChatInputForm = ({ onSend, isTyping }: ChatInputFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const { t } = useLanguage();

  const handleSend = () => {
    if (inputValue.trim() === "" || isTyping) return;
    onSend(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white/50 p-2 rounded-xl backdrop-blur-sm border border-accent/20">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('chat.placeholder')}
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
  );
};

export default ChatInputForm;

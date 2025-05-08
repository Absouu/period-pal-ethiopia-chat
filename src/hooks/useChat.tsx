
import { useState, useCallback, useRef, useEffect } from "react";
import { ChatMessage, CharacterMood } from "@/types";
import { generateId } from "@/utils/chatUtils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/context/LanguageContext";

interface UseChatProps {
  onMoodChange: (mood: CharacterMood) => void;
}

export const useChat = ({ onMoodChange }: UseChatProps) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Set up initial messages with welcome and sample conversation history
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: "welcome",
        content: t('chat.welcome'),
        sender: "bot",
        timestamp: new Date(Date.now() - 600000) // 10 minutes ago
      }
    ];

    // Add sample conversation history showing emotional support
    if (language === 'en') {
      initialMessages.push(
        {
          id: generateId(),
          content: "I'm feeling stressed about my exams.",
          sender: "user",
          timestamp: new Date(Date.now() - 500000) // 8.3 minutes ago
        },
        {
          id: generateId(),
          content: "It's completely normal to feel stressed about exams. Your feelings are valid! Try taking deep breaths, breaking your study into small chunks, and remember to take breaks. Would you like some specific stress management techniques?",
          sender: "bot",
          timestamp: new Date(Date.now() - 490000) // 8.2 minutes ago
        },
        {
          id: generateId(),
          content: "My period cramps were really bad yesterday.",
          sender: "user",
          timestamp: new Date(Date.now() - 300000) // 5 minutes ago
        },
        {
          id: generateId(),
          content: "I'm sorry to hear you had such bad cramps. That can be really difficult to deal with. Have you tried a heating pad or light exercise? Some people find that gentle movement or warmth can help reduce cramping. Would you like me to suggest some other ways to manage period pain?",
          sender: "bot",
          timestamp: new Date(Date.now() - 290000) // 4.8 minutes ago
        }
      );
    } else {
      initialMessages.push(
        {
          id: generateId(),
          content: "ስለ ፈተናዬ እየጨነቀኝ ነው።",
          sender: "user",
          timestamp: new Date(Date.now() - 500000) // 8.3 minutes ago
        },
        {
          id: generateId(),
          content: "ስለ ፈተናዎች መጨነቅ ሙሉ በሙሉ ተፈጥሯዊ ነው። ስሜቶችህ ትክክለኛ ናቸው! ጥልቅ ትንፋሾችን ለመውሰድ፣ ጥናትዎን በትናንሽ ቁርጥራጮች ለመበተን እና እረፍት ለመውሰድ ይሞክሩ። የተወሰኑ ጭንቀትን የመቆጣጠር ቴክኒኮችን ይፈልጋሉ?",
          sender: "bot",
          timestamp: new Date(Date.now() - 490000) // 8.2 minutes ago
        },
        {
          id: generateId(),
          content: "ትናንት የወር አበባ ማምረር በጣም መጥፎ ነበር።",
          sender: "user",
          timestamp: new Date(Date.now() - 300000) // 5 minutes ago
        },
        {
          id: generateId(),
          content: "እንደዚህ ዓይነት መጥፎ ማምረር እንደነበረዎት ይቅርታ እጠይቃለሁ። ያ ከባድ ሊሆን ይችላል። ሞቃት ፓድ ወይም ቀላል የአካል እንቅስቃሴ ሞክረው ያውቃሉ? አንዳንድ ሰዎች ቀስ ያለ እንቅስቃሴ ወይም ሙቀት ማምረርን ለመቀነስ ሊረዳ እንደሚችል ያገኛሉ። የወር አበባ ህመምን ለመቆጣጠር ሌሎች መንገዶችን እንድሆን ይፈልጋሉ?",
          sender: "bot",
          timestamp: new Date(Date.now() - 290000) // 4.8 minutes ago
        }
      );
    }

    setMessages(initialMessages);
  }, [t, language]);
  
  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prevMessages => {
      // Find the welcome message and update its content
      const updatedMessages = [...prevMessages];
      const welcomeMessageIndex = updatedMessages.findIndex(msg => msg.id === "welcome");
      if (welcomeMessageIndex !== -1) {
        updatedMessages[welcomeMessageIndex] = {
          ...updatedMessages[welcomeMessageIndex],
          content: t('chat.welcome')
        };
      }
      return updatedMessages;
    });
  }, [language, t]);
  
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const checkScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 60;
    setShowScrollButton(isScrolledUp);
  }, []);

  const handleSendMessage = async (inputValue: string) => {
    if (inputValue.trim() === "" || isTyping) return;
    
    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Add typing indicator
      setMessages(prev => [
        ...prev, 
        {
          id: "typing",
          content: t('chat.typing'),
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
          userId: null, // This will be provided by the parent component
          language
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
          content: t('chat.error'),
          sender: "bot",
          timestamp: new Date()
        })
      );
      
      onMoodChange("thinking");
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    showScrollButton,
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    checkScroll,
    handleSendMessage
  };
};


import { ChatMessage, CharacterMood } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/context/LanguageContext";
import { generateId } from "@/utils/chatUtils";

interface ChatApiServiceProps {
  language: string;
  t: (key: string) => string;
  onMoodChange: (mood: CharacterMood) => void;
}

export const useChatApiService = ({ 
  language, 
  t,
  onMoodChange 
}: ChatApiServiceProps) => {
  
  const sendMessageToApi = async (
    inputValue: string, 
    messages: ChatMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (inputValue.trim() === "") return;
    
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
      const responsePromise = supabase.functions.invoke('chat-with-lilly', {
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
    sendMessageToApi
  };
};

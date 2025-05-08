
import { useState, useEffect } from "react";
import { ChatMessage } from "@/types";
import { generateId } from "@/utils/chatUtils";
import { useLanguage } from "@/context/LanguageContext";

export const useMessageState = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t, language } = useLanguage();
  
  // Set up initial messages with welcome and sample conversation history
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: "welcome",
        content: language === 'en' 
          ? "Hi there! 👋 I'm Lilly, your friendly period pal. What would you like to chat about today?" 
          : "ሰላም! 👋 እኔ ሊሊ ነኝ፣ ጓደኛዎ የወር አበባ። ዛሬ ስለ ምን መወያየት ይፈልጋሉ?",
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
          content: language === 'en' 
            ? "Hi there! 👋 I'm Lilly, your friendly period pal. What would you like to chat about today?" 
            : "ሰላም! 👋 እኔ ሊሊ ነኝ፣ ጓደኛዎ የወር አበባ። ዛሬ ስለ ምን መወያየት ይፈልጋሉ?"
        };
      }
      return updatedMessages;
    });
  }, [language]);

  return {
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    showScrollButton,
    setShowScrollButton
  };
};

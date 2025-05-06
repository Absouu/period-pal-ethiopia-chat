
import { ChatResponse } from "../types";
import { chatResponses } from "../data/chatResponses";

export const findResponse = (userInput: string): ChatResponse => {
  const lowercaseInput = userInput.toLowerCase();
  
  for (const response of chatResponses) {
    if (response.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return response;
    }
  }
  
  return {
    keywords: [],
    answer: "I'm sorry, I don't have an answer for that question yet. Please try asking something about periods, menstrual cycles, pads, or menstrual hygiene.",
    mood: "thinking"
  };
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return null;
  }
};

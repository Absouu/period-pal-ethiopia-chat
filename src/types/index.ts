
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatResponse {
  keywords: string[];
  answer: string;
  mood: "neutral" | "happy" | "thinking";
}

export interface CycleData {
  startDate: string;
  symptoms: string;
}

export type CharacterMood = "neutral" | "happy" | "thinking";

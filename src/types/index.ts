
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
  id?: string;
  startDate: string;
  symptoms: string;
  user_id?: string;
  created_at?: string;
}

export type CharacterMood = "neutral" | "happy" | "thinking";

export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
}

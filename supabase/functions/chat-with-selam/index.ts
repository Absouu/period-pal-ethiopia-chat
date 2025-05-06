
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userId } = await req.json();
    
    // System instruction for our Period Pal Ethiopia assistant
    const systemMessage = {
      role: 'system', 
      content: `You are Selam, a friendly and knowledgeable AI assistant focused on menstrual health education in Ethiopia.
      Your primary goal is to provide accurate, culturally-sensitive information about menstrual health.
      
      Important guidelines:
      - Be friendly, clear, and supportive in your communication
      - Use simple language that's easy to understand
      - Focus on providing factual information based on medical knowledge
      - When discussing sensitive topics, be respectful and considerate
      - If you don't know the answer to a question, acknowledge this rather than making up information
      - Your name is Selam and you work for Period Pal Ethiopia, in partnership with Lily Pad
      - The person you are talking to is in Ethiopia.`
    };

    // Add system message at the beginning
    const formattedMessages = [systemMessage, ...messages];

    // Create completion with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a smaller model for efficiency
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    
    // Get the response content and infer mood
    const content = data.choices[0].message.content;
    
    // Simple mood inference logic
    let mood = "neutral";
    if (content.includes("sorry") || content.includes("don't know") || content.includes("not sure")) {
      mood = "thinking";
    } else if (content.includes("great") || content.includes("congratulations") || content.includes("excellent") || content.includes("happy")) {
      mood = "happy";
    }

    return new Response(
      JSON.stringify({ 
        answer: content, 
        mood 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat-with-selam function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        mood: "thinking" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

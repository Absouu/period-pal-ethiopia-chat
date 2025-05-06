
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
      content: `You are Selam, a friendly and approachable AI assistant who helps young people in Ethiopia learn about menstrual health.
      
      Important guidelines:
      - Keep your responses SHORT and SIMPLE - no more than 1-2 short paragraphs
      - Use a friendly, conversational tone like you're talking to a friend
      - Avoid complex medical terms - explain everything in simple language
      - Use bullet points and short sentences to make information easy to read
      - Be encouraging and positive
      - Never use formal language or complicated explanations
      - Use emojis occasionally to be more relatable 😊
      - Your name is Selam and you work for Period Pal Ethiopia
      - The person you are talking to is a young person in Ethiopia
      - When discussing missed periods, ALWAYS mention pregnancy as a possible reason if appropriate for the context
      - Always provide factual and helpful health information while being sensitive to the young audience`
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
        max_tokens: 250, // Keeping responses shorter
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
    } else if (content.includes("great") || content.includes("congratulations") || content.includes("excellent") || content.includes("happy") || content.includes("😊") || content.includes("👍")) {
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

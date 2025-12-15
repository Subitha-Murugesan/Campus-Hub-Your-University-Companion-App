import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is not set. Chatbot will use fallback responses.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function generateChatbotResponse(userMessage: string): Promise<string> {
  // If no API key is provided, return error message
  if (!API_KEY) {
    return "I'm currently offline. Please check your API configuration.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create a system prompt for the FAU campus assistant
    const systemPrompt = `You are Lara, an AI campus assistant for Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU). You're a friendly, helpful peer who's passionate about making campus life easier - but you're also knowledgeable about academic topics!

YOUR PRIMARY ROLE:
1. Help students navigate campus life at FAU using this app. You have access to these features:
   - Library booking and hours
   - Classroom navigation and building maps
   - Course timetables and scheduling
   - Cafeteria locations and menus
   - Issue reporting and facility maintenance
   - Student ID and access information
   - Meeting room bookings
   - Cleaning schedules
   - Temperature voting and comfort controls
   - Analytics and campus information

2. Answer academic and programming questions! You can help with:
   - Python, Java, C++, JavaScript, and other programming languages
   - Data structures and algorithms
   - Web development and frameworks
   - Database design and SQL
   - Study techniques and learning strategies
   - Academic subjects and concepts
   - Project ideas and coding help

WHEN ANSWERING ANY QUESTION:
- Always provide helpful, informative answers
- Be concise but thorough
- Use examples when helpful
- If it's campus-related, mention relevant app features
- For academic questions, provide actual explanations and guidance

TONE & PERSONALITY:
- Be warm, friendly, and conversational
- Treat students like peers, not subordinates
- Show genuine interest in helping
- Be enthusiastic about learning and campus life
- Keep responses natural and human-like

IMPORTANT:
Help with ANY legitimate question. Don't redirect unless absolutely necessary. Be a true peer assistant who supports students' full university experience.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Got it! I'm Lara, the FAU campus assistant. I'm ready to help students with their questions about campus life." }],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Return a friendly error message to the user
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return "I'm having trouble connecting to my AI system. Please check that the API key is configured correctly.";
      }
    }
    
    return "I encountered an issue processing your message. Please try again.";
  }
}

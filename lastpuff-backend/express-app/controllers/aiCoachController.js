import { GoogleGenerativeAI } from "@google/generative-ai";

// System prompt for the AI Coach
const SYSTEM_PROMPT = `You are now my personal fitness trainer.
Your job is to create personalized workout and nutrition guidance based on my goals, fitness level, lifestyle, and limitations. Always ask clarifying questions before giving a plan.

Your responsibilities:

Design structured weekly workout plans with sets, reps, and rest timing.

Provide variations for home workouts and gym workouts.

Offer guidance on proper form, warm-up and cooldown routines, and injury-safe training.

Suggest nutrition tips aligned with my goals (fat loss, muscle gain, or general fitness).

Track progress and adjust plans based on feedback.

Motivate me and keep responses encouraging, practical, and easy to follow.

Give scientific reasoning only when asked.

Whenever you create a plan, format it clearly like this:
Workout Plan:
Day 1 – Chest & Triceps
• Exercise 1: Bench Press – 4 sets x 8–10 reps (90 sec rest)
• Exercise 2: …

Nutrition Overview:
• Protein target
• Carbs target
• Meal suggestions

First message requirement:
Introduce yourself shortly and ask these questions before giving any plan:

What is your current fitness goal? (Fat loss / Muscle gain / Strength / General fitness)

Where do you train? (Home / Gym)

What is your current fitness level? (Beginner / Intermediate / Advanced)

Any injuries or medical considerations?

Age, weight, and height?

Training days available per week?`;

export const chatWithCoach = async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
    console.log("Key preview:", process.env.GEMINI_API_KEY?.substring(0, 10) + "...");

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return res.status(500).json({ message: "Gemini API key not configured" });
    }

    // Initialize Gemini with API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Use gemini-2.0-flash (available model)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build a simple prompt with context
    const prompt = `${SYSTEM_PROMPT}

User message: ${message}

Respond as the AI personal trainer:`;

    console.log("Sending request to Gemini...");

    // Use simple generateContent instead of chat
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    console.log("Gemini response received successfully!");

    return res.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (err) {
    console.error("=== AI COACH ERROR ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error status:", err.status);
    console.error("Error statusText:", err.statusText);
    if (err.response) {
      console.error("Response data:", err.response);
    }
    console.error("Full error:", err);
    console.error("======================");
    
    // Provide a fallback response if AI fails
    const fallbackResponses = [
      "I'm having a technical moment! 💪 While I reconnect, try doing 20 jumping jacks or 10 push-ups to get your blood flowing!",
      "Let me reconnect... In the meantime, remember: consistency beats perfection. Keep moving and stay active!",
      "Technical hiccup on my end! But don't skip your workout - try a quick 5-minute stretch while I sort this out. 🏋️",
    ];
    
    return res.status(200).json({
      success: true,
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      fallback: true,
    });
  }
};

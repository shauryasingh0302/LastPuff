import { GoogleGenerativeAI } from "@google/generative-ai";

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

let modelInstance = null;

const getModel = () => {
  if (modelInstance) return modelInstance;

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing from environment variables!");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    modelInstance = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    console.log("Gemini AI Model initialized successfully.");
    return modelInstance;
  } catch (error) {
    console.error("Failed to initialize Gemini Model:", error);
    return null;
  }
};

export const chatWithCoach = async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const model = getModel();

    if (!model) {
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

    const prompt = `${SYSTEM_PROMPT}

User message: ${message}

Respond as the AI personal trainer:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    return res.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (err) {
    console.error("AI COACH ERROR", err);
    return res.status(500).json({
      success: false,
      message: "AI service interrupted",
      error: err.toString()
    });
  }
};

export const analyzeFood = async (req, res) => {
  const { foodText } = req.body;
  if (!foodText) return res.status(400).json({ message: "Food text required" });

  try {
    const model = getModel();
    if (!model) throw new Error("Model not initialized");

    const prompt = `You are a nutrition expert. Analyze the food: "${foodText}".
    Provide a SCIENTIFICALLY ACCURATE estimation of calories and macros.
    If quantity is not specified, assume a standard serving size.
    
    Return ONLY a raw JSON object (no markdown) with:
    {
      "name": "Concise food name (e.g., 'Grilled Chicken Breast, 200g')",
      "calories": number (kcal),
      "protein": number (grams),
      "carbs": number (grams),
      "fats": number (grams)
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const nutritionData = JSON.parse(cleanJson);

    return res.status(200).json(nutritionData);

  } catch (error) {
    console.error("Food Analysis Error:", error);
    
    return res.status(500).json({
      success: false,
      message: "AI Analysis Failed. Check Server Logs.",
      error: error.message || error.toString()
    });
  }
};

export const suggestSmartMeal = async (req, res) => {
  try {
    const { history, currentHour } = req.body;
    const model = getModel();
    
    if (!model) {
        return res.json({ 
            mealName: "Carrot Sticks & Hummus", 
            reason: "Crunchy texture helps with oral fixation (Offline Mode).", 
            calories: 150, 
            protein: 4 
        });
    }

    const timeOfDay = currentHour < 11 ? "Morning" : currentHour < 15 ? "Lunch" : currentHour < 19 ? "Dinner" : "Late Night";

    const prompt = `User is quitting smoking. 
    Time: ${timeOfDay} (${currentHour}:00).
    Eaten today: ${JSON.stringify(history)}.
    
    Suggest ONE delicious, healthy meal option that:
    1. Balances their nutrition based on what they already ate.
    2. Helps physically with withdrawals (e.g. dopamine boosting foods, crunchy foods for oral fixation, or vitamin C rich).
    
    Return ONLY a raw JSON object:
    {
      "mealName": "Name of the meal",
      "reason": "1 short sentence why this is good for quitting smoking right now",
      "calories": estimated kcal,
      "protein": estimated protein
    }`;

    const result = await model.generateContent(prompt);
    const cleanJson = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return res.status(200).json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("Meal Suggestion Error:", error);
    return res.status(200).json({ 
        mealName: "Green Tea & Dark Chocolate", 
        reason: "Antioxidants help repair cell damage.", 
        calories: 100, 
        protein: 1 
    });
  }
};

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function testOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("Testing OpenRouter API...");
  console.log("API Key present:", !!apiKey);
  
  if (!apiKey) {
    console.log("❌ ERROR: OPENROUTER_API_KEY not found in environment variables!");
    console.log("Add OPENROUTER_API_KEY=your_key to your .env file");
    return;
  }
  
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "user", content: "Say hello in one sentence" }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://lastpuff.app",
          "X-Title": "LastPuff App",
        },
      }
    );
    
    console.log("\n✅ SUCCESS!");
    console.log("Model:", response.data.model);
    console.log("Response:", response.data.choices[0].message.content);
    console.log("\nUsage:", response.data.usage);
    
  } catch (error) {
    console.log("\n❌ ERROR:", error.response?.data || error.message);
  }
}

testOpenRouter();

import dotenv from "dotenv";
dotenv.config();

async function testV1() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Testing with v1 endpoint (not v1beta)...");
  console.log("API Key:", apiKey);
  

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  console.log("\nURL:", url.replace(apiKey, "API_KEY"));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Say hello" }] }]
      })
    });
    
    const data = await response.json();
    console.log("\nStatus:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
    
    if (data.candidates) {
      console.log("\n✅ SUCCESS!");
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
  

  console.log("\n\n--- Listing available models ---");
  const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(listUrl);
    const data = await response.json();
    
    if (data.error) {
      console.log("Error listing models:", data.error.message);
    } else if (data.models) {
      console.log("Available models:");
      data.models.forEach(m => console.log(`  - ${m.name}`));
    } else {
      console.log("Response:", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
}

testV1();

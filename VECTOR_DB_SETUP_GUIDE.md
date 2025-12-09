# 🚀 Vector DB Setup Guide

## ✅ Implementation Complete!

Your Vector DB integration with Pinecone is now ready! Here's how to complete the setup:

---

## 📋 Step 1: Get Pinecone API Key

1. **Sign up for Pinecone** (Free tier available!)
   - Go to: https://www.pinecone.io/
   - Click "Sign Up" or "Get Started"
   - Create a free account

2. **Create a Project**
   - After login, create a new project
   - Choose a project name (e.g., "LastPuff")

3. **Get Your API Key**
   - In Pinecone dashboard, go to "API Keys"
   - Copy your API key
   - Save it for `.env` file

4. **Create an Index**
   - In Pinecone dashboard, click "Create Index"
   - **Index Name**: `lastpuff-goals`
   - **Dimensions**: `1536`
   - **Metric**: `cosine`
   - **Cloud**: Choose your region (e.g., us-east-1)
   - Click "Create Index"

---

## 📋 Step 2: Get OpenAI API Key

1. **Sign up for OpenAI**
   - Go to: https://platform.openai.com/
   - Create an account or log in

2. **Get API Key**
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (it's only shown once!)
   - Save it for `.env` file

3. **Add Credits** (if needed)
   - Go to https://platform.openai.com/account/billing
   - Add payment method
   - Start with $5 (embeddings are very cheap!)

---

## 📋 Step 3: Update Environment Variables

Add these to your `.env` file:

```bash
# Existing variables
OPENROUTER_API_KEY=your_openrouter_key_here
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here

# 🚀 NEW: Vector DB Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Important Notes:**
- ✅ **PINECONE_API_KEY**: From Pinecone dashboard → API Keys
- ✅ **OPENAI_API_KEY**: From OpenAI platform → API Keys
- ⚠️ Keep these secure! Never commit `.env` to git

---

## 📋 Step 4: Test the Integration

### Test 1: Start the Server

```bash
npm run dev
```

**Expected Output:**
```
Server running on port 5000
✅ Vector DB initialized successfully
```

If you see:
```
⚠️ Vector DB not available (check PINECONE_API_KEY and OPENAI_API_KEY)
```
→ Check your `.env` file for the API keys!

---

### Test 2: Track a Goal (API Test)

**Endpoint**: `POST /api/goals/track`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "goalText": "Walk for 20 minutes",
  "category": "exercise",
  "completed": true,
  "difficulty": "easy",
  "enjoyment": 4,
  "energyLevel": "high",
  "mood": "motivated",
  "fitnessLevel": "intermediate",
  "currentStreak": 5,
  "bmi": 22.8
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Goal tracked successfully",
  "vectorId": "goal_user123_1234567890_abc123",
  "stored": true
}
```

---

### Test 3: Generate Agentic Goals (with Vector Context)

**Endpoint**: `POST /ai-coach/generate-agentic-goals`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "healthData": {
    "height": "175cm",
    "weight": "70kg",
    "workoutHours": 3,
    "sleepHours": 7
  },
  "completedGoals": ["Drink 8 glasses of water"],
  "fitnessLevel": "intermediate",
  "currentStreak": 5,
  "bmi": 22.8
}
```

**Expected Response (with Vector Context!):**
```json
{
  "goals": [
    { "text": "Walk 25 minutes", "icon": "walk-outline" },
    { "text": "Drink 10 glasses of water", "icon": "water-outline" },
    { "text": "Sleep 8+ hours tonight", "icon": "bed-outline" },
    { "text": "Eat 3 balanced meals", "icon": "restaurant-outline" },
    { "text": "Do 15 minutes of yoga", "icon": "fitness-outline" },
    { "text": "Practice deep breathing", "icon": "leaf-outline" }
  ],
  "vectorEnhanced": true,
  "contexted": {
    "successfulGoalsUsed": 5,
    "patternsLearned": 7
  }
}
```

**Key Indicators:**
- ✅ `vectorEnhanced: true` → Vector DB is working!
- ✅ `successfulGoalsUsed: 5` → AI used 5 historical goals
- ✅ `patternsLearned: 7` → AI learned from user's patterns

---

### Test 4: Get Goal Stats

**Endpoint**: `GET /api/goals/stats`

**Expected Response:**
```json
{
  "available": true,
  "stats": {
    "totalGoals": 10,
    "completedGoals": 8,
    "averageEnjoyment": 4.2,
    "successRate": 0.8
  }
}
```

---

## 🎯 How It Works

### 1. **User Completes a Goal**
```
Frontend → POST /api/goals/track
Backend → Generate embedding → Store in Pinecone
```

### 2. **User Requests New Goals**
```
Frontend → POST /ai-coach/generate-agentic-goals
Backend → Fetch vector context from Pinecone
Backend → Enhance AI prompt with historical data
AI → Generates personalized goals based on patterns
Frontend → Receives smart, proven goals ✨
```

### 3. **Vector Context Example**
```json
{
  "successfulGoals": [
    { "goal": "Walk 20 minutes", "similarity": 0.95, "enjoyment": 4 },
    { "goal": "Morning jog", "similarity": 0.87, "enjoyment": 3 }
  ],
  "failedGoals": [
    { "goal": "Run 5km", "similarity": 0.82 }
  ],
  "patterns": {
    "successRate": 0.85,
    "preferredCategories": ["walking", "yoga"],
    "bestTimeOfDay": "morning",
    "avoidCategories": ["running"]
  }
}
```

**AI uses this to:**
- ✅ Suggest "Walk 25 minutes" (proven success)
- ❌ Avoid "Run 5km" (user struggled before)
- ✅ Recommend morning timing
- ✅ Focus on walking/yoga (user's strengths)

---

## 📊 Cost Estimation

### Pinecone (Free Tier)
- ✅ **100,000 vectors** free
- ✅ **1 index** free
- ✅ Perfect for your use case!

### OpenAI Embeddings
- 💰 **$0.0001 / 1K tokens**
- Average goal = ~50 tokens
- **1000 goals = ~$0.005** (half a cent!)
- **Very cheap!** 🎉

**Example Monthly Cost:**
- 100 users × 30 goals/month = 3,000 goals
- 3,000 × $0.0001 ≈ **$0.30/month** for embeddings
- Pinecone: **Free**
- **Total: ~$0.30/month** 💰

---

## 🧪 Testing Checklist

- [ ] Pinecone account created
- [ ] Index `lastpuff-goals` created (1536 dimensions)
- [ ] Pinecone API key added to `.env`
- [ ] OpenAI API key added to `.env`
- [ ] Server starts without errors
- [ ] "✅ Vector DB initialized successfully" appears
- [ ] Can track a goal (`POST /api/goals/track`)
- [ ] Can generate goals (`POST /ai-coach/generate-agentic-goals`)
- [ ] Response shows `vectorEnhanced: true`
- [ ] Can view stats (`GET /api/goals/stats`)

---

## 🚨 Troubleshooting

### Issue: "Vector DB not available"
**Solution:**
1. Check `.env` has `PINECONE_API_KEY` and `OPENAI_API_KEY`
2. Restart server after adding env variables
3. Verify keys are correct (no extra spaces)

### Issue: "Failed to connect to index"
**Solution:**
1. Go to Pinecone dashboard
2. Create index: `lastpuff-goals`, dimensions: `1536`
3. Wait 1-2 minutes for index to be ready
4. Restart server

### Issue: "vectorEnhanced: false"
**Cause:** No goals stored yet!
**Solution:**
1. Track 5-10 test goals first
2. Then generate new goals
3. AI will use stored context

### Issue: OpenAI API errors
**Solution:**
1. Check OpenAI account has credits
2. Add payment method if needed
3. Verify API key is valid

---

## 🎉 Next Steps

Once everything works:

1. **Integrate Frontend**
   - Call `/api/goals/track` when user completes goals
   - Show `vectorEnhanced` indicator in UI
   - Display success patterns to users

2. **Enhanced Features** (Optional)
   - Add goal categories (exercise, nutrition, sleep, etc.)
   - Track more context (weather, location, etc.)
   - Add user feedback ratings
   - Build analytics dashboard

3. **Monitor & Optimize**
   - Check Pinecone dashboard for usage
   - Monitor OpenAI costs
   - Optimize prompts for better results

---

## 📚 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/goals/track` | POST | Track a single goal |
| `/api/goals/track-batch` | POST | Track multiple goals |
| `/api/goals/stats` | GET | Get user statistics |
| `/api/goals/clear` | DELETE | Clear all user goals |
| `/ai-coach/generate-agentic-goals` | POST | Generate vector-enhanced goals |

---

## 🎊 Congratulations!

Your agentic AI now has **long-term memory** and **learns from user behavior**! 🧠🚀

The AI will:
- ✅ Remember what works for each user
- ✅ Avoid suggesting goals that failed before
- ✅ Learn optimal timing and difficulty
- ✅ Provide personalized, proven recommendations

**Your AI just got 10x smarter!** 🎉

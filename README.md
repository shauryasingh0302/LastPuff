# Navjivan

**AI-Powered Smoking Cessation & Wellness Coach**

Navjivan is a mobile application that helps smokers quit while building healthier habits. Instead of simply tracking streaks, the app combines AI coaching, personalized goal generation, health risk assessment, and fitness tracking to guide users toward long-term lifestyle change.

The platform learns from user behavior and continuously adapts its recommendations, ensuring that future goals are based on what has worked for the user in the past.

---

# Features

## Personalized Goal Engine

* Generates daily goals based on fitness level and smoking habits.
* Learns from completed and failed goals to improve future recommendations.
* Uses a vector database to store behavioral patterns and provide personalized coaching.

## Health Risk Assessment

Provides AI-powered estimates for smoking-related health risks based on:

* Cigarettes smoked per day
* Smoking triggers
* Existing health conditions
* Blood pressure and age

The system uses Gemini AI to generate percentage-based risk assessments along with easy-to-understand explanations.

## Smoking Cessation Tools

* Cold turkey and gradual reduction plans
* Motivational AI-generated push notifications
* Cigarettes avoided tracking
* Money saved tracking
* Streak monitoring
* SOS support feature for cravings and difficult moments

## Fitness & Wellness Integration

* BMI calculator
* Personalized fitness recommendations
* Real-time step tracking and calorie estimation
* AI-generated sport-specific training programs
* Daily wellness goals tailored to user fitness levels

## AI Wellness Coach

An AI-powered coach that can:

* Remember user context
* Generate workout plans
* Offer stress management guidance
* Provide wellness support
* Adapt conversations based on user preferences

---

# Tech Stack

## Frontend

* React Native
* Expo
* TypeScript
* Expo Router
* React Native Reanimated
* Expo Notifications
* Context API

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Pinecone Vector Database
* Gemini Embeddings (768 Dimensions)

## AI Services

### Google Gemini (2.0 Flash)

Used for:

* Text embeddings
* Health risk assessment
* Push notification generation

### OpenRouter API

Used for:

* Chat conversations
* Goal generation
* Questionnaire analysis
* Meal suggestions
* Sports training programs

---

# Project Structure

```text
Navjivan/
├── navjivan-frontend/
│   ├── app/
│   │   ├── (tabs)/
│   │   ├── onboarding/
│   │   ├── fitness/
│   │   └── ai-coach/
│   ├── components/
│   ├── context/
│   └── services/
│
└── navjivan-backend/
    └── express-app/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── services/
        └── middlewares/
```

---

# Getting Started

## Prerequisites

* Node.js 18+
* MongoDB
* Expo CLI

```bash
npm install -g expo-cli
```

* Android Emulator, iOS Simulator, or Expo Go.

---

# Environment Variables

## Backend (`navjivan-backend/express-app/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

## Frontend (`navjivan-frontend/.env`)

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Navjivan.git
cd Navjivan
```

## 2. Backend Setup

```bash
cd navjivan-backend/express-app
npm install
npm run dev
```

## 3. Frontend Setup

```bash
cd navjivan-frontend
npm install
npm start
```

## 4. Run on Device

* Press `i` for iOS Simulator
* Press `a` for Android Emulator
* Scan the QR code using Expo Go.

---

# API Routes

## Authentication

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| POST   | `/api/auth/signup` | Create account |
| POST   | `/api/auth/login`  | Login          |

## Dashboard

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| GET    | `/api/dashboard/summary`      | Dashboard statistics |
| POST   | `/api/dashboard/update-goals` | Update goal progress |

## AI Coach

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| POST   | `/api/ai-coach/chat`              | Chat with AI coach      |
| POST   | `/api/ai-coach/analyze-food`      | Nutrition analysis      |
| POST   | `/api/ai-coach/suggest-meal`      | Meal recommendations    |
| POST   | `/api/ai-coach/generate-goals`    | Personalized goals      |
| POST   | `/api/ai-coach/generate-training` | Sport-specific programs |

## Goals

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| GET    | `/api/goals`     | Fetch goals |
| POST   | `/api/goals`     | Create goal |
| PATCH  | `/api/goals/:id` | Update goal |
| DELETE | `/api/goals/:id` | Delete goal |

---

# How the Personalized AI Engine Works

Unlike traditional habit-tracking apps that generate generic goals, Navjivan uses a memory-augmented recommendation system.

### Workflow

1. User data is converted into a 768-dimensional embedding.
2. Similar successful goals are retrieved from Pinecone.
3. Previously failed patterns are identified and avoided.
4. Success rates, preferences, and difficulty levels are analyzed.
5. This context is combined with the user's current state.
6. The AI generates personalized goals that are more likely to succeed.

This approach allows the application to continuously adapt and provide recommendations that become more effective over time.

---

# Push Notifications

The backend scheduler:

* Finds active users with push tokens.
* Generates personalized motivational messages.
* Sends notifications through Expo Push API.
* Notification frequency is configurable.

---

# Design Philosophy

Navjivan was designed to feel like a production-ready wellness application.

* Dark theme with glassmorphism effects
* Smooth animations with Reanimated
* Haptic feedback
* Gradient-based UI
* Adaptive experience for both smokers and fitness-focused users

---

# Known Issues

* Pinecone index creation is manual.
* Push notifications may not work properly on iOS simulators.
* BMI calculations use a standard formula and do not account for muscle mass.
* AI responses may occasionally be slower during high API load.

---

# Future Improvements

* Social accountability and quit buddies
* Reward and achievement system
* Apple Health and Google Fit integration
* Voice journaling
* Community challenges
* Wearable device integration

---

# Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests while maintaining the existing code style and architecture.

---

# License

MIT License.

---

# Author

**Shaurya Singh**

Built to combine health technology and practical AI to help users quit smoking and develop healthier lifestyles.

---

> **Disclaimer:** Navjivan provides health-related information and recommendations but is not a substitute for professional medical advice, diagnosis, or treatment.

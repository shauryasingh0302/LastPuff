# AI Architecture - Before & After

## 📌 BEFORE: Monolithic Controller

```
┌─────────────────────────────────────────────────────┐
│         aiCoachController.js (654 lines)            │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  HTTP Request Handling                        │ │
│  │  - Request validation                         │ │
│  │  - Response formatting                        │ │
│  │  - Error handling                             │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  AI Business Logic (MIXED IN!)                │ │
│  │  - callOpenRouter()                           │ │
│  │  - SYSTEM_PROMPT                              │ │
│  │  - AI prompt construction                     │ │
│  │  - Response parsing                           │ │
│  │  - JSON cleaning                              │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  Fallback Data                                │ │
│  │  - Default goals                              │ │
│  │  - Fallback meals                             │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

❌ Problems:
- Mixed responsibilities
- Hard to reuse AI logic
- Difficult to test
- Large file
```

## ✅ AFTER: Separated & Modular

```
┌──────────────────────────────────┐     ┌──────────────────────────────────┐
│  aiCoachController.js (358 lines)│     │   aiService.js (363 lines)       │
│                                  │     │                                  │
│  ┌────────────────────────────┐  │     │  ┌────────────────────────────┐  │
│  │  HTTP Request Handling     │  │     │  │  AI Core Functions         │  │
│  │  - Request validation      │  │     │  │  - callOpenRouter()        │  │
│  │  - Response formatting     │  │     │  │  - SYSTEM_PROMPT           │  │
│  │  - Error handling          │  │     │  └────────────────────────────┘  │
│  └────────────────────────────┘  │     │                                  │
│           │                      │     │  ┌────────────────────────────┐  │
│           │ imports & uses       │     │  │  AI Service Functions      │  │
│           ├──────────────────────┼─────┼─▶│  - chatWithAICoach()      │  │
│           │                      │     │  │  - analyzeFoodWithAI()     │  │
│  ┌────────────────────────────┐  │     │  │  - suggestMealWithAI()     │  │
│  │  Fallback Logic            │  │     │  │  - analyzeQuestionnaireAI()│  │
│  │  - getDefaultGoals()       │  │     │  │  - generateGoalsWithAI()   │  │
│  │  - getFallbackGoals()      │  │     │  │  - generateAgenticGoalsAI()│  │
│  │  (stays in controller)     │  │     │  └────────────────────────────┘  │
│  └────────────────────────────┘  │     │                                  │
└──────────────────────────────────┘     └──────────────────────────────────┘

✅ Benefits:
- Clear separation of concerns
- Reusable AI functions
- Easy to test
- Modular & maintainable
```

## 🔄 Data Flow Example

### Before:
```
Client Request → aiCoachController → (AI logic mixed in) → Response
```

### After:
```
Client Request → aiCoachController → aiService → OpenRouter API
                         ↑                              ↓
                         └──────── Response ────────────┘
```

## 📦 Import/Export Structure

### aiService.js exports:
```javascript
export const callOpenRouter = async (messages, jsonMode) => { ... }
export const SYSTEM_PROMPT = `...`;
export const chatWithAICoach = async (message, chatHistory) => { ... }
export const analyzeFoodWithAI = async (foodText) => { ... }
export const suggestMealWithAI = async (history, currentHour) => { ... }
export const analyzeQuestionnaireWithAI = async (healthData, smokingData) => { ... }
export const generateGoalsWithAI = async (healthData, smokingData, ...) => { ... }
export const generateAgenticGoalsWithAI = async ({ healthData, ... }) => { ... }
```

### aiCoachController.js imports:
```javascript
import { 
  chatWithAICoach, 
  analyzeFoodWithAI, 
  suggestMealWithAI,
  analyzeQuestionnaireWithAI,
  generateGoalsWithAI,
  generateAgenticGoalsWithAI
} from "../services/aiService.js";
```

### aiCoachController.js exports (HTTP handlers):
```javascript
export const chatWithCoach = async (req, res) => { ... }
export const analyzeFood = async (req, res) => { ... }
export const suggestSmartMeal = async (req, res) => { ... }
export const analyzeQuestionnaire = async (req, res) => { ... }
export const generateGoals = async (req, res) => { ... }
export const generateAgenticGoals = async (req, res) => { ... }
```

## 🎯 Key Takeaways

1. **Single Responsibility**: Each file has one clear purpose
2. **DRY Principle**: No code duplication, AI logic centralized
3. **Testability**: Services can be tested independently
4. **Maintainability**: Changes to AI logic happen in one place
5. **Scalability**: Easy to add new AI features or swap providers

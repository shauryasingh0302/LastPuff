import express from "express";
import { analyzeFood, chatWithCoach, suggestSmartMeal } from "../controllers/aiCoachController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /ai-coach/chat - Send a message to the AI coach
router.post("/chat", authMiddleware, chatWithCoach);

// POST /ai-coach/analyze-food - Analyze food nutrition
router.post("/analyze-food", authMiddleware, analyzeFood);

// POST /ai-coach/suggest-smart-meal - Suggest meal based on history
router.post("/suggest-smart-meal", authMiddleware, suggestSmartMeal);

// TEST route without auth (for debugging only - remove in production)
router.post("/test-chat", chatWithCoach);

export default router;

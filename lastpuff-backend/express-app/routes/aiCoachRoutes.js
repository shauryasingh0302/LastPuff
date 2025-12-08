import express from "express";
import { chatWithCoach } from "../controllers/aiCoachController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /ai-coach/chat - Send a message to the AI coach
router.post("/chat", authMiddleware, chatWithCoach);

// TEST route without auth (for debugging only - remove in production)
router.post("/test-chat", chatWithCoach);

export default router;

import axios from "axios";
import { Platform } from "react-native";
//https://lastpuff-backend.onrender.com
//http://localhost:5000

// ---------------- BASE URL HANDLING ----------------
// For physical Android device via Expo Go, use your PC's local IP
// Find your IP: Run 'ipconfig' in terminal and look for IPv4 Address
const LOCAL_IP = "192.168.22.157"; // <-- Change this to your PC's IP if needed

let BASE_URL = "http://localhost:5000"; // Default for Web & iOS Simulator
// let BASE_URL = "https://lastpuff-backend.onrender.com";

if (Platform.OS === "android") {
  BASE_URL = `http://${LOCAL_IP}:5000`; // Use local IP for physical Android device
  // BASE_URL = "https://lastpuff-backend.onrender.com";
}

// For iOS physical device on same WiFi, also use LOCAL_IP:
// if (Platform.OS === "ios") {
//   BASE_URL = `http://${LOCAL_IP}:5000`;
// }

// ---------------- AXIOS INSTANCE ----------------
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----- TOKEN HANDLING -----
export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// ---------- AUTH ----------
export const login = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const signup = (
  name: string,
  email: string,
  password: string,
  age?: number,
  height?: number,
  weight?: number,
  isSmoker?: boolean,
  plan?: string
) =>
  API.post("/auth/signup", {
    name,
    email,
    password,
    age,
    height,
    weight,
    isSmoker,
    plan,
  });

// ---------- DASHBOARD ----------
export const fetchDashboardSummary = () =>
  API.get("/dashboard/summary");

export const updateDailyGoals = (goalsCompleted: number) =>
  API.post("/dashboard/update-goals", { goalsCompleted });

// ---------- AI COACH ----------
interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

export const chatWithAICoach = (message: string, chatHistory: ChatMessage[]) =>
  API.post("/ai-coach/chat", { message, chatHistory });

export const analyzeFoodApi = (foodText: string) =>
  API.post("/ai-coach/analyze-food", { foodText });

export const suggestSmartMealApi = (history: string[], currentHour: number) =>
  API.post("/ai-coach/suggest-smart-meal", { history, currentHour });

export default API;

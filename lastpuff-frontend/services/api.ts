import axios from "axios";
import { Platform } from "react-native";

// ---------------- BASE URL HANDLING ----------------
let BASE_URL = "http://localhost:5000"; // Default for Web & iOS

if (Platform.OS === "android") {
  BASE_URL = "http://10.0.2.2:5000"; // Android emulator
}

// For real physical phone on same WiFi, replace manually with your PC IP
// BASE_URL = "http://192.168.x.x:5000";

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
  weight?: number
) =>
  API.post("/auth/signup", {
    name,
    email,
    password,
    age,
    height,
    weight,
  });

// ---------- DASHBOARD ----------
export const fetchDashboardSummary = () =>
  API.get("/dashboard/summary");

export const updateDailyGoals = (goalsCompleted: number) =>
  API.post("/dashboard/update-goals", { goalsCompleted });

export default API;

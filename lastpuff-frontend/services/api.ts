import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // your backend base URL
});

// Called from AuthContext to set/remove token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ---------- Auth APIs ----------
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const signup = (
  name: string,
  email: string,
  password: string,
  age?: number,
  heightCm?: number,
  weightKg?: number
) =>
  api.post("/auth/signup", {
    name,
    email,
    password,
    age,
    heightCm,
    weightKg,
  });

// ---------- Dashboard APIs ----------

export const fetchDashboardSummary = () =>
  api.get("/dashboard/summary");

export const updateDailyGoals = (goalsCompleted: number) =>
  api.post("/dashboard/update-goals", { goalsCompleted });

export default api;

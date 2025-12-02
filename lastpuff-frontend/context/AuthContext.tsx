import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../services/api";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: (user: any, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  loginUser: async () => {},
  logout: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setTokenValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored user and token on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedToken = await AsyncStorage.getItem("token");

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          setTokenValue(savedToken);
          setAuthToken(savedToken);
        }
      } catch (err) {
        console.log("Error loading auth data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle login — Save user & token
  const loginUser = async (userData: any, userToken: string) => {
    setUser(userData);
    setTokenValue(userToken);
    setAuthToken(userToken);

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("token", userToken);
  };

  // Handle logout — Clear data & remove token from axios
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setTokenValue(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

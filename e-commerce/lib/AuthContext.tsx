"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, login as apiLogin, LoginCredentials } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiLogin(credentials);
      setToken(response.token);

      // In a real app, we would fetch the user profile here
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: 1, // Default to user ID 1 for demo
        email: credentials.username + "@example.com",
        username: credentials.username,
        password: "",
        name: {
          firstname: "John",
          lastname: "Doe",
        },
        address: {
          city: "New York",
          street: "123 Main St",
          number: 123,
          zipcode: "10001",
          geolocation: {
            lat: "40.7128",
            long: "-74.0060",
          },
        },
        phone: "123-456-7890",
      };

      setUser(mockUser);

      // Save to localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginCredentials } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error: authError } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Use the login function from AuthContext
      await login(credentials);

      // Redirect to home page after successful login
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded border border-red-200">
              {error || authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="johnd"
              />
              <p className="mt-1 text-sm text-gray-500">
                Try "johnd" for username
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="m38rmF$"
              />
              <p className="mt-1 text-sm text-gray-500">
                Try "m38rmF$" for password
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/auth/login");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">
          Loading account information...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto py-6">{children}</div>
    </div>
  );
}

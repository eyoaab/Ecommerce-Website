"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function UserAccountNav() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button variant="outline" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="relative group">
      <Button variant="outline" className="flex items-center gap-2">
        <span className="hidden sm:inline">
          Hi, {user?.name?.firstname || "User"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right invisible group-hover:visible">
        <div className="py-2">
          <Link
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            My Account
          </Link>
          <Link
            href="/account/orders"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            My Orders
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

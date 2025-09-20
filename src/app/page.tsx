"use client";

import { useAuth } from "@/lib/useAuth";
import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🍳 Cookie
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
              ) : user ? (
                <>
                  <Link
                    href="/favorites"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Favorites
                  </Link>
                  <span className="text-gray-500 text-sm">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            🍳 Cookie
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium">
              ✅ Phase 2 Complete: Firebase Authentication with sign-in, sign-up, and route protection
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Ready to start building the recipe search functionality!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

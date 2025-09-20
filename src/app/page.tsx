"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import RecipeList from "@/components/RecipeList";
import { useRecipeSearch } from "@/lib/useRecipeSearch";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, isLoading: searchLoading } = useRecipeSearch(searchQuery);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
              {authLoading ? (
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            🍳 Cookie
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar 
              onSearch={handleSearch} 
              loading={searchLoading}
              placeholder="chicken, rice, onion, garlic..."
            />
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-sm text-gray-600">
              {searchLoading ? (
                "Searching recipes..."
              ) : searchResults ? (
                `Found ${searchResults.length} recipe${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
              ) : null}
            </div>
          )}
        </div>

        {/* Recipe Results */}
        <div className="mt-8">
          {searchQuery ? (
            <RecipeList 
              items={searchResults || []} 
              loading={searchLoading}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start searching for recipes
              </h3>
              <p className="text-gray-500">
                Enter ingredients like "chicken, rice" or "pasta, tomato" to find delicious recipes.
              </p>
            </div>
          )}
        </div>

        {/* Phase Status */}
        <div className="mt-12 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium">
              ✅ Phase 3 Complete: Recipe search with ingredient filtering and responsive grid layout
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

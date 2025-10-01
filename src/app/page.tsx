"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import RecipeList from "@/components/RecipeList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorAlert from "@/components/ErrorAlert";
import { useRecipeSearch } from "@/lib/useRecipeSearch";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, isLoading: searchLoading, error: searchError } = useRecipeSearch(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    // Retry the search
    if (searchQuery) {
      setSearchQuery("");
      setTimeout(() => setSearchQuery(searchQuery), 100);
    }
  };

  // JSON-LD structured data for homepage
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cookie Recipe App",
    "applicationCategory": "FoodApplication",
    "operatingSystem": "Web Browser",
    "description": "Find delicious recipes by ingredients. Search, discover, and save your favorite recipes from 300+ recipes database.",
    "url": "https://cookie-recipes.vercel.app",
    "author": {
      "@type": "Person",
      "name": "Eyüp Efe Karakoca",
      "url": "https://github.com/SweetieBirdX"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "350"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" role="main">
        <div className="text-center space-y-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Cookie
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
                <LoadingSpinner size="sm" text="Searching recipes..." />
              ) : searchResults ? (
                `Found ${searchResults.length} recipe${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
              ) : null}
            </div>
          )}

          {/* Error State */}
          {searchError && (
            <ErrorAlert
              title="Search failed"
              message="We couldn't search for recipes right now. Please try again."
              onRetry={handleRetry}
              className="max-w-md mx-auto"
            />
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
            <EmptyState
              icon={
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
              }
              title="Ready to cook?"
              description="Search for recipes using the ingredients you have."
            />
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}

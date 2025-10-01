"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import FavoriteCard from "@/components/FavoriteCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import { useFavorites } from "@/lib/useFavorites";

export default function FavoritesPage() {
  const { favorites, isLoading, removeFavorite, isRemoving } = useFavorites();

  const handleRemoveFavorite = (recipeId: string) => {
    removeFavorite(recipeId);
  };

  // JSON-LD structured data for favorites page
  const favoritesStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "My Favorite Recipes",
    "description": "A collection of my favorite recipes saved on Cookie Recipe App",
    "url": "https://cookie-recipes.vercel.app/favorites",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": favorites.length,
      "itemListElement": favorites.slice(0, 10).map((fav, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Recipe",
          "name": fav.title,
          "image": fav.imageUrl
        }
      }))
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(favoritesStructuredData) }}
        />
        
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" role="main">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              Your saved recipes ({favorites.length})
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-3"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-8 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              }
              title="No favorites yet"
              description="Start exploring recipes and add them to your favorites! You can save recipes by clicking the heart button on any recipe."
              action={{
                label: "Browse Recipes",
                href: "/"
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <FavoriteCard
                  key={favorite.id}
                  favorite={favorite}
                  onRemove={handleRemoveFavorite}
                  isRemoving={isRemoving}
                />
              ))}
            </div>
          )}

        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

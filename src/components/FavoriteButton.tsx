"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { useFavorites } from "@/lib/useFavorites";

type Props = {
  recipeId: string;
  title: string;
  imageUrl?: string;
};

export default function FavoriteButton({ recipeId, title, imageUrl }: Props) {
  const { user, loading } = useAuth();
  const { favorites, addFavorite, removeFavorite, isAdding, isRemoving } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if recipe is in favorites
  useEffect(() => {
    if (favorites.length > 0) {
      const isFav = favorites.some(fav => fav.id === recipeId);
      setIsFavorite(isFav);
    }
  }, [favorites, recipeId]);

  if (loading) return null;

  if (!user) {
    return (
      <a
        href="/auth/signin"
        className="inline-flex items-center px-4 py-2 rounded-xl border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Sign in to save
      </a>
    );
  }

  const handleToggle = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite({ recipeId, title, imageUrl });
    }
  };

  const isLoading = isAdding || isRemoving;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center px-4 py-2 rounded-xl border transition-colors ${
        isFavorite 
          ? "bg-yellow-400 border-yellow-400 text-yellow-900 hover:bg-yellow-500" 
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-pressed={isFavorite}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      ) : (
        <svg 
          className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} 
          fill={isFavorite ? "currentColor" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
      {isLoading 
        ? (isFavorite ? "Removing..." : "Adding...") 
        : (isFavorite ? "Remove from Favorites" : "Add to Favorites")
      }
    </button>
  );
}

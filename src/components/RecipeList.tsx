import RecipeCard from "./RecipeCard";
import EmptyState from "./EmptyState";
import type { Recipe } from "@/types/recipe";

interface RecipeListProps {
  items: Array<{ recipe: Recipe; score: number; matched: string[] }>;
  loading?: boolean;
}

export default function RecipeList({ items, loading = false }: RecipeListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-64 mb-3"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="bg-gray-200 h-6 rounded-full w-16"></div>
                <div className="bg-gray-200 h-6 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
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
        title="No recipes found"
        description="Try searching with different ingredients or check your spelling. You can search for things like 'chicken, rice' or 'pasta, tomato'."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(({ recipe, score }, index) => (
        <RecipeCard 
          key={`${recipe.id}-${index}`} 
          recipe={recipe} 
          score={score}
        />
      ))}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  score?: number;
}

export default function RecipeCard({ recipe, score }: RecipeCardProps) {
  return (
    <article 
      itemScope 
      itemType="https://schema.org/Recipe"
      className="block rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 bg-white"
    >
      <Link href={`/recipe/${recipe.id}`} className="block">
        <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden">
          <Image
            src={recipe.image || "/images/placeholder.jpg"}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            itemProp="image"
          />
          {score !== undefined && score > 0 && (
            <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full" aria-label={`${score} ingredient matches`}>
              {score} match{score > 1 ? 'es' : ''}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight" itemProp="name">
            {recipe.title}
          </h3>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          {recipe.timeMinutes && (
            <span className="flex items-center" itemProp="totalTime" content={`PT${recipe.timeMinutes}M`}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <time dateTime={`PT${recipe.timeMinutes}M`}>{recipe.timeMinutes} min</time>
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center" itemProp="recipeYield" content={`${recipe.servings} servings`}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {recipe.servings} servings
            </span>
          )}
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                itemProp="recipeCategory"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      </Link>
    </article>
  );
}

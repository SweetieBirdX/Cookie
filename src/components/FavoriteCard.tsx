import Link from "next/link";
import Image from "next/image";
import type { FavoriteDoc } from "@/lib/favorites";

interface FavoriteCardProps {
  favorite: FavoriteDoc & { id: string };
  onRemove: (recipeId: string) => void;
  isRemoving?: boolean;
}

export default function FavoriteCard({ favorite, onRemove, isRemoving = false }: FavoriteCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200">
      <Link href={`/recipe/${favorite.id}`} className="block">
        <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden">
          <Image
            src={favorite.imageUrl || "/images/placeholder.jpg"}
            alt={favorite.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {favorite.title}
          </h3>
          
          {favorite.addedAt && (
            <p className="text-sm text-gray-500">
              Added {new Date(favorite.addedAt.seconds * 1000).toLocaleDateString()}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-4">
        <button
          onClick={() => onRemove(favorite.id)}
          disabled={isRemoving}
          className="w-full px-3 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isRemoving ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
              Removing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove from Favorites
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

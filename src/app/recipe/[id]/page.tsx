import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getRecipeById } from "@/lib/recipes";
import FavoriteButton from "@/components/FavoriteButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { 
  params: { id: string } 
};

export default function RecipeDetailPage({ params }: Props) {
  const recipe = getRecipeById(params.id);
  
  if (!recipe) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Recipe Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={recipe.image || "/images/placeholder.jpg"}
                alt={recipe.title}
                width={800}
                height={450}
                className="w-full h-64 sm:h-80 object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                {recipe.timeMinutes && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.timeMinutes} minutes
                  </span>
                )}
                {recipe.servings && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {recipe.servings} servings
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Favorite Button */}
            <div className="mb-8">
              <FavoriteButton
                recipeId={recipe.id}
                title={recipe.title}
                imageUrl={recipe.image}
              />
            </div>

            {/* Ingredients Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ingredients
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="capitalize">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Instructions Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

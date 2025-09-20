import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🍳</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recipe Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the recipe you're looking for. It might have been removed or the link might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </Link>
      </div>
    </div>
  );
}

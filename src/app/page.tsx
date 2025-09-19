export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          🍳 Cookie
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-green-800 dark:text-green-200 font-medium">
            ✅ Phase 1 Complete: Project setup with Next.js, TypeScript, Tailwind CSS, Firebase, and TanStack Query
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Ready to start building the recipe search functionality!</p>
        </div>
      </div>
    </main>
  );
}

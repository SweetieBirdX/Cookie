import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">🍳 Cookie</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find delicious recipes by ingredients. Search, discover, and save your favorite recipes with our modern recipe search app.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors text-sm">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 text-sm">Built with Next.js & Firebase</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Recipe data from TheMealDB</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Educational & Non-commercial</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Cookie Recipe App. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <span className="text-gray-400 text-sm">
                Made with ❤️ for food lovers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

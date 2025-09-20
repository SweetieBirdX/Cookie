import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#8C5A33' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/cookiewithouttext.png"
                alt="Cookie Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold text-white">Cookie</span>
            </div>
            <p className="text-yellow-100 text-sm leading-relaxed">
              Find delicious recipes by ingredients. Search, discover, and save your favorite recipes with our modern recipe search app.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-yellow-100 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-yellow-100 text-sm">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-yellow-100 text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-yellow-100 text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-yellow-100 text-sm">Built with Next.js & Firebase</span>
              </li>
              <li>
                <span className="text-yellow-100 text-sm">Recipe data from TheMealDB</span>
              </li>
              <li>
                <span className="text-yellow-100 text-sm">Educational & Non-commercial</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-600 mt-8 pt-8 pl-20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white text-sm">
              © {new Date().getFullYear()} Cookie Recipe App. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <span className="text-white text-sm pr-20">
                Made with ❤️ for food lovers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

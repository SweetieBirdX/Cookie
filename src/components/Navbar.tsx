"use client";

import { useAuth } from "@/lib/useAuth";
import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/");
      setIsMobileMenuOpen(false);
        setIsUserDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="shadow-lg border-b border-gray-200" style={{ backgroundColor: '#8C5A33' }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-1">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-2xl font-bold text-white hover:text-yellow-200 transition-colors">
              <Image
                src="/cookiewithouttext.png"
                alt="Cookie Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="ml-2">Cookie</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="/"
              className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Home
            </Link>
            
            {user && (
              <Link
                href="/favorites"
                className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                My Favorites
              </Link>
            )}

            {loading ? (
              <div className="animate-pulse bg-yellow-600 h-8 w-20 rounded"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors"
                >
                  <span className="text-base hidden lg:block">Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="dropdown-menu absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 font-medium">
                      {user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  href="/auth/signin"
                  className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-yellow-600">
              <Link
                href="/"
                className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {user && (
                <Link
                  href="/favorites"
                  className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-lg font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Favorites
                </Link>
              )}

              {!loading && user && (
                <div className="border-t border-yellow-600 pt-4">
                  <div className="px-3 py-2 text-base text-white">
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {!loading && !user && (
                <div className="border-t border-yellow-600 pt-4 space-y-2">
                  <Link
                    href="/auth/signin"
                    className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white block px-3 py-2 rounded-md text-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

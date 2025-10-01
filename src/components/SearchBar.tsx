"use client";

import { useState } from "react";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
  loading?: boolean;
};

export default function SearchBar({ onSearch, placeholder = "chicken, rice, onion", loading = false }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white shadow-lg hover:shadow-xl focus:shadow-xl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            disabled={loading}
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 rounded-xl font-semibold bg-transparent hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{ 
            color: '#6B7280 !important',
            border: 'none'
          }}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" style={{ color: '#6B7280 !important' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span style={{ 
                color: '#6B7280 !important'
              }}>Search</span>
            </div>
          ) : (
            <span style={{ 
              color: '#6B7280 !important'
            }}>Search</span>
          )}
        </button>
      </div>

      {/* Search suggestions or tips */}
      {!loading && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            Try searching for ingredients like <span className="text-amber-600 font-medium">&quot;chicken, rice&quot;</span> or <span className="text-amber-600 font-medium">&quot;pasta, tomato&quot;</span>
          </p>
        </div>
      )}
    </form>
  );
}
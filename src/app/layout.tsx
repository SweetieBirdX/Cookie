import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cookie - Recipe Search App",
    template: "%s | Cookie"
  },
  description: "Find delicious recipes by ingredients. Search, discover, and save your favorite recipes. Smart ingredient-based recipe search with 300+ recipes from cuisines around the world.",
  keywords: [
    "recipes", 
    "cooking", 
    "ingredients", 
    "food search", 
    "recipe finder",
    "meal planner",
    "cooking ideas",
    "ingredient search",
    "recipe database",
    "cooking app",
    "food recipes",
    "easy recipes"
  ],
  authors: [{ name: "Eyüp Efe Karakoca", url: "https://github.com/SweetieBirdX" }],
  creator: "Eyüp Efe Karakoca",
  publisher: "Cookie Recipe App",
  metadataBase: new URL('https://cookie-recipes.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Cookie - Recipe Search App",
    description: "Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.",
    siteName: "Cookie Recipe App",
    images: [
      {
        url: "/cookie.png",
        width: 1200,
        height: 630,
        alt: "Cookie Recipe App - Find recipes by ingredients"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie - Recipe Search App",
    description: "Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.",
    creator: "@EyupEfeKrkc",
    images: ["/cookie.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/cookie.png",
    shortcut: "/cookie.png",
    apple: "/cookie.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5ECDC' },
    { media: '(prefers-color-scheme: dark)', color: '#F5ECDC' }
  ],
  category: 'food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

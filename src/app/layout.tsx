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
  title: "Cookie - Recipe Search App",
  description: "Find delicious recipes by ingredients. Search, discover, and save your favorite recipes.",
  keywords: ["recipes", "cooking", "ingredients", "food", "search"],
  authors: [{ name: "Cookie App" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/cookie.png",
    shortcut: "/cookie.png",
    apple: "/cookie.png",
  },
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

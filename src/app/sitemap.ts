import { MetadataRoute } from 'next';
import allRecipes from '@/data/recipes.json';
import type { Recipe } from '@/types/recipe';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cookie-recipes.vercel.app';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic recipe pages
  const recipePages: MetadataRoute.Sitemap = (allRecipes as Recipe[]).map((recipe) => ({
    url: `${baseUrl}/recipe/${recipe.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...recipePages];
}


"use client";

import { useQuery } from "@tanstack/react-query";
import { searchRecipes } from "@/lib/recipes";

export function useRecipeSearch(query: string) {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => Promise.resolve(searchRecipes(query, { mode: "AND" })),
    staleTime: 1000 * 60, // 1 dk
    enabled: true,
  });
}

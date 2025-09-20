"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listFavorites, addFavorite, removeFavorite, isFavorite } from "./favorites";
import { useAuth } from "./useAuth";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: () => listFavorites(user!.uid),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addFavoriteMutation = useMutation({
    mutationFn: ({ recipeId, title, imageUrl }: { recipeId: string; title: string; imageUrl?: string }) =>
      addFavorite(user!.uid, recipeId, title, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.uid] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (recipeId: string) => removeFavorite(user!.uid, recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.uid] });
    },
  });

  const checkIsFavorite = useMutation({
    mutationFn: (recipeId: string) => isFavorite(user!.uid, recipeId),
  });

  return {
    favorites,
    isLoading,
    error,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isAdding: addFavoriteMutation.isPending,
    isRemoving: removeFavoriteMutation.isPending,
    checkIsFavorite: checkIsFavorite.mutate,
  };
}

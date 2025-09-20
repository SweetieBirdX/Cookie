import allRecipes from "@/data/recipes.json";
import type { Recipe } from "@/types/recipe";

/** Kullanıcı girişini virgül veya boşlukla ayırıp normalize eder */
export function tokenizeInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[,\n]+/g)              // "chicken, rice , onion"
    .map(s => s.trim())
    .filter(Boolean)
    .flatMap(s => s.split(/\s+/g)) // istersen bunu kaldırabilirsin
    .filter(Boolean);
}

/** Metinleri normalize et (lowercase + basic diacritics removal) */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Basit içerir kontrolü (substring) */
function contains(haystack: string, needle: string): boolean {
  return normalize(haystack).includes(normalize(needle));
}

type SearchOptions = {
  mode?: "AND" | "OR";   // AND: tüm terimler eşleşmeli, OR: en az biri
  minMatch?: number;     // OR modunda eşleşmesi gereken minimum terim sayısı (varsayılan 1)
  fields?: Array<"ingredients" | "title" | "tags">; // nerelerde ara
};

/**
 * JSON içinden eşleşen tarifleri döndürür ve basit skorla sıralar.
 * Skorlama:
 *  +2 ingredient eşleşmesi
 *  +1 tag eşleşmesi
 *  +1 title eşleşmesi (substring)
 */
export function searchRecipes(
  query: string,
  options: SearchOptions = {}
): Array<{ recipe: Recipe; score: number; matched: string[] }> {
  const tokens = tokenizeInput(query);
  const { mode = "AND", minMatch = 1, fields = ["ingredients", "title", "tags"] } = options;

  if (tokens.length === 0) {
    // boş arama → hepsini (skorsuz) döndürmek istersen:
    return (allRecipes as Recipe[]).map(r => ({ recipe: r, score: 0, matched: [] }));
  }

  const results: Array<{ recipe: Recipe; score: number; matched: string[] }> = [];

  (allRecipes as Recipe[]).forEach(recipe => {
    let matchCount = 0;
    let score = 0;
    const matched: string[] = [];

    tokens.forEach(t => {
      let tokenMatched = false;

      if (fields.includes("ingredients")) {
        // ingredients exact kelime/substring kontrolü
        const ingHit = recipe.ingredients.some(ing => contains(ing, t));
        if (ingHit) {
          score += 2;
          tokenMatched = true;
        }
      }

      if (fields.includes("tags") && recipe.tags?.some(tag => contains(tag, t))) {
        score += 1;
        tokenMatched = true;
      }

      if (fields.includes("title") && contains(recipe.title, t)) {
        score += 1;
        tokenMatched = true;
      }

      if (tokenMatched) {
        matchCount += 1;
        matched.push(t);
      }
    });

    const andOk = mode === "AND" ? matchCount === tokens.length : true;
    const orOk = mode === "OR" ? matchCount >= minMatch : true;

    if (andOk && orOk && matchCount > 0) {
      results.push({ recipe, score, matched });
    }
  });

  // Skora göre azalan sırala, eşitse title alfabetik
  results.sort((a, b) => (b.score - a.score) || a.recipe.title.localeCompare(b.recipe.title));
  return results;
}

/** JSON'dan ID ile tarif çekme */
export function getRecipeById(id: string): Recipe | undefined {
  return (allRecipes as Recipe[]).find(r => r.id === id);
}

export type Recipe = {
  id: string;
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  timeMinutes?: number;
  servings?: number;
};

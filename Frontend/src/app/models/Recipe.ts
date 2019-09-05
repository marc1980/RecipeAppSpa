import { Ingredient } from "./Ingredient";
import { PreparationStep } from "./PreparationStep";
import { Review } from "./Review";

export class Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  steps: PreparationStep[];
  reviews: Review[];
}

import { Ingredient } from "./Ingredient";
import { PreparationStep } from "./PreparationStep";
import { Review } from "./Review";

export class Recipe {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  portions: number;
  ingredients: Ingredient[];
  steps: PreparationStep[];
  reviews: Review[];
}

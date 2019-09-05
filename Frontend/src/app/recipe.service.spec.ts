import { TestBed } from "@angular/core/testing";

import { RecipeService } from "./recipe.service";
import { Recipe } from "./models/Recipe";

describe("RecipeService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: []
    })
  );

  it("should be created", () => {
    const service: RecipeService = TestBed.get(RecipeService);
    expect(service).toBeTruthy();
  });

  it("should return data", () => {
    const service: RecipeService = TestBed.get(RecipeService);
    let recipes: Recipe[] = [];
    service.getRecipes().subscribe(response => (recipes = response));
    expect(recipes.length).toBeGreaterThan(0);
  });
});

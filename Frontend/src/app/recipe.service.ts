import { Injectable } from "@angular/core";
import { environment } from './../environments/environment'
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Recipe } from "./models/Recipe";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private http: HttpClient) {}
  private recipeBaseUrl = environment.apiUrl + "/recipes";

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeBaseUrl);
  }
  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeBaseUrl + "/" + id);
  }
  createRecipe(recipe: Recipe): Observable<{}> {
    return this.http.post<Recipe>(this.recipeBaseUrl, recipe);
  }
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.recipeBaseUrl + "/" + recipe.id, recipe);
  }
  deleteRecipe(id: number): Observable<{}> {
    return this.http.delete(this.recipeBaseUrl + "/" + id);
  }
}

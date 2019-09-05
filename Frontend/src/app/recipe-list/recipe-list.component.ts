import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../models/Recipe";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  Recipes: Recipe[];
  breakpoint: number;

  ngOnInit() {
    this.recipeService
      .getRecipes()
      .subscribe(recipes => (this.Recipes = recipes));
    this.breakpoint = 2;
  }
  onResize(event) {
    this.breakpoint = 2; // event.target.innerWidth <= 400 ? 1 : 6;
  }
}

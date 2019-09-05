import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Recipe } from "src/app/models/Recipe";
import { RecipeService } from "src/app/recipe.service";
import { Ingredient } from "src/app/models/Ingredient";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id: number = parseInt(this.route.snapshot.paramMap.get("id"));
  recipe: Recipe = {
    id: null,
    name: "",
    ingredients: [],
    steps: [],
    reviews: []
  };
  displayedColumns: string[] = ["name", "amount", "unit"];

  get ingredientForms() {
    return this.recipeForm.get("ingredients") as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  // recipeForm = this.fb.group(this.recipe);

  recipeForm = this.fb.group({
    name: ["", Validators.required],
    ingredients: this.fb.array([
      this.fb.group({
        name: ["", Validators.required],
        amount: ["", Validators.required],
        unit: ["", Validators.required]
      })
    ])
    /*    steps: this.fb.array([
      this.fb.group({
        name: ["", Validators.required],
        rank: ["", Validators.required]
      })
    ]) */
  });

  ngOnInit() {
    if (this.id != null) {
      this.recipeService.getRecipe(this.id).subscribe(result => {
        this.recipe = result;
        this.recipeForm.patchValue({
          name: this.recipe.name
        });

        this.ingredientForms.clear();
        for (const ingredient of this.recipe.ingredients) {
          this.ingredientForms.push(
            this.fb.group(ingredient, { disabled: true })
          );
        }
        console.log(this.recipe);
        console.log(this.recipeForm);
      });
    }
  }
  onSubmit() {
    this.recipe.name = this.recipeForm.controls["name"].value;
    console.log(this.recipe);
    this.recipeService
      .updateRecipe(this.recipe)
      .subscribe(() => this.router.navigate([""]));
  }
  addIngredient() {
    this.ingredientForms.push(
      this.fb.group({
        name: [],
        amount: [],
        unit: []
      })
    );
  }
  deleteIngredient(id: Number) {}
}

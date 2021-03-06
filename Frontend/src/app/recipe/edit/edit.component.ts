import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/recipe.service';
import { UnitofmeasureService } from 'src/app/unitofmeasure.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number = parseInt(this.route.snapshot.paramMap.get('id'));
  recipe: Recipe = {
    id: 0,
    name: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    preparationTime: 0,
    portions: 0,
    ingredients: [],
    steps: []
  };

  recipeForm = this.fb.group({
  name: ['', [Validators.required, Validators.maxLength(35)]],
  shortDescription: ['', [Validators.required, Validators.maxLength(45)]],
  description: ['', [Validators.required, Validators.maxLength(120)]],
  imageUrl: ['', Validators.required],
  preparationTime: ['', Validators.required],
  portions: ['', Validators.required],
  ingredients: this.fb.array([]),
  steps: this.fb.array([])
  });

  localImageUrl = environment.placeholderUrl;

  get imageControl() {
    return this.recipeForm.controls.imageUrl as FormControl;
  }

  get ingredientForms() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get stepForms() {
    return this.recipeForm.get('steps') as FormArray;
  }
  unitsOfMeasure: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private unitofmeasureService: UnitofmeasureService,
    private router: Router
  ) {}

  ngOnInit() {
    let unitOfMeasureObservable = this.unitofmeasureService.getUnitsOfMeasureTypes();
    let recipeObeservable = this.recipeService.getRecipe(this.id);

    if (this.id > 0) {
      forkJoin(unitOfMeasureObservable, recipeObeservable).subscribe( result => {
        this.unitsOfMeasure = result[0];
        this.recipe = result[1];
        this.recipeForm.patchValue({
          name: this.recipe.name,
          shortDescription: this.recipe.shortDescription,
          description: this.recipe.description,
          imageUrl: this.recipe.imageUrl,
          preparationTime: this.recipe.preparationTime,
          portions: this.recipe.portions
        });
        this.localImageUrl = this.recipe.imageUrl;
        for (const ingredient of this.recipe.ingredients) {
          const ingredientGroup = this.fb.group({
            id: [ingredient.id],
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, Validators.required],
            unit: [ingredient.unit, Validators.required]
          });
          this.ingredientForms.push(
            ingredientGroup
          );
        }

        for (const step of this.recipe.steps) {
          const stepGroup = this.fb.group({
            id: [step.id],
            description: [step.description, Validators.required],
            rank: [step.rank, Validators.required]
          });
          this.stepForms.push(
            stepGroup
          );
        }
        this.sortSteps();
      });
    } else {
      unitOfMeasureObservable.subscribe( u => {
        this.unitsOfMeasure = u;
      });
    }
  }
  onSubmit() {
    this.recipe.name = this.recipeForm.controls.name.value;
    this.recipe.shortDescription = this.recipeForm.controls.shortDescription.value;
    this.recipe.description = this.recipeForm.controls.description.value;
    this.recipe.imageUrl = this.localImageUrl;
    this.recipe.preparationTime = this.recipeForm.controls.preparationTime.value;
    this.recipe.portions = this.recipeForm.controls.portions.value;
    this.recipe.ingredients = this.ingredientForms.value;
    this.recipe.steps = this.stepForms.value;
    if (this.id > 0) {
          this.recipeService
      .updateRecipe(this.recipe)
      .subscribe(() => this.router.navigate(['']));
    } else {
      this.recipeService
        .createRecipe(this.recipe)
        .subscribe(() => this.router.navigate(['']));
    }

  }
  addIngredient() {
    this.ingredientForms.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
        unit: ['', Validators.required]
      })
    );
  }
  deleteIngredient(index: number) {
    if (index != null) {
      this.ingredientForms.removeAt(index);
    }
  }
  addStep() {
    let newRank = 1;
    if(this.stepForms.length > 0) {
      const lastStep = this.stepForms.length - 1;
      newRank = this.stepForms.at(lastStep).value.rank + 1;
    }

    this.stepForms.push(
    this.fb.group({
      description: ['', Validators.required],
      rank: [newRank]
    })
    );
  }
  deleteStep(index: number) {
    if (index != null) {
      this.stepForms.removeAt(index);
    }
  }
  moveDownStep(index: number) {
    this.swapSteps(index, index + 1);
  }

  moveUpStep(index: number) {
    this.swapSteps(index, index - 1);
  }

  private swapSteps(from: number, to: number) {
    const stepToMove = this.stepForms.at(from) as FormGroup;
    const stepToMoveRank = stepToMove.controls.rank.value;
    const stepToChangeWith = this.stepForms.at(to) as FormGroup;
    const stepToChangeWithRank = stepToChangeWith.controls.rank.value;
    stepToMove.patchValue({ rank: stepToChangeWithRank });
    stepToChangeWith.patchValue({ rank: stepToMoveRank });
    this.sortSteps();
  }

  private sortSteps() {
    this.stepForms.controls.sort((a, b) => {
      const rankStepA = a.value.rank;
      const rankStepB = b.value.rank;
      if (rankStepA < rankStepB) {
        return -1;
      }
      if (rankStepA > rankStepB) {
        return 1;
      }
      return 0;
    });
  }

  setImageUrl() {
    if (this.imageControl.valid) {
      this.localImageUrl = this.imageControl.value;
    }

  }
  setImagePlaceholder() {
    this.imageControl.setErrors({invalidImage: true});
    this.localImageUrl = environment.placeholderUrl;
  }
  compareUnits(u1: string, u2: string) : boolean {
    return u1 && u2 && u1 === u2;
  }
}

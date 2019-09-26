import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: number = parseInt(this.route.snapshot.paramMap.get('id'));
  recipe: Recipe = {
    id: null,
    name: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    preparationTime: 0,
    portions: 0,
    ingredients: [],
    steps: [],
    reviews: []
  };
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.id).subscribe(result => {
      this.recipe = result;
    });
  }

}

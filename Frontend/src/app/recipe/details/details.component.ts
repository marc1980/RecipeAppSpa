import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Recipe } from 'src/app/models/Recipe';
import { RecipeService } from 'src/app/recipe.service';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/review.service';

import { forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormsModule
} from '@angular/forms';

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
    steps: []
  };
  reviews: Review[];
  reviewForm = this.setReviewForm();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private reviewService: ReviewService,
    private router: Router
) { }

  ngOnInit() {
    if (this.id > 0) {
      let recipeObservable =  this.recipeService.getRecipe(this.id);
      let reviewObservable =  this.reviewService.getReviews(this.id);
      
      forkJoin(reviewObservable, recipeObservable).subscribe(result => {
        this.recipe = result[1];
        this.reviews = result[0].sort((a, b) => b.id - a.id).slice(0,3);
      });
    }
  }

  setReviewForm() {
    return this.fb.group({
      recipeId: [this.id],
      reviewer: ['', [Validators.required, Validators.maxLength(35)]],
      body: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  addReview() {
    if(this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe( success => {
        this.reviews.unshift(this.reviewForm.value);
        this.reviews = this.reviews.slice(0,3);
        this.reviewForm.reset();
        this.reviewForm.controls["reviewer"].setErrors(null);
        this.reviewForm.controls["body"].setErrors(null);
      })
    }
  }
}

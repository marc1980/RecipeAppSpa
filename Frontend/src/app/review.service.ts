import { Injectable } from '@angular/core';
import { environment } from './../environments/environment'
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Review } from "./models/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  private reviewBaseUrl = environment.apiUrl + "/recipes";

  getReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewBaseUrl  + "/" + id + "/" + "reviews" );
  }
  createReview(review: Review): Observable<{}> {
    return this.http.post<Review>(this.reviewBaseUrl + "/" + review.recipeId + "/" + "reviews", review);
  }
}

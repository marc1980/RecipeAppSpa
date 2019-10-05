import { Injectable } from '@angular/core';
import { environment } from './../environments/environment'
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnitofmeasureService {

  constructor(private http: HttpClient) { }
  private ingredientBaseUrl = environment.apiUrl + "/ingredient";
  //localUnitOfMeasureTypes: Observable<string[]>;

  getUnitsOfMeasureTypes(): Observable<string[]> {
/*     let localAvailable;
    this.localUnitOfMeasureTypes.subscribe( u => localAvailable =  u.length != 0)
    if (!localAvailable) {
      this.localUnitOfMeasureTypes = this.http.get<string[]>(this.ingredientBaseUrl + "/GetUnitOfMeasureTypes");
    }  */
    return this.http.get<string[]>(this.ingredientBaseUrl + "/GetUnitOfMeasureTypes");
  }
}



  


 

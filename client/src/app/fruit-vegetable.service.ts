import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as fruitVegetables from './mock-data.json';
import FruitVegetable from "./fruit-vegetable";

@Injectable({
  providedIn: 'root',
})
export class FruitVegetableService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FruitVegetable[]> {
    const url = 'http://localhost:5200/fruitvegetables'
    return this.http.get<FruitVegetable[]>(url)
      .pipe(
        tap(_ => console.log('fetched fruit and vegetables'))
      )
  }

}

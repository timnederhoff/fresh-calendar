import { Injectable } from '@angular/core';

import * as fruitVegetables from './mock-data.json';
import FruitVegetable from "./fruit-vegetable";

@Injectable({
  providedIn: 'root',
})
export class FruitVegetableService {

  constructor() { }

  getAll(): FruitVegetable[] {
    return fruitVegetables;
  }

}

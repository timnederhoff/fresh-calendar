import { Component } from '@angular/core';
import { FruitVegetableService } from "./fruit-vegetable.service";
import FruitVegetable from "./fruit-vegetable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fruitVegetableService: FruitVegetableService) {
  }

  title = 'fresh-calendar';
  fruitVegetables: FruitVegetable[] = []

  getFruitVegetables() {
    this.fruitVegetables = this.fruitVegetableService.getAll();
  }

  ngOnInit(): void {
    this.getFruitVegetables();
  }
}

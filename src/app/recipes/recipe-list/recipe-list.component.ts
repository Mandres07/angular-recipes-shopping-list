import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   @Output() recipeSelected = new EventEmitter<Recipe>();
   recipes: Recipe[] = [
      new Recipe(
         'Arroz con pollo',
         'A test recipe description',
         'https://t2.rg.ltmcdn.com/es/images/4/5/7/arroz_con_pollo_panameno_8754_600.jpg'
      ),
      new Recipe(
         'Sancocho',
         'A sancocho recipe description',
         'https://www.196flavors.com/wp-content/uploads/2018/10/sancocho-3.jpg'
      )
   ];
   constructor() { }

   ngOnInit(): void {
   }

   onRecipeSelected(selectedRecipe: Recipe) {
      this.recipeSelected.emit(selectedRecipe);
   }
}

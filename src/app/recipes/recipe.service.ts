import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
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

   getRecipes() {
      return [...this.recipes];
   }
}
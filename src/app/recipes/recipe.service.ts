import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
   private recipes: Recipe[] = [
      new Recipe(
         'Arroz con pollo',
         'A test recipe description',
         'https://t2.rg.ltmcdn.com/es/images/4/5/7/arroz_con_pollo_panameno_8754_600.jpg',
         [
            new Ingredient('Arroz', 20),
            new Ingredient('Pollo', 5),
            new Ingredient('Cebolla', 3),
            new Ingredient('Pimenton', 3),
            new Ingredient('Culantro', 2)
         ]
      ),
      new Recipe(
         'Sancocho',
         'A sancocho recipe description',
         'https://www.196flavors.com/wp-content/uploads/2018/10/sancocho-3.jpg',
         [
            new Ingredient('Agua', 20),
            new Ingredient('Pollo', 5),
            new Ingredient('Ñame', 5),
            new Ingredient('Cebolla', 3),
            new Ingredient('Culantro', 4)
         ]
      )
   ];

   constructor(private slService: ShoppingListService) { }

   getRecipes() {
      return [...this.recipes];
   }

   getRecipe(index: number) {
      return [...this.recipes][index];
   }

   addToList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
   }
}
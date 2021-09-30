import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
   ingredientsChanged = new EventEmitter<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
      new Ingredient('Rice', 5),
   ];

   getIngredients() {
      return [...this.ingredients];
   }

   addIngredient(name: string, amount: number) {
      this.ingredients.push(new Ingredient(name, amount));
      this.ingredientsChanged.emit([...this.ingredients]);
   }

   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.emit([...this.ingredients]);
   }
}
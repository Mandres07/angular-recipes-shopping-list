import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
   ingredientsChanged = new Subject<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
   ];

   getIngredients() {
      return [...this.ingredients];
   }

   addIngredient(name: string, amount: number) {
      this.ingredients.push(new Ingredient(name, amount));
      this.ingredientsChanged.next([...this.ingredients]);
   }

   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next([...this.ingredients]);
   }
}
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
   ingredientsChanged = new Subject<Ingredient[]>();
   startedEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
   ];

   getIngredient(index: number) {
      return [...this.ingredients][index];
   }

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

   updateIngredient(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next([...this.ingredients]);
   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next([...this.ingredients]);
   }
}
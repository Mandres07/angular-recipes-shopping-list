import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
   private baseURL = 'https://angular-recipes-app-4b06e-default-rtdb.firebaseio.com';
   constructor(private http: HttpClient, private recipesServices: RecipeService, private authService: AuthService) { }

   storeRecipes() {
      const recipes = this.recipesServices.getRecipes();
      this.http.put(`${this.baseURL}/recipes.json`, recipes).subscribe(response => {
         console.log(response);
      });
   }

   fetchRecipes() {
      return this.http.get<Recipe[]>(`${this.baseURL}/recipes.json`).pipe(
         map(recipes => {
            return recipes.map(recipe => {
               return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
         }),
         tap(recipes => {
            this.recipesServices.setRecipes(recipes);
         })
      );
   }
}
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
   // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
   // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
   @ViewChild('f', { static: true }) slForm: NgForm;
   subscription: Subscription;
   editMode = false;
   editedItemIndex: number;
   editedIngredient: Ingredient;

   constructor(private shoppingListService: ShoppingListService) { }

   ngOnInit(): void {
      this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
         this.editMode = true;
         this.editedItemIndex = index;
         this.editedIngredient = this.shoppingListService.getIngredient(index);
         this.slForm.setValue({
            'name': this.editedIngredient.name,
            'amount': this.editedIngredient.amount
         });
      });
   }

   onAddItem(form: NgForm) {
      const value = form.value;
      const name = value.name;
      const amount = value.amount;
      if (this.editMode) {
         this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(name, amount));
      }
      else {
         this.shoppingListService.addIngredient(name, amount);
      }
      this.clearForm(form);
   }

   clearForm(form: NgForm) {
      this.editMode = false;
      form.reset();
   }

   onDelete(form: NgForm) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.clearForm(form);
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}

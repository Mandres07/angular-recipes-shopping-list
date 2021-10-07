import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
   declarations: [
      AlertComponent,
      SpinnerComponent,
      DropdownDirective,
   ],
   imports: [
      CommonModule
   ],
   exports: [
      AlertComponent,
      SpinnerComponent,
      DropdownDirective,
      CommonModule
   ]
})
export class SharedModule { }
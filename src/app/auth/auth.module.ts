import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
   declarations: [AuthComponent],
   imports: [
      RouterModule.forChild([
         { path: '', component: AuthComponent }
      ]),
      ReactiveFormsModule,
      SharedModule
   ]
})
export class AuthModule { }
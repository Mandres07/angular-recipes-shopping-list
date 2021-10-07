import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   isLoginMode = true;
   authForm: FormGroup;
   isLoading = false;
   error: string = null;

   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
      this.authForm = new FormGroup({
         'email': new FormControl(null, [Validators.required, Validators.email]),
         'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      });
   }

   onHandleError() {
      this.error = null;
   }

   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   onSubmit() {
      if (!this.authForm.valid) {
         return;
      }
      const { email, password } = this.authForm.value;
      this.isLoading = true;

      let authObs: Observable<AuthResponseData>;

      if (this.isLoginMode) {
         authObs = this.authService.login(email, password);
      }
      else {
         authObs = this.authService.signUp(email, password);
      }
      authObs.subscribe(response => {
         console.log(response);
         this.isLoading = false;
         this.router.navigate(['./recipes']);
      }, errorMessage => {
         this.error = errorMessage;
         this.isLoading = false;
      });
      this.authForm.reset();
   }

}

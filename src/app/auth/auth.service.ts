import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
   kind?: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   apiKey = 'AIzaSyCGHqhsc4odf2UQWZoN3HUgTsZezcaL1oI';
   signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
   loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`
   user = new BehaviorSubject<User>(null);
   private tokenTimer: any = null;

   constructor(private http: HttpClient, private router: Router) { }

   signUp(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.signUpUrl, {
         email,
         password,
         returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
   }

   login(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.loginUrl, {
         email,
         password,
         returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
   }

   logout() {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenTimer) {
         clearTimeout(this.tokenTimer);
      }
      this.tokenTimer = null;
   }

   autoLogin() {
      const userData: {
         email: string,
         id: string,
         _token: string,
         _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
         return;
      }
      const expiration = new Date(userData._tokenExpirationDate);
      const loadedUser = new User(userData.email, userData.id, userData._token, expiration);
      if (loadedUser.token) {
         this.user.next(loadedUser);
         const expirationDuration = expiration.getTime() - new Date().getTime();
         this.autoLogout(expirationDuration);
      }
   }

   autoLogout(expirationDuration: number) {
      this.tokenTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private handleAuthentication(resData: AuthResponseData) {
      const expirationDuration = +resData.expiresIn * 1000;
      const expirationDate = new Date(new Date().getTime() + expirationDuration);
      const theUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
      this.user.next(theUser);
      this.autoLogout(expirationDuration)
      localStorage.setItem('userData', JSON.stringify(theUser));
   }

   private handleError(errorResponse: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred.';
      if (!errorResponse.error || !errorResponse.error.error) {
         return throwError(errorMessage)
      }
      switch (errorResponse.error.error.message) {
         case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
         case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid or the user does not have a password.';
            break;
         case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.';
            break;
         case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.';
            break;
         case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.';
            break;
         case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
         default:
            errorMessage = 'An error occurred.';
            break;
      }
      return throwError(errorMessage);
   }
}
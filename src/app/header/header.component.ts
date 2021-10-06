import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
   selector: 'app-header',
   templateUrl: 'header.component.html',
   styleUrls: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
   // @Output() featureSelected = new EventEmitter<string>();
   private userSub: Subscription;
   isAuthenticated = false;

   constructor(private dataStorageSerive: DataStorageService, private authService: AuthService) { }

   ngOnDestroy(): void {
      this.userSub.unsubscribe();
   }

   ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
         this.isAuthenticated = !!user;
      });
   }

   collapsed = true;

   onSaveData() {
      this.dataStorageSerive.storeRecipes();
   }

   onFetchData() {
      this.dataStorageSerive.fetchRecipes().subscribe();
   }

   onLogout() {
      this.authService.logout();
   }
}
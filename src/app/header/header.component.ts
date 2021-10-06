import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
   selector: 'app-header',
   templateUrl: 'header.component.html',
   styleUrls: [],
})
export class HeaderComponent {
   // @Output() featureSelected = new EventEmitter<string>();
   constructor(private dataStorageSerive: DataStorageService) { }
   collapsed = true;

   onSaveData() {
      this.dataStorageSerive.storeRecipes();
   }

   onFetchData() {
      this.dataStorageSerive.fetchRecipes().subscribe();
   }
}
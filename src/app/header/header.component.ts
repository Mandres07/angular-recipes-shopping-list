import { Component } from "@angular/core";

@Component({
   selector: 'app-header',
   templateUrl: 'header.component.html',
   styleUrls: [],
})
export class HeaderComponent {
   // @Output() featureSelected = new EventEmitter<string>();
   collapsed = true;

}
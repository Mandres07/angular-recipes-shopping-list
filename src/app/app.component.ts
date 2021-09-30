import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   loadedPath = 'recipes';
   onNavigate(path: string) {
      this.loadedPath = path;
   }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-nav></app-nav>
    <app-footer></app-footer>
    <!-- <router-outlet></router-outlet> -->
  `,
  styles: [
    `div {
      background: red;
    }`
  ]
})
export class AppComponent {
  title = 'frontend';

}

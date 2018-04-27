import { Component } from '@angular/core';
import {NavService} from "./services/nav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public navService: NavService) { }


  /**
   * Toggle sidenav status on backdrop click
   */
  onBackdropClicked() {
    this.navService.toggleSideNav();
  }
}

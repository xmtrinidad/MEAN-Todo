import { Component, OnInit } from '@angular/core';
import {NavService} from "../services/nav.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css']
})
export class NavToolbarComponent implements OnInit {

  constructor(
    public userService: UserService,
    private navService: NavService) { }

  ngOnInit() {
  }

  onToolbarIconClick() {
    this.navService.toggleSideNav();
  }
}

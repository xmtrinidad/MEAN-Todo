import { Component, OnInit } from '@angular/core';
import {NavItem} from "../models/nav-item";
import {NavService} from "../services/nav.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  // Nav items populated from service onInit
  sideNavItems: NavItem[];

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.sideNavItems = this.navService.getNavItems();
  }

  onSideNavItemClick(item: NavItem) {
    this.navService.toggleSideNav();
  }
}

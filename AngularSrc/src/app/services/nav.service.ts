import { Injectable } from '@angular/core';
import {NavItem} from "../models/nav-item";

@Injectable()
export class NavService {
  private sideNavItems: NavItem[] = [
    {
      icon: 'account_box',
      name: 'Sign-in',
      link: '/login',
      loggedOut: true
    },
    {
      icon: 'assignment',
      name: 'Register',
      link: '/register',
      loggedOut: true
    },
    {
      icon: 'list',
      name: 'View Todos',
      link: '/dashboard',
      loggedOut: false
    },
    {
      icon: 'create',
      name: 'Create Todo',
      link: '/dashboard/create',
      loggedOut: false
    },
    {
      icon: 'exit_to_app',
      name: 'Logout',
      link: '/login',
      loggedOut: false
    }
  ];
  private sideNavIsOpen = false;

  constructor() { }

  getNavItems() {
    return this.sideNavItems;
  }

  toggleSideNav() {
    this.sideNavIsOpen = this.sideNavIsOpen !== true;
  }

  getSideNavStatus() {
    return this.sideNavIsOpen;
  }

}

import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  sideNavOptions = [
    {
      icon: 'account_box',
      name: 'Sign-in',
      link: '/login',
      loggedOut: true
    },
    {
      icon: 'assignment',
      name: 'Register',
      link: '/signup',
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
      link: '/dashboard/create-todo',
      loggedOut: false
    },
    {
      icon: 'exit_to_app',
      name: 'Logout',
      link: '/login',
      loggedOut: false
    },
  ];


  constructor(
      public authService: AuthService,
      public navService: NavService) {
  }

  ngOnInit() {
  }

  onSideNavOptionClick(clicked) {
    if (clicked.name === 'Logout') {
      this.authService.logout();
    }
    this.navService.setSideMenuStatus();
  }

}

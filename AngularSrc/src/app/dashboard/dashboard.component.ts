import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos: Todo[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserDashboard().subscribe((userData: any) => this.todos = userData.todos);
  }

}

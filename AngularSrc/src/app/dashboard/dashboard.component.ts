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
    this.authService.getUserDashboard().subscribe((data: any) => this.todos = data.user.todos);
  }

  onDeleteList(index: number) {
    this.authService.removeUserTodo(index).subscribe((data: any) => {
      // Update todoLists
      this.todos = data.user.todos
    });
  }
}

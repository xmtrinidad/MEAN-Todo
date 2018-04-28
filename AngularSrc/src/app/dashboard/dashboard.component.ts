import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../models/todo";
import {BackEndService} from "../services/back-end.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todoLists: Todo[];

  constructor(
    private backEndService: BackEndService,
    private todoService: TodoService) { }

  ngOnInit() {
    this.backEndService.getUserTodos().subscribe((data: any) => {
      this.todoLists = data.todos;
      this.todoService.setTodoLists(data.todos);
    });
  }

  onEditTodo(todoListClicked: Todo) {
    this.todoService.setTodoList(todoListClicked);
  }

  onDeleteTodo(index: number) {
    this.todoService.deleteTodoList(index);
  }
}

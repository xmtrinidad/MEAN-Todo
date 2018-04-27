import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../models/todo";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todoLists: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoLists = this.todoService.getTodoLists();
  }

  onEditTodo(todoListClicked: Todo) {
    this.todoService.setTodoList(todoListClicked);
  }

  onDeleteTodo(index: number) {
    this.todoService.deleteTodoList(index);
  }
}

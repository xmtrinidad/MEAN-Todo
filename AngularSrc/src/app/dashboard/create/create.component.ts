import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.title = !this.todoService.getTodo() ? '' : this.todoService.getTodo().title;
  }


  onCreateTodo() {
    const title = this.title;
    const items = this.todoService.getTodoItems();

    const todo: Todo = {
      title: title,
      items: items
    };
    this.todoService.createTodo(todo);
    this.title = '';
  }

  onResetTodoClick() {
    this.title = '';
    this.todoService.resetTodoList();
  }
}

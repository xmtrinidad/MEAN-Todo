import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title: string;

  constructor(
    private router: Router,
    private todoService: TodoService) { }

  ngOnInit() {
    // Redirect to dashboard if there isn't a todoList selected
    if (!this.todoService.getTodo()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    // Set todoList title
    this.title = this.todoService.getTodo().title;
  }

  onSaveEdit() {
    const todo: Todo = {
      title: this.title,
      items: this.todoService.getTodoItems()
    };
    this.todoService.saveEditedTodo(todo);
  }

  onResetTodoClick() {
    this.title = '';
    this.todoService.resetTodoList();
  }
}

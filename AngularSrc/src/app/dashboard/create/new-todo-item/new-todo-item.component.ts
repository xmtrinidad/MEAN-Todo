import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-new-todo-item',
  templateUrl: './new-todo-item.component.html',
  styleUrls: ['./new-todo-item.component.css']
})
export class NewTodoItemComponent implements OnInit {

  newTodo = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getSelectedTodoItem().subscribe((data) => {
      // If the selected task is the same, clear the input field
      this.newTodo === data.task ? this.newTodo = '' : this.newTodo = data.task
    });
  }

  onAddNewTodoItem() {
    const item = this.newTodo;
    this.todoService.addTodoItem(item);
    this.newTodo = '';
  }

  onDeleteTodoItem() {
    this.todoService.deleteSelectedTodoItem();
    this.newTodo = '';
  }

  onClearTodoItem() {
    this.newTodo = '';
  }
}

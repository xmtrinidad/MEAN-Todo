import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  todoItems: {task: string, completed: boolean}[] = [];
  title: string;
  task: string;
  constructor() { }

  ngOnInit() {
  }

  // Add items to the todoItems array
  onAddItem() {
    const todoItem: {task: string, completed: boolean} = {
      task: this.task, completed: false
    };
    this.todoItems.push(todoItem);
  }

  // Create a list
  onCreateTodoList() {
    const todoList: Todo = {
      title: this.title,
      items: this.todoItems
    };
    console.log(todoList);
    this.clearTodoListFormFields();
    // TODO add flash message with link to go to list page
  }

  clearTodoListFormFields() {
    this.todoItems = [];
    this.title = null;
    this.task = null;
  }
}

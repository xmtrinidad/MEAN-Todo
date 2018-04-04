import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable()
export class CreateTodoService {
  itemToEditIndex: number;
  todoItem: {task: string, completed: boolean} = {
    task: '', completed: false
  };
  // Temporary mock data
  todoItems: {task: string, completed: boolean}[] = [
    { task: 'Test task 1', completed: false},
    { task: 'Test task 2', completed: false},
    { task: 'Test task 3', completed: false}
  ];
  constructor() { }

  getTodoItems() {
    return this.todoItems;
  }

  getItemToEdit(index: number) {
    this.itemToEditIndex = index;
    return this.todoItems[index].task;
  }

  editTodo(task: string) {
    this.todoItems[this.itemToEditIndex].task = task;
    this.resetEditIndex();
  }

  getEditIndex() {
    return this.itemToEditIndex;
  }

  resetEditIndex() {
    this.itemToEditIndex = undefined;
  }

  addTodo(newTask: string) {
    this.todoItem.task = newTask;
    this.todoItems.push(this.todoItem);
    this.resetEditIndex();
    this.todoItem = { task: '', completed: false };
  }

  deleteTodo() {
    this.todoItems.splice(this.itemToEditIndex, 1);
  }

  createList(todoList: Todo) {
    console.log(todoList);
    this.resetList();
  }

  resetList() {
    this.todoItems = [];
  }

}
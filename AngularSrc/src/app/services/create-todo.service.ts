import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { ValidateService } from './validate.service';
import { AuthService } from './auth.service';

@Injectable()
export class CreateTodoService {
  itemToEditIndex: number;
  todoItems: {id: number, task: string, completed: boolean}[] = [];
  // Assign nextId the value of -1 if there are no todoItems
  nextId = this.todoItems.length < 1 ? - 1 : this.todoItems[this.todoItems.length - 1].id;
  todoItem: {id: number, task: string, completed: boolean} = {
    id: this.nextId, task: '', completed: false
  };
  // Temporary mock data

  constructor(
    private authService: AuthService,
    private validateService: ValidateService) {
  }

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

  /**
   * Increase id to keep track of individual todoItems
   * push new todoItem task to list
   * @param {string} newTask
   */
  addTodo(newTask: string) {
    ++this.nextId;
    this.todoItem.task = newTask;
    this.todoItem.id = this.nextId;
    this.todoItems.push(this.todoItem);
    this.resetEditIndex();
    this.todoItem = { id: this.nextId, task: '', completed: false };

  }

  deleteTodo() {
    this.todoItems.splice(this.itemToEditIndex, 1);
  }

  createList(todoList: Todo) {
    this.authService.addUserTodo(todoList).subscribe(data => console.log(data));
    this.validateService.formSubmitMessage('Todo list created!', 'success');
    this.resetList();
  }

  resetList() {
    this.todoItems = [];
    this.nextId = -1;
    this.todoItem = { id: this.nextId, task: '', completed: false };
  }

}

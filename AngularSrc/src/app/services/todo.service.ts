import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";
import {Subject} from "rxjs/Subject";
import {TODO_LISTS} from "../mock-data";
import {BackEndService} from "./back-end.service";

@Injectable()
export class TodoService {
  private todoLists: Todo[] = [];
  private todoList: Todo;
  private todoItems = [];
  selectedTodoItem: {id: number; task: string, completed: boolean};
  private _selectedListener = new Subject<{id: number; task: string, completed: boolean}>();
  private _listListener = new Subject<{id: number; task: string, completed: boolean}[]>();

  constructor(private backEndService: BackEndService) {
  }

  setTodoLists(todos: Todo[]) {
    this.todoLists = todos;
  }
  /**
   * Set todoList to edit
   * @param TodoList - the todoSelected
   */
  setTodoList(todo: Todo) {
    this.todoList = todo;
    this.todoItems = this.todoList.items;
  }

  getTodo() {
    return this.todoList;
  }

  /**
   * Create new list
   */
  createTodo(todo: Todo) {
    TODO_LISTS.push(todo);
    this.resetTodoList();
    // TODO: Back-end stuff

  }

  /**
   * Get list of todoItems
   */
  getTodoItems() {
    return this.todoItems;
  }

  /**
   * Add todoItem to list of items
   * @param {string} task - the item string
   */
  addTodoItem(task: string) {
    const nextId = this.todoItems.length <= 0 ? 0 : this.todoItems[this.todoItems.length - 1].id + 1;
    const newTask: {id: number; task: string, completed: boolean} = {
      id: nextId,
      task: task,
      completed: false
    };
    this.todoItems.push(newTask);
    this._listListener.next(this.todoItems);

    // TODO: Back-end stuff
    console.log(this.getTodoItems());
  }

  setSelectedTodoItem(itemId: number) {
    this.selectedTodoItem = this.todoItems.find((item: any) => item.id === itemId);
    // Emit change
    this._selectedListener.next(this.selectedTodoItem);
  }

  deleteSelectedTodoItem() {
    this.todoItems = this.todoItems.filter(item => item !== this.selectedTodoItem);
    this._listListener.next(this.todoItems);
    //TODO: Back-end stuff
  }

  getSelectedTodoItem() {
    return this._selectedListener;
  }

  /**
   * Get changes to list items
   * @returns {Subject<{id: number; task: string; completed: boolean}[]>}
   */
  getChangedTodoItemList() {
    return this._listListener;
  }

  saveEditedTodo(updatedTodo: Todo) {
    const index = TODO_LISTS.indexOf(this.todoList);
    if (updatedTodo.items.length === 0) {
      this.deleteTodoList(index);
    } else {
      TODO_LISTS[index] = updatedTodo;
    }
    this.todoList = undefined;
    this.resetTodoList();
  }

  deleteTodoList(index: number) {
    TODO_LISTS.splice(index, 1);
  }

  resetTodoList() {
    this.todoItems = [];
    this._listListener.next(this.todoItems);
  }



}

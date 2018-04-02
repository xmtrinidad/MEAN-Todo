import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  // View child used here to get selection list to reset checkbox later
  @ViewChild('selectionList') selectionList;
  title = '';
  task = '';
  isEdit = false;
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


  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  //  Detect item selected and disable other items to edit
  onTodoItemSelected(e, index) {
    if (index === this.itemToEditIndex) {
      this.resetEditStatus();
      return;
    }
    this.setEditStatus(index);
  }

  // Set the item being edited
  setEditStatus(index: number) {
    this.isEdit = true;
    this.itemToEditIndex = index;
    this.task = this.todoItems[this.itemToEditIndex].task;
  }

  /**
   * If item is being edited, item is found in array and task is set
   * else a new item is pushed onto the todoList
   */
  onTodoSubmit() {
    if (this.isEdit) {
      this.todoItems[this.itemToEditIndex].task = this.task;
      this.resetEditStatus();
    } else {
      this.todoItem.task = this.task;
      this.todoItems.push(this.todoItem);
      this.resetEditStatus();
    }
  }

  onTodoClear() {
    this.task = '';
  }

  onTodoDelete() {
    this.todoItems.splice(this.itemToEditIndex, 1);
    this.resetEditStatus();
  }

  onTodoListCancel() {
    this.todoItems = [];
  }

  onCreateTodoList() {
    const todoList: Todo = {
      title: this.title,
      items: this.todoItems
    };
    console.log(todoList);
    this.resetTodoList()
  }

  // Reset the list checkboxes, edit status and index
  resetEditStatus() {
    this.itemToEditIndex = undefined;
    this.isEdit = false;
    this.task = '';
    this.todoItem = { task: '', completed: false };
    this.selectionList.deselectAll();
  }

  // Reset todoList form with success message
  resetTodoList() {
    this.validateService.formSubmitMessage('Todo list created!', 'success');
    this.todoItems = [];
    this.title = '';
    this.task = '';
  }
}

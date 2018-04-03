import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { Todo } from '../models/todo';
import { CreateTodoService } from '../services/create-todo.service';

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
  todoItems: { task: string, completed: boolean }[];


  constructor(
    public createTodoService: CreateTodoService,
    private validateService: ValidateService) {
  }

  // Initialize todoItems
  ngOnInit() {
    this.todoItems = this.createTodoService.getTodoItems();
  }

  //  Detect item selected and disable other items to edit
  onTodoItemSelected(clickedIndex) {
    if (clickedIndex === this.createTodoService.getEditIndex()) {
      this.resetEditStatus();
      return;
    }
    this.setEditStatus(clickedIndex);
  }

  // Set the item being edited
  setEditStatus(index: number) {
    this.isEdit = true;
    this.task = this.createTodoService.getItemToEdit(index);
  }

  // Check if edit, update todoListItem or add new todoItem
  onTodoSubmit() {
    this.isEdit ?
      this.createTodoService.editTodo(this.task) :
      this.createTodoService.addTodo(this.task);
    this.resetEditStatus();
  }

  // Clear input field
  onTodoClear() {
    this.task = '';
  }

  // Delete todoItem and reset edit status
  onTodoDelete() {
    this.createTodoService.deleteTodo();
    this.resetEditStatus();
  }

  // Reset entire todoList
  onTodoListCancel() {
    this.createTodoService.resetList();
  }


  onCreateTodoList() {
    const todoList: Todo = {
      title: this.title,
      items: this.todoItems
    };
    this.createTodoService.createList(todoList);
    this.resetListInputs()
  }

  // Reset the list checkboxes, edit status and index
  resetEditStatus() {
    this.isEdit = false;
    this.task = '';
    this.createTodoService.resetEditIndex();
    this.selectionList.deselectAll();
  }

  // Reset todoList form with success message
  resetListInputs() {
    this.validateService.formSubmitMessage('Todo list created!', 'success');
    this.title = '';
    this.task = '';
  }
}

import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {
  selectedItem: number;
  todoItems: {id: number, task: string, completed: boolean}[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoItems = this.todoService.getTodoItems();
    this.todoService.getChangedTodoItemList().subscribe(list => this.todoItems = list);
  }

  onTodoItemClick(item, i) {
    this.selectedItem = i;
    this.todoService.setSelectedTodoItem(item.id)
  }
}

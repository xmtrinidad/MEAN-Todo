import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";



import { AppComponent } from './app.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

import {NavService} from "./services/nav.service";
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './dashboard/create/create.component';
import { TodoItemListComponent } from './dashboard/create/todo-item-list/todo-item-list.component';
import { NewTodoItemComponent } from './dashboard/create/new-todo-item/new-todo-item.component';
import { TodoService } from './services/todo.service';
import { EditComponent } from './dashboard/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent,
    NavToolbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    TodoItemListComponent,
    NewTodoItemComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [NavService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

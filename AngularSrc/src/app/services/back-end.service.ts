import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import 'rxjs/add/operator/map'
import {Todo} from "../models/todo";

@Injectable()
export class BackEndService {

  constructor(
    private userService: UserService,
    private http: HttpClient) { }

  registerUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user/register', user, {headers: headers});
  }

  authenticateUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user/authenticate', user, {headers: headers});
  }

  getUserTodos() {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.userService.getUserToken()
    });
    return this.http.get('http://localhost:3000/user/todos', {headers: headers});
  }

  saveUserTodo(todo: Todo) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.userService.getUserToken()
    });
    return this.http.post('http://localhost:3000/user/save', todo, {headers: headers});
  }

  deleteUserTodo(index: number) {
    console.log(index);
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.userService.getUserToken()
    });
    return this.http.post('http://localhost:3000/user/delete', {index: index}, {headers: headers});
  }

}

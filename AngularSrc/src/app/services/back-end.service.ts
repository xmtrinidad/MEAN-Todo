import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import 'rxjs/add/operator/map'

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
    return this.http.get('http://localhost:3000/user/todos', {headers: headers})
      .map(res => res);
  }





}

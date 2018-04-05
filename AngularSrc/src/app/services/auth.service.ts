import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Todo } from '../models/todo';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
      public jwtHelper: JwtHelperService,
      private http: HttpClient) { }

  registeruser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user/register', user, {headers: headers});
  }

  loginUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user/authenticate', user, {headers: headers});
  }

  getUserDashboard() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/user/dashboard', {headers: headers});
  }

  addUserTodo(todo: Todo) {
    this.loadToken();
    this.loadUser();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.post(
      'http://localhost:3000/user/add-todo',
      {user: this.user.username, todo: todo}, {headers: headers})
  }

  removeUserTodo(index: number) {
    this.loadToken();
    this.loadUser();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.post(
      'http://localhost:3000/user/delete-todo',
      {user: this.user.username, index: index}, {headers: headers})
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return this.jwtHelper.isTokenExpired();
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}

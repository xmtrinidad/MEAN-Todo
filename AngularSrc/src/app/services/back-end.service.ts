import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class BackEndService {

  constructor(private http: HttpClient) { }

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

}

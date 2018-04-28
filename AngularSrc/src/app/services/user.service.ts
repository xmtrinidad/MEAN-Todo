import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

  constructor(public jwtHelper: JwtHelperService) { }

  /**
   * Save JWT and User data to local storage
   * @param token - the jwt token
   * @param user - the user data
   */
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isUserLoggedOut() {
    console.log(`Token expired? ${this.jwtHelper.isTokenExpired()}`);
    return this.jwtHelper.isTokenExpired();
  }

  getUserToken() {
    return localStorage.getItem('id_token');
  }

}

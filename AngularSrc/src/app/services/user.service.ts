import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  authToken: string;

  constructor(public jwtHelper: JwtHelperService) { }

  /**
   * Save JWT and User data to local storage
   * @param token - the jwt token
   * @param user - the user data
   */
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
  }

  isUserLoggedOut() {
    return this.jwtHelper.isTokenExpired();
  }

}

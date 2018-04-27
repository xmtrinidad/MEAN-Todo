import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (!this.userService.isUserLoggedOut()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

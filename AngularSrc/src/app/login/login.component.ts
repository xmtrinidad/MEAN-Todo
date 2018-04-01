import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
      private validateService: ValidateService,
      private router: Router,
      private authService: AuthService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    if (this.username === undefined || this.password === undefined) {
      this.validateService.formSubmitMessage('Empty fields');
      this.clearInputs();
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password
    };
    this.authService.loginUser(user).subscribe((data: any) => {
      if (data.success === true) {
        this.authService.storeUserData(data.token, data.user);
        this.validateService.formSubmitMessage('You are now logged in!', 'success');
        this.router.navigate(['dashboard']);
      } else {
        this.validateService.formSubmitMessage('Invalid credentials');
        this.clearInputs();
      }
    });
  }

  clearInputs() {
    this.username = undefined;
    this.password = undefined;
  }
}

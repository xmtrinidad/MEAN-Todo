import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Create the form to use in the HTML template
   */
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    const loggingInUser: User = {
      username: this.loginForm.value.username,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginForm.reset();

    console.log(loggingInUser);
  }
}

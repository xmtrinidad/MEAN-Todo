import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";
import {BackEndService} from "../services/back-end.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') myNgForm;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private backEndService: BackEndService,
    private fb: FormBuilder) { }

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
      password: this.loginForm.value.password
    };

    this.backEndService.authenticateUser(loggingInUser)
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/dashboard']);
        }
      }, (err) => console.log(err));

    this.myNgForm.resetForm();


  }
}

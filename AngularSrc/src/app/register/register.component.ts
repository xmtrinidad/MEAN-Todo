import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";
import {BackEndService} from "../services/back-end.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') myNgForm;
  registerForm: FormGroup;

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
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onFormSubmit() {
    // Create user
    const registeredUser: User = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.backEndService.registerUser(registeredUser)
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/login']);
        }
      }, (err) => console.log(err));

    this.myNgForm.resetForm();


  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (!this.checkRegistrationFormFields()) {
      return;
    }
    const registeredUser: User = {
      username: this.signupForm.value.username.trim(),
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    this.authService.registeruser(registeredUser).subscribe(data => console.log(data));
    this.validateService.formSubmitMessage('You are now registered and can log in', 'success');
    this.router.navigate(['/login']);
  }

  // Check empty form fields and user service to generate message if invalid
  checkRegistrationFormFields() {
    if (this.signupForm.status === "INVALID") {
      if (this.signupForm.controls.email.errors) {
        this.validateService.formSubmitMessage('Invalid email');
      }
      if (this.signupForm.controls.username.errors) {
        this.validateService.formSubmitMessage('Username empty');
      }
      if (this.signupForm.controls.password.errors) {
        this.validateService.formSubmitMessage('Password empty');
      }
      return false;
    }
    return true;
  }

  /**
   * White space validator taken from Stack Overflow
   * https://stackoverflow.com/questions/39236992/how-to-validate-white-spaces-empty-spaces-angular-2
   */
  noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true}
  }

}

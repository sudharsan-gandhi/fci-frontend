import { User } from './../modals/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  user: User;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'password': new FormControl(null),
      'confirmPassword': new FormControl(null)
    });
  }

  signup() {
    console.log(this.signupForm.value);

    let user = this.signupForm.value;
    this.user = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password
    }

    this.signupService.registerUser(this.user);

  }

}
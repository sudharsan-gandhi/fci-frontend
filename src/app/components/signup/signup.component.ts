import { User } from './../../model/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PouchDbService } from '../../services/pouch-db.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private db: PouchDbService, private route: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      middle_name: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signup(user: User) {
    console.log('user:', user);
    this.db.userSignup(user).subscribe(data => this.route.navigateByUrl(''), error => console.error(error));
  }


}

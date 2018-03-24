import { User } from './../../model/user.interface';
import { Component, OnInit, Input } from '@angular/core';
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
      first_name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      last_name: new FormControl(null, [Validators.required]),
      middle_name: new FormControl(null, []),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]),
    });
  }

  signup(user: User) {
    console.log('user:', user);
    this.db.userSignup(user).subscribe(data => this.route.navigateByUrl(''), error => console.error(error));
  }


}


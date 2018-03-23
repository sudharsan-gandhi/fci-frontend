import { User } from './../../model/user.interface';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PouchDbService } from '../../services/pouch-db.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  patternMatch: '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';
  constructor(private db: PouchDbService, private route: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      last_name: new FormControl(null, [Validators.required]),
      middle_name: new FormControl(null, []),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).*$')]),
    });
  }

  signup(user: User) {
    console.log('user:', user);
    this.db.userSignup(user).subscribe(data => this.route.navigateByUrl(''), error => console.error(error));
  }


}


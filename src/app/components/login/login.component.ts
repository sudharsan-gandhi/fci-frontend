import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user.interface';
import { PouchDbService } from '../../services/pouch-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private reg_form: FormBuilder, private db: PouchDbService, private zone: NgZone) { }

  ngOnInit() {
    this.registerForm = new FormGroup ({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      middle_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onRegister ( user: User ) {
    console.log(user);
    this.db.push(user).then(function(doc) {
      console.log(doc.id);
    });
  }
}

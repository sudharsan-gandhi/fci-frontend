import { ProgressBarService } from './../../shared/progress-bar.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user.interface';
import { PouchDbService } from '../../services/pouch-db.service';
import { Router } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private reg_form: FormBuilder, private db: PouchDbService,
            private progressBar: ProgressBarService, private zone: NgZone, private route: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(user) {
    console.log(user);
    this.progressBar.show();
    this.db.login(user).subscribe(data => {

      this.progressBar.hide();
      this.route.navigateByUrl('miller/dashboard');


    }, error => {
      this.progressBar.hide();
      this.route.navigateByUrl('/signup');
    }
    );
  }
}

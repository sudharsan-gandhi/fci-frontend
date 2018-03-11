import { PouchDbService } from './pouch-db.service';
import { Injectable } from '@angular/core';
import { User } from '../modals/user';

@Injectable()
export class SignupService {

  constructor(private db: PouchDbService) { }

  registerUser(user: User) {

     this.db.push(user);
     this.db.sync();
  }

}

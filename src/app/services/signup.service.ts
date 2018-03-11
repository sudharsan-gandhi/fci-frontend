import { PouchDbService } from './pouch-db.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class SignupService {

  constructor(private db: PouchDbService) { }

  registerUser(user: User) {

     this.db.push(user);
     this.db.sync();
  }

  getUser() {




    let id = "3947a883dab0a13d550aeb9cf100d90d";

    this.db.put(id,{
      users: 
        {
        email: "sample@gmail.com"
        }
      
    }).then(function (response) {
      // handle response
    }).catch(function (err) {
      console.log(err);
    });



    this.db.sync();


   this.db.get(id).then(doc => {
     console.log("get doc ",doc);
   }).catch(err => {
     console.log("error", err);
   });




    this.db.sync();
  }

}

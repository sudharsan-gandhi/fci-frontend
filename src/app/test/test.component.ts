import { Component, OnInit} from '@angular/core';
import { PouchDbService } from '../services/pouch-db.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  title = 'app';
  sampleDocument: any;
  docs: any;
  isDataLoaded: boolean = false;
  form: FormGroup;
 

  constructor( private db: PouchDbService ) {
  
  }

 

  ngOnInit() {

    this.form = new FormGroup({

      'name': new FormControl(null)

    });

    this.db.fetch().then(docs => {
      console.log(docs);
      this.docs = docs.rows;
      this.isDataLoaded = true;
    });

  

  }

  onSubmit() {
    console.log("here ",this.form.value);
  }

}

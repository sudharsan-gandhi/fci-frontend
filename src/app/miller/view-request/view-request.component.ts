import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { PouchDbService } from '../../services/pouch-db.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {

  element: string;
  docs: any[] = new Array();
  constructor(private db: PouchDbService) { }

  ngOnInit() {
    this.element = 'all';
    // this.db.deleteAll();
    this.db.fetch().then(data => {
      console.log('docs ', data);

      data.rows.forEach(element => {
        console.log('element ', element.doc);
        this.docs.push(element.doc);
      });

      console.log('docs pushed', this.docs);
      
    }).catch(err => {
      console.log('error ', err);
    });
    console.log('docs ', this.docs);
  }

  onRequestTypeChange(type: string) {
    console.log(" type " + type);
    this.element = type;
  }

}

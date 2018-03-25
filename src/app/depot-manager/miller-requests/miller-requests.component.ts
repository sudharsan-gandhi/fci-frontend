import { Component, OnInit } from '@angular/core';
import { PouchDbService } from '../../services/pouch-db.service';

@Component({
  selector: 'app-miller-requests',
  templateUrl: './miller-requests.component.html',
  styleUrls: ['./miller-requests.component.scss']
})
export class MillerRequestsComponent implements OnInit {

  docs: any[] = new Array();
  constructor(private db: PouchDbService) { }

  ngOnInit() {
    this.db.fetch().then(data => {
      data.rows.forEach(element => {
        console.log('element ', element.doc);
        this.docs.push(element.doc);
        console.log('docs', this.docs);
      });
    }).catch(err => {
      console.log('error', err);
    })
  }

  accept(doc: any) {
    doc.status = 'accepted';
    console.log('accept ', doc);
    this.db.put(doc._id, doc);
  }

  decline(doc: any) {
    doc.status = 'rejected';
    console.log('decline ', doc);
    this.db.put(doc._id, doc);
  }

}

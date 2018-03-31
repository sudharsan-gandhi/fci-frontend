import { Type } from './../../shared/enums/type.enum';
import { PouchDbService } from './../../services/pouch-db.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  millerId: number;
  doc: any;
  private prime = 2;
  private secret = 199;
  public datacode = null;
  public qrcode = null;
  constructor(private router: ActivatedRoute, private db: PouchDbService) { }

  ngOnInit() {
    console.log(this.router.url.subscribe(data => {
      console.log(data[1]);
      this.millerId = +data[1].path;
      console.log('miller id ', this.millerId);
    }));

    this.db.fetch().then(data => {
      console.log('data ', data);
      data.rows.forEach(dataDoc => {
        console.log(dataDoc.doc);
        if (dataDoc.doc.type === Type.millerRequest && dataDoc.doc._id === '' + this.millerId) {
          this.doc = dataDoc.doc;
          console.log('doc', this.doc);
          console.log(this.doc);
          this.datacode = JSON.stringify(this.doc);
          const primeString = this.prime * this.secret;
          this.qrcode = String(primeString);
          console.log('data code', this.datacode, 'qrcode', this.qrcode);
        }
      });
    }).catch(err => {
      console.log(err);
    });




  }

}

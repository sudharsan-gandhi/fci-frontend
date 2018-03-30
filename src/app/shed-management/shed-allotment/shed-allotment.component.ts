import { Type } from './../../shared/enums/type.enum';
import { PouchDbService } from './../../services/pouch-db.service';
import { Shed } from './../../model/shed.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-shed-allotment',
  templateUrl: './shed-allotment.component.html',
  styleUrls: ['./shed-allotment.component.scss']
})
export class ShedAllotmentComponent implements OnInit {

  shedAllotmentForm: FormGroup;
  shedDetail: any;
  isShedAlloted = false;
  constructor(private db: PouchDbService) { }

  ngOnInit() {
    // this.db.deleteAll();
    this.shedAllotmentForm = new FormGroup({
      'numberOfSheds': new FormControl(null),
      'tonsPerShed': new FormControl(null),
      'type': new FormControl(null)
    });

    this.db.fetch().then(data => {
      console.log('data ', data);
      data.rows.forEach(dataDoc => {
        const doc = dataDoc.doc;
        if (doc.type === Type.shed) {
          this.shedDetail = doc;
          console.log('shed details ', this.shedDetail);
          this.isShedAlloted = true;
          this.shedAllotmentForm.setValue({
            numberOfSheds: this.shedDetail.numberOfSheds,
            tonsPerShed: this.shedDetail.tonsPerShed,
            type: this.shedDetail.type
          });

        }
      });

      if (this.isShedAlloted === false) {
        Promise.resolve().then(() => {
          console.log('in resolve');
          this.shedDetail = {
            numberOfSheds: 0,
            tonsPerShed: 0,
            type: Type.shed
          };
          this.shedAllotmentForm.setValue({
            numberOfSheds: this.shedDetail.numberOfSheds,
            tonsPerShed: this.shedDetail.tonsPerShed,
            type: this.shedDetail.type
          });

          this.isShedAlloted = true;
          console.log('shed detail in resolve', this.shedDetail);

        });
      }
    }).catch(err => {
      console.log('error', err);
    });


  }

  allotShed(doc) {
    console.log('shed allotment', doc);
    if (this.isShedAlloted === true && this.shedDetail._id !== undefined) {
      doc._id = this.shedDetail._id;
      console.log('doc exists', doc);
      this.db.put('' + doc._id, doc);
    } else {
      doc.allotedSheds = 0;
      doc.allotedTons = 0;
      console.log('doc not exists', doc);
      this.db.push(doc);
    }

    // if (value._id === undefined) {
    //   this.db.push(value).then(data => {
    //     console.log('doc pushed', data);
    //   }).catch(err => {
    //     console.log('error', err);
    //   });
    // } else {
    //   this.db.put(value._id, value).then(data => {
    //     console.log('doc updated', data);
    //   }).catch(err => {
    //     console.log('error', err);
    //   });
    // }
  }

}

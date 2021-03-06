import { FormGroup, FormControl } from '@angular/forms';
import { PouchDbService } from './../../services/pouch-db.service';
import { Component, OnInit } from '@angular/core';
import { Status } from '../../shared/enums/status.enum';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-view-miller-request',
  templateUrl: './view-miller-request.component.html',
  styleUrls: ['./view-miller-request.component.scss']
})
export class ViewMillerRequestComponent implements OnInit {

  type: string;
  docs: any[] = new Array();
  success: string;
  measuredWeightForm: FormGroup;
  constructor(private db: PouchDbService, private logout: LogoutService) { }

  ngOnInit() {
    this.success = sessionStorage.getItem('success');
    setTimeout(() => {
      this.success = 'false';
    }, 1500);
    this.measuredWeightForm = new FormGroup({
      'measuredWeight': new FormControl(null)
    });
    this.type = Status.active;
    // this.db.deleteAll();
    this.fetch(this.type);
    this.db.sync();
  }

  fetch(type: string) {
    this.db.fetch().then(data => {
      console.log('docs ', data);
      data.rows.forEach(datum => {
        console.log('element ', datum.doc);
        if (datum.doc.status === type) {
          this.docs.push(datum.doc);
        }
      });
      console.log('docs pushed', this.docs);
    }).catch(err => {
      console.log('error ', err);
    });
    console.log('docs ', this.docs);
  }

  submitMeasuredWeight(value, doc) {
    console.log('value ', value, ' doc ', doc);
    doc.measuredWeight = value.measuredWeight;
    const measuredWeight = doc.measuredWeight;
    const actualWeight = doc.total_weight;
    const transitLoss = ((actualWeight - measuredWeight) / (actualWeight)) * 100;
    doc.transitLoss = transitLoss.toFixed(2);
    console.log(' revised doc ', doc);
    this.db.put(doc._id, doc).then(response => {
      console.log('put response ', response);
    }).catch(err => {
      console.log(' error ', err);
    });
  }
  public signout(){
    this.logout.logout();
  }
}

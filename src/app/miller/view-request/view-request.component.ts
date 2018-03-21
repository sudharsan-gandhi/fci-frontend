import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {

  element: string;
  constructor() { }

  ngOnInit() {
    this.element = 'all';
  }

  onRequestTypeChange(type: string) {
    console.log(" type " + type);
    this.element = type;
  }

}

import { Router } from '@angular/router';
import { PouchDbService } from './../../services/pouch-db.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  placeOrderForm: FormGroup;
  constructor(private db: PouchDbService, private route: Router) { }

  ngOnInit() {
    this.placeOrderForm = new FormGroup({
      type_of_commodity: new FormControl('', []),
      total_weight: new FormControl('', []),
      total_number_of_bags: new FormControl('', []),
      mode_of_transport: new FormControl('', []),
      total_cost: new FormControl('', []),
    });
  }
  placeorder(order) {
    console.log('order:', order);
    this.db.push(order)
      .then((data) => console.log('order stored in pouch:', data))
      .catch((err) => console.log('order not stored:', err));
  }
}

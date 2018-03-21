import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MillerRoutingModule } from './miller-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MillerService } from './miller.service';
import { SharedModule } from '../shared/shared.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ViewRequestComponent } from './view-request/view-request.component';


@NgModule({
  imports: [
    CommonModule,
    MillerRoutingModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [DashboardComponent, PlaceOrderComponent, ViewRequestComponent],
  providers: [MillerService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MillerModule { }

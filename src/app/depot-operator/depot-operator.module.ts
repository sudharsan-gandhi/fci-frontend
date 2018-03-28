import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotOperatorRoutingModule } from './depot-operator-routing.module';
import { ViewMillerRequestComponent } from './view-miller-request/view-miller-request.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DepotOperatorRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [ViewMillerRequestComponent, OperatorDashboardComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DepotOperatorModule { }

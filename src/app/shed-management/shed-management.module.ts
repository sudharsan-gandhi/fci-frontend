import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from './../shared/shared.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShedAllotmentComponent } from './shed-allotment/shed-allotment.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShedDashboardComponent } from './shed-dashboard/shed-dashboard.component';
import { ShedManagementRoutingModule } from './shed-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShedManagementRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    ShedDashboardComponent,
    ShedAllotmentComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ShedManagementModule { }

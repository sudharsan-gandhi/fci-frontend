import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GateEntryComponent } from './gate-entry/gate-entry.component';

import { GateOperatorRoutingModule } from './gate-operator-routing.module';
import { GateOperatorService } from './gate-operator.service';
import { SharedModule } from '../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TokenComponent } from './token/token.component';

@NgModule({
  imports: [
    CommonModule,
    GateOperatorRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [DashboardComponent, GateEntryComponent, TokenComponent],
  providers: [GateOperatorService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class GateOperatorModule { }

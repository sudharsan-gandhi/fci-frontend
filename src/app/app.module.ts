import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// service imports
import { PouchDbService } from './services/pouch-db.service';

// component imports
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { PlaceOrdersComponent } from './components/place-orders/place-orders.component';
import { SharedModule } from './shared/shared.module';
import { MatButtonModule, MatCheckboxModule, MatProgressBarModule } from '@angular/material';
import { ProgressBarService } from './shared/progress-bar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    PlaceOrdersComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [PouchDbService, ProgressBarService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

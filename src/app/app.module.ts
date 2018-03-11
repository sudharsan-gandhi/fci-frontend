import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PouchDbService } from './services/pouch-db.service';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignupService } from './services/signup.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
    
  ],
  providers: [PouchDbService, SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

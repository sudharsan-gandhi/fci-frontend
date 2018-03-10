import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PouchDbService } from './services/pouch-db.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PouchDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

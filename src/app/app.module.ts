import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// service imports
import { PouchDbService } from './services/pouch-db.service';

// component imports
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [PouchDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

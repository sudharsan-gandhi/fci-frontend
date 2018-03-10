import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PouchDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

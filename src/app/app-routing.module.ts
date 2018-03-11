import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'signup', component: SignupComponent}
];

@NgModule({
    exports: [RouterModule]
})
export class AppRoutingModule { }

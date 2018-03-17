import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { PlaceOrdersComponent } from './components/place-orders/place-orders.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'place-orders',
            component: PlaceOrdersComponent
          }
        ]
    },
    {
      path: '**',
      component : LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class RoutingModule { }

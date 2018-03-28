import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'signup',
                component: SignupComponent,
            }
        ]
    },
    {
      path: 'miller',
      loadChildren: 'app/miller/miller.module#MillerModule'
    },

    {
      path: 'depot-manager',
      loadChildren: 'app/depot-manager/depot-manager.module#DepotManagerModule'
    }
    // {
    //   path: '**',
    //   redirectTo: 'login',
    // }
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

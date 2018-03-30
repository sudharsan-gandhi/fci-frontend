import { ShedAllotmentComponent } from './shed-allotment/shed-allotment.component';
import { ShedDashboardComponent } from './shed-dashboard/shed-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: ShedDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: ShedAllotmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class ShedManagementRoutingModule { }

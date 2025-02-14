import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { ShipmentFormComponent } from './pages/shipments/shipment-form/shipment-form.component';
import { PostOfficesComponent } from './pages/post-offices/post-offices.component';
import { PostOfficeFormComponent } from './pages/post-offices/post-office-form/post-office-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'postoffices', component: PostOfficesComponent },
  { path: 'postoffices/:id', component: PostOfficeFormComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: 'create-shipment', component: ShipmentFormComponent },
  { path: 'shipments/:id', component: ShipmentFormComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

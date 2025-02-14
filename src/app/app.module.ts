import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { ShipmentFormComponent } from './pages/shipments/shipment-form/shipment-form.component';
import { PostOfficesComponent } from './pages/post-offices/post-offices.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShipmentsComponent,
    ShipmentFormComponent,
    PostOfficesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCard,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [provideHttpClient(), provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule { }

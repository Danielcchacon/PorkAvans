import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { GestionColeccionRoutingModule } from './gestion-coleccion-routing.module';
import { AddProductSaleComponent } from './add-product-sale/add-product-sale.component';
import { AddCommissionComponent } from './add-commission/add-commission.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AddProductSaleComponent,
    AddCommissionComponent
  ],
  imports: [
    CommonModule,
    GestionColeccionRoutingModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule,
    ReactiveFormsModule 
  ]
})
export class GestionColeccionModule { }

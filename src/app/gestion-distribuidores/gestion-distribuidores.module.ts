import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDistribuidoresRoutingModule } from './gestion-distribuidores-routing.module';  // Importa el archivo de rutas
import { SharedModule } from '../../shared/shared.module';  // Importa SharedModule
import { ViewDistribuidorComponent } from './view-distribuidor/view-distribuidor.component';
import { AddDistribuidorComponent } from './add-distribuidor/add-distribuidor.component';
import { EditDistribuidorComponent } from './edit-distribuidor/edit-distribuidor.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ViewDistribuidorComponent,
    AddDistribuidorComponent,
    EditDistribuidorComponent
  ],
  imports: [
    CommonModule,
    GestionDistribuidoresRoutingModule,  // Asegúrate de importar las rutas
    SharedModule,  // Importa SharedModule aquí
    MatPaginatorModule,
  ]
})
export class GestionDistribuidoresModule { }
export class AppModule {}


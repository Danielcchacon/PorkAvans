import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFaseComponent } from './view-fase/view-fase.component';
import { AddFaseComponent } from './add-fase/add-fase.component';
import { EditFaseComponent } from './edit-fase/edit-fase.component';
import { FaseCrianzaRoutingModule } from './fase-crianza-routing.module'; // ✅ Import correcto
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ModalDetalleFaseComponent } from './modal-detalle-fase/modal-detalle-fase.component';

@NgModule({
  declarations: [
    ViewFaseComponent,
    AddFaseComponent,
    EditFaseComponent,
    ModalDetalleFaseComponent
  ],
  imports: [
    CommonModule,
    FaseCrianzaRoutingModule, // ✅ Ahora sí es correcto
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    SharedModule
  ]
})
export class FaseCrianzaModule {}

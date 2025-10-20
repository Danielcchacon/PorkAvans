import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-fase',
  templateUrl: './modal-detalle-fase.component.html',
  styleUrls: ['./modal-detalle-fase.component.scss']
})
export class ModalDetalleFaseComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleFaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}

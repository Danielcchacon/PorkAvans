import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../auth.service';  // Asegúrate de que el servicio esté importado correctamente
import { MatSnackBar } from '@angular/material/snack-bar';  // Para las alertas
import { Location } from '@angular/common';  // Para navegar hacia atrás
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.scss']
})
export class AddCommissionComponent implements OnInit {
  commissionForm: FormGroup;
  commissionTypes: any[] = [];  // Aquí se almacenarán los tipos de comisión

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Servicio para consumir la API
    private snackBar: MatSnackBar,  // Para mostrar mensajes de alerta
    public location: Location,  // Para navegar hacia atrás
    private router: Router
  ) {
    // Inicializando el formulario
    this.commissionForm = this.fb.group({
      commissionType: ['', Validators.required],  // Aquí va el tipo de comisión
      description: ['', Validators.required],  // Descripción
      value: ['', [Validators.required, Validators.min(1)]],  // Valor de la comisión
    });
  }

  ngOnInit(): void {
    this.authService.getCommissionTypes().subscribe(
      (data) => {
        console.log('Commissions Types:', data);  // Verifica la respuesta aquí
        this.commissionTypes = data;  // Asigna los datos correctamente
      },
      (error) => {
        console.error('Error al cargar los tipos de comisión', error);
      }
    );
  }


  // Función para enviar el formulario
  onSubmit(): void {
    if (this.commissionForm.valid) {
      // Construir el objeto con las claves correctas
      const commissionData = {
        commission_type: parseInt(this.commissionForm.value.commissionType, 10), // Mapear correctamente y convertir a entero
        value: this.commissionForm.value.value, // Valor como número
        description: this.commissionForm.value.description // Descripción como string
      };

      console.log('Datos enviados al backend:', commissionData); // Verifica el formato

      // Llamada al servicio
      this.authService.createCommission(commissionData).subscribe(
        (response) => {
          this.snackBar.open('Comisión creada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          setTimeout(() => {
            this.router.navigate(['/dashboard']); // Volver a la página anterior después de 3 segundos
          }, 2000);
        },
        (error) => {
          console.error('Error al crear la comisión:', error);
          this.snackBar.open('Error al crear la comisión', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }


}

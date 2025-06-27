import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, Producto } from '../auth.service';
import Swal from 'sweetalert2';  // Importa SweetAlert2

interface Distributor {
  distributor_id: number;
  distributor_name: string;
  // otros campos que quieras usar si es necesario
}
@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
  styleUrls: ['./modal-agregar-producto.component.scss']
})
export class ModalAgregarProductoComponent {
  user: string = '';
  distribuidores: Distributor[] = [];
  productos: Producto[] = [];
  nuevoProducto: any = {
    user: '',                // string
    distribuidor_nombre: '', // string
    fecha_recoleccion: '',   // string en formato ISO (por ejemplo: '2024-06-27')
    cantidad_producto: '',   // string que representa número (ej: "5")
    producto_id: ''          // string que representa número (ej: "2")
  };

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService  // Inyectar AuthService
  ) { }


  // openModal() {
  //   const dialogRef = this.dialog.open(ModalAgregarProductoComponent, {
  //     width: '400px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Si se agregó un nuevo producto, recarga los datos
  //       this.loadData();
  //     }
  //   });
  // }


  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user_id') || '';
    this.nuevoProducto.user = this.user;

    this.authService.get_productos().subscribe({
      next: (response) => {
        this.productos = response.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });

    this.authService.getDistributors().subscribe({
      next: (res) => {
        this.distribuidores = res.distributors;
      },
      error: (err) => {
        console.error('Error al obtener distribuidores:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.nuevoProducto.fecha_recoleccion instanceof Date) {
      const fecha = this.nuevoProducto.fecha_recoleccion;
      this.nuevoProducto.fecha_recoleccion = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    }

    // Asegurar que todos los valores sean texto
    this.nuevoProducto.user = this.user;
    this.nuevoProducto.producto_id = String(this.nuevoProducto.producto_id);
    this.nuevoProducto.cantidad_producto = String(this.nuevoProducto.cantidad_producto);
    this.nuevoProducto.fecha_recoleccion = String(this.nuevoProducto.fecha_recoleccion);
    this.nuevoProducto.distribuidor_nombre = String(this.nuevoProducto.distribuidor_nombre);
    console.log('Formulario enviado', this.nuevoProducto);

    this.authService.agregarProductoRecolectado(this.nuevoProducto).subscribe({
      next: (response) => {
        console.log('Respuesta de la API', response);

        // Verificar si la respuesta contiene un código de error
        if (response.codigo_respuesta && response.codigo_respuesta.startsWith('D')) {
          // Si hay un código de error, mostrar una alerta de error
          Swal.fire({
            title: '¡Error!',
            text: response.mensaje_salida || 'Hubo un problema al agregar el producto.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        } else {
          // Si no hay código de error, mostrar una alerta de éxito
          Swal.fire({
            title: '¡Operación Exitosa!',
            text: 'El producto ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.dialogRef.close(this.nuevoProducto);  // Cerrar el modal después de confirmar la alerta
          });
        }
      },
      error: (error) => {
        console.error('Error al agregar producto recolectado', error);
        // Mostrar alerta de error
        Swal.fire({
          title: '¡Error!',
          text: error.error.detail || 'Hubo un problema al agregar el producto.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { Router } from '@angular/router';

interface User {  // Definición de la interfaz User
  id: string;
  imagen: string;
  nombre: string;
  celularr: string;
  correo: string;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user: string = '';
  sidebarVisible: boolean = true;
  displayedColumns: string[] = ['id', 'imagen', 'nombre', 'celularr', 'correo', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  token: string = '';  // Token para la autenticación

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user_id') || '';
    this.token = localStorage.getItem('access_token') || '';
    this.fetchUsuariosAutenticados();
  }

  fetchUsuariosAutenticados(): void {
    if (this.token) {
      this.authService.getUsuariosAutenticados(this.token).subscribe({
        next: (data) => {
          this.dataSource.data = data;  // Almacena los usuarios obtenidos en la dataSource
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Error al obtener usuarios autenticados:', error);
        }
      });
    } else {
      console.error('Token no encontrado');  // Mensaje de error si el token no existe
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(user: User) {
    // Lógica para redirigir a la página de edición del usuario
    this.router.navigate(['/gestion_usuarios/edit-user', user.id]); // Redirige a /gestion_usuarios/edit-user/{user.id}
  }

  toggleUserStatus(user: any): void {

    user.estado = user.estado.trim() === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';  // Cambia el estado según el actual

    // Muestra un cuadro de diálogo de confirmación
    const confirmation = confirm(`¿Estás seguro que deseas realizar el cambio de estado?`);

    if (confirmation) {
      // Solo se procede si el usuario confirma la acción
      if (this.token) {
        this.authService.actualizarEstadoUsuario(user.id, user.estado, this.token).subscribe({
          next: () => {
            console.log('Estado del usuario actualizado con éxito');
            // Aquí puedes hacer lo que necesites después de la actualización
          },
          error: (error) => {
            console.error('Error al actualizar estado del usuario:', error);
          }
        });
      } else {
        console.error('Token no encontrado');
      }
    } else {
      console.log('Cambio de estado cancelado');
    }
  }

  addUser(): void {
    this.router.navigate(['/gestion_usuarios/add-user']);
  }




}


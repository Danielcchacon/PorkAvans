// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: string = '';
  editUserForm!: FormGroup;
  userId!: string;
  token: string = '';
  imageUrl: string | ArrayBuffer | null = '';
  initialValues: any = {};
  roles: any[] = [];  // Variable para almacenar los roles

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user_id') || '';
    this.token = localStorage.getItem('access_token') || '';
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.fetchUserData();
    this.loadRoles(); // Cargar los roles disponibles
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      user_imagen: [''],
      user_nombre: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      user_email: ['', [Validators.required, Validators.email]],
      user_rol: ['', Validators.required],
    });
  }

  private fetchUserData() {
    this.authService.getUsuarioPorId(this.userId, this.token).subscribe({
      next: (user) => {
        // Asignar los valores correctamente al formulario
        this.editUserForm.patchValue({
          user_imagen: user.imagen || '',
          user_nombre: user.nombre || '',
          celular: user.celular || '',
          user_email: user.correo || '',
          user_rol: user.user_rol || ''  // Asegúrate de que user_rol_id es el valor correcto
        });
  
        this.imageUrl = user.imagen ? 'data:image/jpeg;base64,' + user.imagen : '';
  
        // Guardar los valores iniciales para compararlos luego
        this.initialValues = {
          user_imagen: user.imagen,
          user_nombre: user.nombre,
          celular: user.celular,
          user_email: user.correo,
          user_rol: user.user_rol // Guardamos el ID del rol
        };
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  } 

  private loadRoles() {
    this.authService.getRoles(this.token).subscribe({
      next: (roles) => {
        this.roles = roles; // Almacena los roles obtenidos para el desplegable
      },
      error: (error) => {
        console.error('Error al obtener los roles:', error);
      }
    });
  }

  private getUpdatedFields(currentValues: any): any {
    const updatedFields: any = {};

    Object.keys(currentValues).forEach((key) => {
      if (currentValues[key] !== this.initialValues[key]) {
        updatedFields[key] = currentValues[key];
      }
    });

    return updatedFields;
  }

  private updateUserData(data: any) {
    console.log("Datos a enviar:", data);
    this.authService.updateUser(this.userId, data, this.token).subscribe({
      next: () => {
        console.log('Usuario actualizado con éxito');
        this.router.navigate(['/gestion_usuarios/view-user']); // Redirigir después de actualizar
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/gestion_usuarios/view-user']);
  }

  fileImage: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fileImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        const base64String = (this.imageUrl).split(',')[1];
        this.editUserForm.get('user_imagen')?.setValue(base64String);
      };
      reader.readAsDataURL(this.fileImage);
    }
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const userData = this.getUpdatedFields(this.editUserForm.value);
      if (Object.keys(userData).length === 0) {
        alert("No has realizado ningún cambio.");
      } else {
        this.updateUserData(userData);
        alert("USUARIO ACTUALIZADO CORRECTAMENTE");
        this.router.navigate(['/gestion_usuarios/view-user']);
      }
    } else {
      console.error("Formulario inválido. Verifica los campos.");
    }
  }
  
}

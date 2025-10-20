import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: string = '';
  addUserForm!: FormGroup;
  token: string = '';
  imageUrl: string | ArrayBuffer | null = '';
  roles: any[] = [];
  fileImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user_id') || '';
    this.token = localStorage.getItem('access_token') || '';
    this.initForm();
    this.loadRoles();
  }

  private initForm() {
    this.addUserForm = this.fb.group({
      user_imagen: [''],
      user_nombre: ['', Validators.required],
      user_password: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      user_email: ['', [Validators.required, Validators.email]],
      user_rol: ['', Validators.required]
    });
  }

  private loadRoles() {
  this.authService.getRoles(this.token).subscribe({
    next: (roles) => {
      this.roles = roles;
      console.log('Roles obtenidos:', this.roles);
      this.cdr.detectChanges(); // 👈 Forzar Angular a renderizar
    },
    error: (error) => {
      console.error('Error al obtener los roles:', error);
    }
  });
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fileImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        const base64String = (this.imageUrl as string).split(',')[1];
        this.addUserForm.get('user_imagen')?.setValue(base64String);
      };
      reader.readAsDataURL(this.fileImage);
    }
  }

  onSubmit() {
    console.log("Formulario enviado"); // Verifica que este mensaje aparezca en la consola
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;
      this.authService.createUser(userData, this.token).subscribe({
        next: () => {
          alert("USUARIO AGREGADO CORRECTAMENTE");
          this.router.navigate(['/gestion_usuarios/view-user']);
        },
        error: (error) => {
          console.error('Error al agregar el usuario:', error);
        }
      });
    } else {
      console.error("Formulario inválido. Verifica los campos.");
    }
  }
  

  cancel() {
    this.router.navigate(['/gestion_usuarios/view-user']);
  }
}

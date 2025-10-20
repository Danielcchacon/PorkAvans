import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  tiposProductos: any[] = []; // ← Esta es la propiedad que faltaba
  selectedFile: File | null = null;
  selectedFileBase64: string = '';
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      product_content: ['', Validators.required],
      product_unidad_medida: ['', Validators.required],
      product_type_id: ['', Validators.required],
      price: ['', Validators.required],
      product_description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTiposProductos();
  }

  

  loadTiposProductos() {
    this.tiposProductos = [
      { id: 1, descripcion: 'Comida Humeda' },
      { id: 2, descripcion: 'Comida Seca' },
      { id: 3, descripcion: 'Medicamente' }
    ];
  }

 onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
      this.selectedFileBase64 = e.target.result.split(',')[1]; // Esto ya lo tenías para enviar
    };
    reader.readAsDataURL(file);
  }
}


  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const payload = {
      product_name: this.productForm.value.product_name,
      product_content: this.productForm.value.product_content,
      product_unidad_medida: this.productForm.value.product_unidad_medida,
      product_type_id: this.productForm.value.product_type_id,
      product_precio: this.productForm.value.price,
      product_description: this.productForm.value.product_description,
      product_imagen: this.selectedFileBase64
    };

    this.authService.addProduct(payload).subscribe({
      next: (res) => {
        console.log('Producto agregado:', res);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
      }
    });
  }


  onCancel() {
    this.dialogRef.close();
  }
}

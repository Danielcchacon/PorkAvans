import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../../auth.service'; // Asegúrate de importar el servicio correcto

import { ProductCategorySale } from '../../auth.service'; // Importar interfaz
import { CommissionResponse } from '../../auth.service'; // Importar interfaz


@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.scss']
})
export class AddProductSaleComponent implements OnInit {
  product = {
    name_product: '',
    price: '',
    description: '',
    category_id: 0,
    quantity: 0,
    product_sale_imagen: '',
    commissions_id: 0
  };

  categories: ProductCategorySale[] = [];  // Array de categorías
  commissions: CommissionResponse[] = [];  // Array de comisiones
  user: string = '';

  constructor(
    private router: Router,
    private authService: AuthService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user_id') || '';
    this.loadCategories();  // Cargar categorías
    this.loadCommissions(); // Cargar comisiones
  }

  loadCategories(): void {
    this.authService.getCategories().subscribe(
      (data) => {
        this.categories = data;  // Asignar datos a la variable de categorías
        console.log('Categorías cargadas:', this.categories);
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  loadCommissions(): void {
    this.authService.getCommissions().subscribe(
      (data) => {
        this.commissions = data;  // Asignar datos a la variable de comisiones
        console.log('Comisiones cargadas:', this.commissions);
      },
      (error) => {
        console.error('Error al cargar comisiones:', error);
      }
    );
  }

  // Función que se llama cuando se hace click en "Cancelar"
  onCancel(): void {
    this.router.navigate(['/dashboard']);

  }

  // Función de submit (guardar)
  onSubmit(): void {
    console.log(this.product);
    // Llamar al servicio para crear el producto de venta
    this.authService.createProductSale(this.product).subscribe(
      (response) => {
        console.log('Producto creado con éxito:', response);
        // Redirigir o mostrar un mensaje de éxito, por ejemplo:
        this.router.navigate(['/dashboard']);  // Suponiendo que tienes una ruta que lista productos
      },
      (error) => {
        console.error('Error al crear el producto:', error);
        // Mostrar mensaje de error al usuario
      }
    );
  }
  

  // Función para manejar el cambio de imagen
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.product_sale_imagen = reader.result as string;  // Guardar la imagen en base64
        const base64String = (this.product.product_sale_imagen as string).split(',')[1];
        this.product.product_sale_imagen = base64String;
      };
      reader.readAsDataURL(file);
    }
  }
}

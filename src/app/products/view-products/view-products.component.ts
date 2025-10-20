import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  pagedProducts: any[] = [];
  searchTerm: string = '';
  itemsPerPage = 6;
  currentPage = 0;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products; // porque la respuesta trae { products: [...] }
        this.filteredProducts = [...this.products]; // ← inicializar copia filtrada
        this.updatePagedProducts();                 // ← inicializar la paginación
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  editarProducto(product: any) {
    console.log('Editar producto:', product);
    // Aquí podrías abrir un modal o redirigir a un formulario de edición
  }

  verProducto(product: any) {
    console.log('Ver producto:', product);
    // Aquí podrías abrir un modal de vista detallada o redirigir
  }


  filterData() {
    this.filteredProducts = this.products.filter(product =>
      product.product_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.tipo_producto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.product_description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 0;
    this.updatePagedProducts();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updatePagedProducts();
  }

  updatePagedProducts() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(start, end);
  }

  navigateToAddProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '95vw',      
      maxWidth: '600px',  
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto agregado:', result);
        // Aquí podrías llamar a tu servicio para guardarlo en backend
        // this.authService.addProduct(result).subscribe(...)
      }
    });
  }

}

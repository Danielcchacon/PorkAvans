import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, ProductoRecolectado, ProductoRecolectadoResponse } from '../auth.service';
import { ModalAgregarProductoComponent } from '../modal-agregar-producto/modal-agregar-producto.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recoleccion',
  templateUrl: './recoleccion.component.html',
  styleUrls: ['./recoleccion.component.scss']
})
export class RecoleccionComponent {

  columns = [
    { name: 'Distribuidor' },
    { name: 'Fecha de Recolección' },
    { name: 'Cantidad' },
    { name: 'Nombre del Producto' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchTerm: string = '';

  data: ProductoRecolectado[] = [];
  filteredData: ProductoRecolectado[] = [];
  pagedData: ProductoRecolectado[] = [];
  totalPages: number = 0;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  loadData(): void {
  this.authService.getProductosRecolectados().subscribe(
    (response: ProductoRecolectadoResponse) => {
      if (response && response.productos_recolectados) {
        this.data = response.productos_recolectados;
        this.filterData(); // para aplicar el filtro actual
      } else {
        console.error('La respuesta no contiene productos recolectados');
      }
    },
    (error: any) => {
      console.error('Error al obtener productos recolectados', error);
    }
  );
}

  ngOnInit(): void {
    this.loadData();
    this.authService.getProductosRecolectados().subscribe(
      (response: ProductoRecolectadoResponse) => {
        if (response && response.productos_recolectados) {
          this.data = response.productos_recolectados;
          this.filteredData = [...this.data];
          this.updatePagination();
        } else {
          console.error('La respuesta no contiene productos recolectados');
        }
      },
      (error: any) => {
        console.error('Error fetching collected products', error);
      }
    );
  }

  openModal() {
  const dialogRef = this.dialog.open(ModalAgregarProductoComponent, {
    width: '400px',
    data: {}
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.loadData();  // recarga los datos si se agregó uno nuevo
    }
  });
}

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedData();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.updatePagedData();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updatePagedData();
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedData = this.filteredData.slice(start, end);
  }

  filterData() {
    const search = this.searchTerm.toLowerCase();
    this.filteredData = this.data.filter(producto =>
      Object.values(producto).some(value =>
        value.toString().toLowerCase().includes(search)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

}

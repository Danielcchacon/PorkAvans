import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Ajusta la ruta según tu estructura de archivos
import { DatePipe } from '@angular/common'; // Importa DatePipe
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-stock',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.scss'],
  providers: [DatePipe] // Añade DatePipe como proveedor
})
export class StockComponent implements OnInit {
  public stockProducts: any[] = [];
  public searchTerm: string = '';
  public filteredData: any[] = [];
  public pagedData: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 6; // Número de elementos por página
  public totalPages: number = 0;


  constructor(private authService: AuthService, private datePipe: DatePipe) { } // Inyecta DatePipe

  ngOnInit(): void {
    this.loadStockProducts();
  }

  loadStockProducts() {
    this.authService.getStockProducts().subscribe(
      (data) => {
        // Aquí puedes formatear la fecha
        this.stockProducts = data.map(producto => ({
          ...producto,
          fecha_ultima_actualizacion: this.formatDate(producto.fecha_ultima_actualizacion) // Formatea la fecha
        }));

        this.filteredData = this.stockProducts; // Inicializa filteredData
        this.updatePagination(); // Actualiza la paginación inicial
      },
      (error) => {
        console.error('Error al obtener los productos del stock', error);
      }
    );
  }

  // Método para formatear la fecha
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd HH:mm') || ''; // Formato año/mes/día y hora:minutos
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage); // Calcula el número total de páginas
    this.currentPage = Math.min(this.currentPage, this.totalPages); // Asegúrate de que currentPage no exceda totalPages
    this.updatePagedData(); // Carga los datos de la página actual
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    // Asegúrate de que este slice sea de filteredData
    this.pagedData = this.filteredData.slice(start, start + this.itemsPerPage);
    console.log('Datos paginados:', this.pagedData); // Para verificar qué datos se están mostrando
  }
  onPageChange(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1; // Angular Material indexa desde 0
    this.updatePagedData(); // Carga los datos de la nueva página
  }


  filterData() {
    this.filteredData = this.stockProducts.filter(producto =>
      producto.product_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reinicia a la primera página
    this.updatePagination(); // Actualiza la paginación después de filtrar
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Verifica los límites
    this.currentPage = page;
    this.updatePagedData(); // Actualiza los datos de la nueva página
  }

  openModal() {
    // Lógica para abrir el modal
  }
}

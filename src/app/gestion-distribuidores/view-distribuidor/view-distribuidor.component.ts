import { Component, OnInit } from '@angular/core';
import { AuthService, Distributor } from '../../auth.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-view-distribuidor',
  templateUrl: './view-distribuidor.component.html',
  styleUrls: ['./view-distribuidor.component.scss']
})
export class ViewDistribuidorComponent implements OnInit {

  distribuidores: Distributor[] = [];

  // Variables de paginación
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadDistributors();
  }

  loadDistributors(): void {
    this.authService.getDistributors().subscribe({
      next: (response) => {
        this.distribuidores = response.distributors;
      },
      error: (error) => {
        console.error('Error al cargar distribuidores:', error);
      }
    });
  }

  // Método para obtener solo los distribuidores de la página actual
  get paginatedDistribuidores(): Distributor[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.distribuidores.slice(start, end);
  }

  // Método que se llama cuando se cambia la página o el tamaño de página
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  getImageSrc(base64: string): string {
    if (!base64) return '';
    if (base64.startsWith('/9j/')) {
      return `data:image/jpeg;base64,${base64}`;
    } else if (base64.startsWith('iVBORw0KGgo')) {
      return `data:image/png;base64,${base64}`;
    } else {
      return `data:image/jpeg;base64,${base64}`;
    }
  }

  verDistribuidor(distribuidor: Distributor): void {
  console.log('Ver distribuidor:', distribuidor);
  // Aquí podrías abrir un modal o navegar a una ruta de detalle
}

editarDistribuidor(distribuidor: Distributor): void {
  console.log('Editar distribuidor:', distribuidor);
  // Por ejemplo, podrías redirigir al componente de edición:
  // this.router.navigate(['/ruta-editar', distribuidor.id]);
}


}

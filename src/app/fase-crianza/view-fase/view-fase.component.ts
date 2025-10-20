import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetalleFaseComponent } from '../modal-detalle-fase/modal-detalle-fase.component';
import { AuthService, FaseCrianza } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fase',
  templateUrl: './view-fase.component.html',
  styleUrls: ['./view-fase.component.scss']
})
export class ViewFaseComponent implements OnInit {
  fasesCrianza: FaseCrianza[] = [];
  filteredFases: FaseCrianza[] = [];
  pagedFases: FaseCrianza[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 1;

  currentPage = 0;
  itemsPerPage = 4;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.getFasesCrianza().subscribe({
      next: (data) => {
        this.fasesCrianza = data.fases;
        this.filteredFases = [...this.fasesCrianza];
        this.updatePage();
      },
      error: (err) => {
        console.error('Error al obtener fases de crianza:', err);
      }
    });
  }

  


  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updatePage();
  }

  navigateToAddFase() {
    this.router.navigate(['/fase-crianza/add']);
  }

  editarFase(fase: FaseCrianza) {
    this.router.navigate(['/fase-crianza/edit', fase.fase_crianza_id]);
  }

  eliminarFase(fase: FaseCrianza) {
    // Lógica para eliminar, opcionalmente con confirmación
    console.log('Eliminar fase:', fase.fase_crianza_id);
  }

  verFase(fase: FaseCrianza) {
    this.dialog.open(ModalDetalleFaseComponent, {
      width: '500px',
      data: fase
    });
  }

  // Métodos para avanzar y retroceder
  paginaAnterior() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage();
    }
  }

  paginaSiguiente() {
    if (this.currentPage + 1 < this.totalPaginas) {
      this.currentPage++;
      this.updatePage();
    }
  }


  filterData() {
    const term = this.searchTerm.toLowerCase();
    this.filteredFases = this.fasesCrianza.filter(f =>
      f.nombre_fase.toLowerCase().includes(term) ||
      (f.descripcion_fase || '').toLowerCase().includes(term)
    );
    this.updatePage();
  }

  // Modifica updatePage() para que actualice también la paginación visible
  updatePage() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedFases = this.filteredFases.slice(start, end);

    // Actualizar valores para paginación visible
    this.totalPaginas = Math.ceil(this.filteredFases.length / this.itemsPerPage);
    this.paginaActual = this.currentPage + 1;
  }

}


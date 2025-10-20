import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, ComidaSuministrada, ComidaSuministradaResponse } from '../auth.service';
import { ModalComidaSuministradaComponent } from '../modal-comida-suministrada/modal-comida-suministrada.component';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Pipe({
  name: 'uniqueCorrales'
})
export class UniqueCorralesPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];
    const unique = [...new Set(items.map(item => item.corral_id))];
    return unique;
  }
}

@Component({
  selector: 'app-comida-suministrada',
  templateUrl: './comida-suministrada.component.html',
  styleUrls: ['./comida-suministrada.component.scss']
})
export class ComidaSuministradaComponent implements OnInit {
  public pagedData: ComidaSuministrada[] = [];
  comidasSuministradas: ComidaSuministrada[] = [];
  filteredData: ComidaSuministrada[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';

  selectedCorral: string = '';
  selectedDate: string = ''; // YYYY-MM-DD

  constructor(private authService: AuthService, public dialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.authService.getComidaSuministrada().subscribe(
      (response: ComidaSuministradaResponse) => {
        this.comidasSuministradas = response.comidas_suministradas.map(comida => ({
          ...comida,
          fecha_suministro: new Date(comida.fecha_suministro)
        }));
        this.filteredData = this.comidasSuministradas;
        this.updatePagedData();
      },
      (error: any) => {
        console.error('Error fetching comida suministrada', error);
      }
    );
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedData = this.filteredData.slice(start, start + this.itemsPerPage);
  }

  onPageChange(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.updatePagedData();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComidaSuministradaComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  filterData() {
    this.filteredData = this.comidasSuministradas.filter(comida => {
      const matchesText = Object.values(comida).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      const matchesCorral = this.selectedCorral
        ? comida.corral_id.toString() === this.selectedCorral
        : true;

      const matchesDate = this.selectedDate
        ? this.datePipe.transform(comida.fecha_suministro, 'yyyy-MM-dd') === this.selectedDate
        : true;

      return matchesText && matchesCorral && matchesDate;
    });

    this.currentPage = 1;
    this.updatePagedData();
  }
}

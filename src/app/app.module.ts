import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgOptimizedImage } from "@angular/common";
import { RecoleccionComponent } from './recoleccion/recoleccion.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalAgregarProductoComponent } from './modal-agregar-producto/modal-agregar-producto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CollectionDashboardComponent } from './collection/collection-dashboard/collection-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ComidaSuministradaComponent, UniqueCorralesPipe } from './comida-suministrada/comida-suministrada.component';
import { ModalComidaSuministradaComponent } from './modal-comida-suministrada/modal-comida-suministrada.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StockComponent } from './stock-products/stock-products.component';
import { DatePipe } from '@angular/common';
import { ViewUserComponent } from './gestion_usuarios/view-user/view-user.component';
import { GestionAfiliadoModule } from './gestion_afiliado/gestion-afiliado.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RecoleccionComponent,
    ModalAgregarProductoComponent,
    CollectionDashboardComponent,
    ComidaSuministradaComponent,
    UniqueCorralesPipe,
    ModalComidaSuministradaComponent,
    StockComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatInputModule,
    FormsModule, // Agrega FormsModule aquí
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    NgOptimizedImage,
    MatDialogModule,
    NgxDatatableModule,
    MatSnackBarModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    GestionAfiliadoModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  providers: [DatePipe], // Agrega DatePipe como proveedor
  bootstrap: [AppComponent]
})
export class AppModule { }

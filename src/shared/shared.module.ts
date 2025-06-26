import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // común en botones
import { MatSidenavModule } from '@angular/material/sidenav'; // si usas <mat-sidenav>

@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ],
  exports: [
    SideBarComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class SharedModule { }

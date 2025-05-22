import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecoleccionComponent } from './recoleccion/recoleccion.component';
import { CollectionDashboardComponent } from './collection/collection-dashboard/collection-dashboard.component';
import { ComidaSuministradaComponent } from './comida-suministrada/comida-suministrada.component';
import { StockComponent } from './stock-products/stock-products.component';
import { AddAfiliadoComponent } from './gestion_afiliado/add-afiliado/add-afiliado.component';
// import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},// canActivate: [AuthGuard] }, // Protegida
  { path: 'recoleccion', component: RecoleccionComponent},// canActivate: [AuthGuard] }, // Protegida
  { path: 'collection-dashboard', component: CollectionDashboardComponent},// canActivate: [AuthGuard] }, // Protegida
  { path: 'comida-suministrada', component: ComidaSuministradaComponent},// canActivate: [AuthGuard] }, // Protegida
  { path: 'stock-products', component: StockComponent},// canActivate: [AuthGuard] }, // Protegida
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'add-afiliado', component: AddAfiliadoComponent},// canActivate: [AuthGuard] }, // Protegida
  
  // Rutas protegidas con lazy loading
  { path: 'gestion-distribuidores', loadChildren: () => import('./gestion-distribuidores/gestion-distribuidores.module').then(m => m.GestionDistribuidoresModule)}, //canActivate: [AuthGuard] },
  { path: 'gestion_usuarios', loadChildren: () => import('./gestion_usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule)}, //canActivate: [AuthGuard] },
  { path: 'gestion_afiliado', loadChildren: () => import('./gestion_afiliado/gestion-afiliado.module').then(m => m.GestionAfiliadoModule)}, //, canActivate: [AuthGuard] },
  { path: 'gestion-ventas', loadChildren: () => import('./gestion-ventas/gestion-ventas.module').then(m => m.GestionVentasModule)},// canActivate: [AuthGuard] },
  { path: 'gestion-coleccion', loadChildren: () => import('./gestion-coleccion/gestion-coleccion.module').then(m => m.GestionColeccionModule)},// canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

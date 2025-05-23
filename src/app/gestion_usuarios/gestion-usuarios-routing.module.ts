import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';  // Asegúrate de que la ruta es correcta
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'view-user', component: ViewUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'add-user', component: AddUserComponent } 
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUsuariosRoutingModule { }

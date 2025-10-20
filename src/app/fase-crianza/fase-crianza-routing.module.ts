import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFaseComponent } from './view-fase/view-fase.component';
import { AddFaseComponent } from './add-fase/add-fase.component';
import { EditFaseComponent } from './edit-fase/edit-fase.component';

const routes: Routes = [
  { path: '', component: ViewFaseComponent },
  { path: 'add', component: AddFaseComponent },
  { path: 'edit/:id', component: EditFaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaseCrianzaRoutingModule {}

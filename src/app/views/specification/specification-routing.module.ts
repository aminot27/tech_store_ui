import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificationListComponent } from './specification-list/specification-list.component';

const routes: Routes = [
  {
    path: '',
    component: SpecificationListComponent,
    data: {
      title: 'Especificaciones'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationRoutingModule { }

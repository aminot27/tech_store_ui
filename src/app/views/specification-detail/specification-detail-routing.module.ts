import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificationDetailListComponent } from './specification-detail-list/specification-detail-list.component';

const routes: Routes = [{
  path: '',
  component: SpecificationDetailListComponent,
  data: {
    title: 'Detalles de Especificación'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationDetailRoutingModule { }
